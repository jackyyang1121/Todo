from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer

# 定義 API 視圖，提供 CRUD 操作
class TodoViewSet(viewsets.ModelViewSet):
    # 查詢所有待辦事項
    queryset = Todo.objects.all()    #Todo定義在 models.py
    # 使用 TodoSerializer 來序列化數據
    serializer_class = TodoSerializer   #TodoSerializer定義在 serializers.py

"""
這段程式碼的功能是用來建立一個 API 視圖(提供資料給前端或第三方應用程式像是json檔)
簡單來說就是讓你的待辦事項（Todo）可以透過 API 進行新增、查詢、更新、刪除等操作。具體來說：

視圖功能：它定義了一個 TodoViewSet 類，這個類會自動提供對待辦事項的完整 CRUD（創建、讀取、更新、刪除）功能，省去手寫 API 的麻煩。
查詢數據：它會從資料庫中抓取所有的待辦事項（Todo 物件）。
序列化：用 TodoSerializer 把資料轉成 JSON 格式，方便前端或外部應用程式使用。
白話一點，這就像是幫你的待辦清單打造一個「自動化櫃台」，任何人都能透過 API 來管理清單內容！
"""
