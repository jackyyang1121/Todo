from django.contrib import admin
from .models import Todo
#把模型註冊到Django admin管理頁面

admin.site.register(Todo)