import os

# TODO: run this script on build


def get_icons():
    for fil in os.listdir("."):
        if not fil.endswith(".svg"):
            continue
        yield fil.replace(".svg", "")


icons = list(get_icons())

imports = []
dicts = []

for icon in icons:
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
