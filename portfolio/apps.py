from django.apps import AppConfig
from django.conf import settings
from django.db.models.signals import post_migrate


USERNAME = "admin"
PASSWORD = "admin"


class PortfolioConfig(AppConfig):
    name = __package__


def create_testuser(sender, **kwargs):
    from django.contrib.auth import models as auth_models

    User = auth_models.User
    manager = User.objects
    try:
        manager.get(username=USERNAME)
    except User.DoesNotExist:
        manager.create_superuser(USERNAME, 'x@x.com', PASSWORD)


if settings.DEBUG:
    post_migrate.connect(create_testuser)
