import os
from scour.scour import run, start

# TODO: run this script on build
# scour --enable-viewboxing --remove-metadata --enable-id-stripping -i stackoverflow.svg -o stackoverflow.svg.new


def get_icons():
    for fil in os.listdir("."):
        if not fil.endswith(".svg"):
            continue
        yield fil.replace(".svg", "")


icons = list(get_icons())


def cleanup(icon):
    options, (input, output) = parse_args([
        "--enable-viewboxing",
        "--remove-metadata",
        "--enable-id-stripping",
        "-i", icon, "-o", icon + ".new"
    ])
    start(options, input, output)
    os.remove(icon)
    os.rename(icon + ".new", icon)


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
