from django.db import models
from django.contrib.auth.models import User


class Person(models.Model):
    user = models.ForeignKey(User)


class Type(models.Model):
    """
    ["email", "skype", "tel", "amazon", "github", "play", "linkedin", "docs", "cv"]
    """
    owner = models.ForeignKey(Person)
    title = models.CharField(max_length=70)
    icon = models.ImageField()


class Link(models.Model):
    owner = models.ForeignKey(Person)
    type = models.ForeignKey(Type)
    title = models.CharField(max_length=100)
    slug = models.SlugField()
    url = models.URLField()


"""

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
"""


class Item(models.Model):
    owner = models.ForeignKey(Person)
