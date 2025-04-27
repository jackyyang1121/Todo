from django.db import models

# 定義待辦事項的數據模型
class Todo(models.Model):
    # 標題字段，最大長度 200 個字符
    title = models.CharField(max_length=200)
    # 是否完成，默認為 False（未完成）
    completed = models.BooleanField(default=False)
    # 創建時間，自動設為當前時間
    created_at = models.DateTimeField(auto_now_add=True)

    # 當我們打印這個對象時，返回標題
    def __str__(self):
        return self.title
# Create your models here.
