from django.db import models
from django.contrib.auth.models import User


class ForeignKey(models.ForeignKey):

    def __init__(self, to, on_delete=models.CASCADE, *args, **kwargs):
        super(ForeignKey, self).__init__(to, on_delete, *args, **kwargs)


class Person(models.Model):
    user = ForeignKey(User)


class WithOwner(models.Model):
    owner = ForeignKey(Person)

    class Meta:
        abstract = True


class Type(WithOwner):
    """
    ["email", "skype", "tel", "amazon", "github", "play", "linkedin", "docs", "cv"]
    """
    title = models.CharField(max_length=70)
    icon = models.ImageField()


class Link(WithOwner):
    title = models.CharField(max_length=140)
    type = ForeignKey(Type)
    slug = models.SlugField()
    url = models.URLField()


class ItemType(WithOwner):
    title = models.CharField(max_length=70)
    color = models.CharField(max_length=10)  # TODO: color field


class Item(WithOwner):
    title = models.CharField(max_length=140)
    type = ForeignKey(ItemType)
    startDate = models.DateField()
    endDate = models.DateField(blank=True)

    location = ForeignKey(Link, related_name="location_item")
    artifacts = models.ManyToManyField(Link, related_name="artifact_item")
    references = models.ManyToManyField(Link, related_name="reference_item")


class Achievement(WithOwner):
    content = models.TextField()
    item = ForeignKey(Item)
