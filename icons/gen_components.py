import os
from scour.scour import parse_args, start, getInOut
from xml.etree.ElementTree import ElementTree, register_namespace

# TODO: run this script on build
# scour --enable-viewboxing --remove-metadata --enable-id-stripping -i stackoverflow.svg -o stackoverflow.svg.new


def get_icons():
    for fil in os.listdir("./raw"):
        if not fil.endswith(".svg"):
            continue
        yield fil.replace(".svg", "")


icons = list(get_icons())


def drop(svg, key):
    if key in svg.attrib:
        del svg.attrib[key]


def cleanup(icon):
    source = icon + ".svg"
    target = source + ".tmp"

    options = parse_args([
        "--enable-viewboxing",
        "--remove-metadata",
        "--enable-id-stripping",
        "--enable-comment-stripping",
        "--strip-xml-space",
        "--strip-xml-prolog",
        "--shorten-ids",
        "-i", source, "-o", target
    ])
    input, output = getInOut(options)
    start(options, input, output)
    os.remove(source)
    os.rename(target, source)

    register_namespace("", "http://www.w3.org/2000/svg")

    tree = ElementTree()
    tree.parse(source)
    svg = next(tree.iter())
    for attr in ["style", "verstion", "x", "y"]:
        drop(svg, attr)
    svg.attrib["width"] = "100%"
    svg.attrib["height"] = "100%"
    tree.write(source)


for icon in icons:
