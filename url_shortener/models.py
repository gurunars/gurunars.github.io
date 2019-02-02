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
