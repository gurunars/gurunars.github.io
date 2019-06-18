from django.contrib import admin

from .models import Link, LinkType, ItemType, Item, Achievement

admin.site.register(Link)
admin.site.register(LinkType)
admin.site.register(Item)
admin.site.register(ItemType)
admin.site.register(Achievement)
