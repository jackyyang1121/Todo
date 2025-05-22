from django.apps import AppConfig


class TodoAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "todo_app"


"""
讓我的Django專案知道，當我說"todo_app"時，它指的是哪個應用程式。
且讓我的models.py裡面的模型在創建後會自動幫他加上id
"""
