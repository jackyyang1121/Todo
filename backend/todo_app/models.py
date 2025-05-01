from django.db import models

# 定義待辦事項的數據模型
class Todo(models.Model):
    
    title = models.CharField(max_length=200)  
    #這定義了一個名為 title 的欄位，類型是 CharField，表示它儲存文字，且最大長度為 200 個字符。
    
    completed = models.BooleanField(default=False)   
    #這定義了一個名為 completed 的欄位，類型是 BooleanField，表示它只能存 True 或 False。default=False 表示預設值是 False，也就是待辦事項預設為「未完成」。
   
    created_at = models.DateTimeField(auto_now_add=True)
    #這定義了一個名為 created_at 的欄位，類型是 DateTimeField，用來儲存日期和時間。auto_now_add=True 表示當這個待辦事項被創建時，Django 會自動填入當前的日期和時間。

    
    def __str__(self):
        return self.title
    #這是一個特殊的 Python 方法，定義了當你打印 Todo 物件時，應該顯示什麼。這裡設定為返回 title 欄位的值，這樣在 Django 管理介面或終端機中，Todo 物件會顯示標題

'''
這個 models.py 檔案定義了一個簡單的 Todo 模型，代表一個待辦事項清單的資料結構。它的資料庫表會有以下欄位：
title：待辦事項的標題（最多 200 個字符）。
completed：是否完成（預設為未完成）。
created_at：創建時間（自動記錄）。
而且，當你在後台管理介面或程式裡看到這些待辦事項時，它會直接顯示標題，方便你一眼看出是什麼事。
'''

# Create your models here.
