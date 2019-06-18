from django.db import models
from django.contrib.auth.models import User


class Type(models.Model):
    owner = models.ForeignKey(User)
    title = models.CharField(max_length=70)
    icon = models.ImageField()


class Link(models.Model):
    owner = models.ForeignKey(User)
    type = models.ForeignKey(Type)
    title = models.CharField(max_length=100)
    slug = models.SlugField()
    url = models.URLField()


"""
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
"""


class Person(models.Model):
    pass


class Item(models.Model):
    pass


class Portfolio(models.Model):
    owner = models.OneToOneField(Person)
    items = models.ManyToManyField(Item)
