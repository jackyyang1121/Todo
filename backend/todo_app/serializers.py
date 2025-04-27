from rest_framework import serializers
from .models import Todo

# 定義序列化器，將 Todo 模型轉換為 JSON 格式
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo           # 指定要序列化的模型
        fields = ['id', 'title', 'completed', 'created_at']  # 指定要包含的字段