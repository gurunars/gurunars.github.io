from django.apps import AppConfig
from django.conf import settings
from django.db.models.signals import post_migrate
from django.contrib.auth.apps import AuthConfig


USERNAME = "admin"
PASSWORD = "admin"


class PortfolioConfig(AppConfig):
    name = __package__


def create_test_user(sender, **kwargs):
    if not settings.DEBUG:
        return
    if not isinstance(sender, AuthConfig):
        return
    from django.contrib.auth.models import User
    manager = User.objects
    try:
        manager.get(username=USERNAME)
    except User.DoesNotExist:
        manager.create_superuser(USERNAME, 'x@x.com', PASSWORD)


post_migrate.connect(create_test_user)
