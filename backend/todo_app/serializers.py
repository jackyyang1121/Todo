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
id：待辦事項的唯一識別碼（Django內建功能會自動幫我把models.py裡面的Todo模型生成id，遞增，為每個模型生成讀為每個模型生成獨有的id）。
"""

"""
簡單來說，TodoSerializer 是一個工具，用來把 Django 的 Todo 模型資料轉成 JSON 格式，方便前端使用，或者把前端傳來的 JSON 資料轉回 Todo 模型的格式。它基於 Django REST Framework 的 ModelSerializer，會自動根據 Todo 模型的結構來處理資料。

model = Todo: 告訴序列化器我們要處理的是 Todo 這個模型。
fields = ['id', 'title', 'completed', 'created_at']: 指定只處理這四個欄位：
id: 每筆待辦事項的獨一無二編號。
title: 待辦事項的標題。
completed: 待辦事項是否已完成。
created_at: 待辦事項的建立時間。
就像一個翻譯機，把資料在後端模型和前端 JSON 之間來回轉換！
"""