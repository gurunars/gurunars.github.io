from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404

from .models import Link


def go_to(request, username, slug):
    link = get_object_or_404(Link, owner__username=username, slug=slug)
    return HttpResponseRedirect(link.url)
