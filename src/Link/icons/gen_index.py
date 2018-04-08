import os
from scour.scour import parse_args, start
from xml.etree.ElementTree import ElementTree

# TODO: run this script on build
# scour --enable-viewboxing --remove-metadata --enable-id-stripping -i stackoverflow.svg -o stackoverflow.svg.new


def get_icons():
    for fil in os.listdir("."):
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

    options, (input, output) = parse_args([
        "--enable-viewboxing",
        "--remove-metadata",
        "--enable-id-stripping",
        "--enable-comment-stripping",
        "--strip-xml-space",
        "--strip-xml-prolog",
        "-i", source, "-o", target
    ])
    start(options, input, output)
    os.remove(source)
    os.rename(target, source)

    tree = ElementTree()
    tree.parse(source)
    svg = tree.iter().next()
    for attr in ["style", "verstion", "x", "y"]:
        drop(svg, attr)
    svg.attrib["width"] = "100%"
    svg.attrib["height"] = "100%"
    tree.write(source)


imports = []
dicts = []

for icon in icons:
    cleanup(icon)
    imports.append(
        'const {name} = require("./{name}.svg")'.format(name=icon)
    )
    dicts.append(
        '{name}: {name}'.format(name=icon)
    )

text = """
const fallback = require("./link.svg");

{imports}

const icons = {{
  {dicts}
}};

const getIconForType = (type?: string) =>
  icons[type || "link"] || fallback;

export default getIconForType;
""".format(
    imports=";\n".join(imports),
    dicts=",\n  ".join(dicts)
)

with open("index.tsx", "w") as fil:
    fil.write(text)