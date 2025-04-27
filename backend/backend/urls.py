"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from todo_app.views import TodoViewSet

# 創建路由器，自動生成 API 路徑
router = DefaultRouter()
router.register(r'todos', TodoViewSet)  # 註冊 todos 路徑，對應 TodoViewSet

# 定義 URL 模式
urlpatterns = [
    path('admin/', admin.site.urls),    # 管理員介面
    path('api/', include(router.urls)), # API 端點，例如 /api/todos/
]