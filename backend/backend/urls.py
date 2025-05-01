from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from todo_app.views import TodoViewSet

# 創建路由器，自動生成 API 路徑
router = DefaultRouter()
'''
這裡使用了 Django REST Framework (DRF) 提供的 DefaultRouter 類別來創建一個路由器。
DefaultRouter 是一個工具，能自動幫你生成 API 的路徑（例如 GET、POST、PUT、DELETE 等操作的 URL），省去手動定義每個路徑的麻煩。
'''
router.register(r'todos', TodoViewSet)  # 註冊 todos 路徑，對應 TodoViewSet(在views.py定義)
'''
router.register 是告訴路由器，有一個名為 todos 的資源（resource），並將它綁定到 TodoViewSet。
r'todos' 是 URL 的路徑前綴，例如 /todos/。
TodoViewSet 是一個 ViewSet（視圖集），它定義了如何處理 todos 相關的請求（例如查詢、創建、更新、刪除待辦事項）。
DefaultRouter 會根據 TodoViewSet 自動生成以下 API 路徑：
GET /todos/：取得用戶列表
POST /todos/：建立新用戶
GET /todos/<id>/：取得單一用戶
PUT /todos/<id>/：更新整個用戶資訊
DELETE /todos/<id>/：刪除用戶

我不用手動定義每個 API 路由（除非你想要客製化）。
DefaultRouter 幫你根據 ViewSet 自動產生完整 CRUD 路由。
只要你有正確寫好 UserViewSet（通常繼承 ModelViewSet），API 就會「自動生出來」。
'''

# 定義 URL 模式
urlpatterns = [
    path('admin/', admin.site.urls),    # 管理員介面
    path('api/', include(router.urls)), # API 端點，例如 /api/todos/
]
'''
第一行：path('admin/', admin.site.urls)
path()：
這是 Django 提供的函數，用來定義 URL 路由。
第一個參數 'admin/' 是 URL 的路徑，表示當使用者訪問 你的網站/admin/ 時，這個路由會被觸發。
第二個參數 admin.site.urls 告訴 Django 將這個請求導向內建的管理員介面（admin site）。

admin.site.urls：
這是 Django 內建的管理員介面的 URL 配置。
Django 的管理員介面是一個強大的工具，讓我可以用圖形化介面管理資料庫中的資料（例如新增、編輯、刪除使用者、文章等）。
當我訪問 /admin/，Django 會顯示一個登入頁面，輸入管理員帳號密碼後，就能進入管理後台。

第二行：path('api/', include(router.urls))
path('api/', ...)：
這定義了另一個 URL 路由，當使用者訪問 你的網站/api/ 時，這個路由會被觸發。
'api/' 表示這是一個 API 的入口點，通常用來處理前端或第三方應用程式的資料請求（例如取得待辦事項列表、提交表單等）。

include(router.urls)：
include() 是 Django 的函數，用來引用其他地方定義的 URL 模式。
在這邊，router.urls 通常是由 Django REST Framework（DRF）提供的路由器（router）生成的 URL 模式。
DRF 的 router 是一個工具，可以自動為你的 API 端點生成 URL，例如 /api/todos/、/api/users/ 等。
router.urls 包含了一組子路由，這些子路由定義了 API 的具體功能（例如取得某個待辦事項、創建新待辦事項等）。
'''
