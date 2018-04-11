import yaml

from dict_validator.fields.regexp import(
    Name, Phone, Email, Slug)
from dict_validator.fields import(
    Timestamp, String, Choice)
from dict_validator import List, Dict, validate


class Meta:
    self = Slug()
    name = Name()
    domainName = String(regexp=r"^([a-z0-0]+\.)+[a-z]{2,7}$")
    languages = List(String(regexp=r"^[A-Z]{1}[a-z]+$"))
    birthday = Timestamp(Timestamp.Date)
    specialization = List(String())
    avatar = String()
    media = List(Slug())


class Item:
    title = String()
    achievements = List(String())
    location = String()
    references = List(Slug(), required=False)
    type = Choice(["education", "fullTimeJob", "freelance", "openSource"])
    tags = List(String(), required=False)
    description = String(required=False)
    links = List(Slug(), required=False)
    startDate = Timestamp(Timestamp.Date, required=False)
    endDate = Timestamp(Timestamp.Date, required=False)
    date = Timestamp(Timestamp.Date, required=False)


class Reference:
    name = String(regexp=r"^[\w\+@\.+-]+( [\w@\.+-]+)*$")
    alias = Slug()
    url = String()
    type = Choice(
        ["email", "skype", "tel", "amazon", "github", "play", "linkedin",
         "docs", "cv"],
        required=False)


class Portfolio:
    meta = Dict(Meta)
    items = List(Dict(Item))
    links = List(Dict(Reference))


with open("portfolio.yaml") as fil:
    portfolio = yaml.load(fil)
    for (path, error) in sorted(list(validate(Portfolio, portfolio))):
        print(".{} : {}".format(".".join(map(str, path)), error))

    valid_aliases = [reference["alias"]
                     for reference in portfolio.get("links", [])]

    alias = portfolio["meta"]["self"]
    assert alias in valid_aliases, "Self {} is invalid".format(alias)

    for alias in portfolio["meta"].get("media", []):
        assert alias in valid_aliases, "Media {} is invalid".format(alias)

    for item in portfolio.get("items", []):
        if "location" in item:
            alias = item["location"]
            assert alias in valid_aliases, \
                "Location {} is invalid".format(alias)
        for alias in item.get("links", []):
            assert alias in valid_aliases, "Link {} is invalid".format(alias)
        for alias in item.get("references", []):
            assert alias in valid_aliases, "Ref {} is invalid".format(alias)
