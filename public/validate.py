import yaml

from dict_validator.fields.regexp import(
    Name, Phone, Email, Slug)
from dict_validator.fields import(
    Timestamp, String, Choice)
from dict_validator import List, Dict, validate


class Item:
    title = String()
    logo = String(required=False)
    achievements = List(String())
    location = String()
    references = List(Slug(), required=False)
    type = Choice([
        "education",
        "fullTimeJob",
        "freelance",
        "openSource",
        "certificates",
        "contactCard"
    ])
    description = String(required=False)
    links = List(Slug(), required=False)
    startDate = Timestamp(Timestamp.Date, required=False)
    endDate = Timestamp(Timestamp.Date, required=False)
    date = Timestamp(Timestamp.Date, required=False)


class Link:
    name = String(regexp=r"^[\w\+@\.+-]+( [\w@\.+-]+)*$")
    alias = Slug()
    url = String()
    type = Choice(
        ["email", "skype", "tel", "amazon", "github", "play", "linkedin",
         "docs", "cv", "stackoverflow", "coursera"],
        required=False)


class Portfolio:
    items = List(Dict(Item))
    links = List(Dict(Link))


with open("portfolio.yaml") as fil:
    portfolio = yaml.load(fil)
    for (path, error) in sorted(list(validate(Portfolio, portfolio))):
        print(".{} : {}".format(".".join(map(str, path)), error))

    valid_aliases = [reference["alias"]
                     for reference in portfolio.get("links", [])]

    for item in portfolio.get("items", []):
        if "location" in item:
            alias = item["location"]
            assert alias in valid_aliases, \
                "Location {} is invalid".format(alias)
        for alias in item.get("links", []):
            assert alias in valid_aliases, "Link {} is invalid".format(alias)
        for alias in item.get("references", []):
            assert alias in valid_aliases, "Ref {} is invalid".format(alias)
