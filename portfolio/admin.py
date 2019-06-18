from django.contrib import admin

from .models import Link, LinkType, ItemType, Item, Achievement

admin.register(Link)
admin.register(LinkType)
admin.register(Item)
admin.register(ItemType)
admin.register(Achievement)
