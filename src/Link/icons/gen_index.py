import os


def get_icons():
    for fil in os.listdir("."):
        if not fil.endswith(".svg"):
            continue
        yield fil.replace(".svg", "")


icons = list(get_icons())

imports = []
dicts = []

for icon in sorted(icons):
    imports.append(
        'import {name} from "./{name}.svg"'.format(name=icon)
    )
    dicts.append(icon)

text = """
{imports};

const icons = {{
  {dicts}
}};

const getIconForType = (type?: string) =>
  icons[type || "link"] || link;

export default getIconForType;
""".format(
    imports=";\n".join(imports),
    dicts=",\n  ".join(dicts)
)

with open("index.tsx", "w") as fil:
    fil.write(text)
