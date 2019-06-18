from django.db import models
from django.contrib.auth.models import User


class ForeignKey(models.ForeignKey):

    def __init__(self, to, on_delete=models.CASCADE, *args, **kwargs):
        super(ForeignKey, self).__init__(to, on_delete, *args, **kwargs)


class Person(models.Model):
    user = ForeignKey(User)


class Type(models.Model):
    """
    ["email", "skype", "tel", "amazon", "github", "play", "linkedin", "docs", "cv"]
    """
    owner = ForeignKey(Person)
    title = models.CharField(max_length=70)
    icon = models.ImageField()


class Link(models.Model):
    owner = ForeignKey(Person)
    type = ForeignKey(Type)
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
    owner = ForeignKey(Person)
