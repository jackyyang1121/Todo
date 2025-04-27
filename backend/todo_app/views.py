from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer

# 定義 API 視圖，提供 CRUD 操作
class TodoViewSet(viewsets.ModelViewSet):
    # 查詢所有待辦事項
    queryset = Todo.objects.all()
    # 使用 TodoSerializer 來序列化數據
    serializer_class = TodoSerializer

# Create your views here.
