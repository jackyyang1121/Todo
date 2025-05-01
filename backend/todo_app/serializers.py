from rest_framework import serializers
from .models import Todo

# 定義序列化器，將 Todo 模型轉換為 JSON 格式
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo           # 指定要序列化的模型
        fields = ['id', 'title', 'completed', 'created_at']  # 指定要包含的字段

"""
class TodoSerializer(serializers.ModelSerializer):
這定義了一個名為 TodoSerializer 的序列化器類別，繼承自 DRF 的 ModelSerializer。
ModelSerializer 是一個方便的基類，專門用來處理 Django 模型的序列化。它會自動根據模型的結構生成序列化邏輯。
用途：這個序列化器負責把 Todo 模型的資料轉成 JSON，或者把前端送來的 JSON 資料轉回 Todo 模型的格式。
"""
"""
model = Todo:
指定這個序列化器要處理的模型是 Todo。

fields = ['id', 'title', 'completed', 'created_at']:
指定序列化器要處理的字段（欄位）。
id：待辦事項的唯一識別碼（通常是自動生成的）。
"""