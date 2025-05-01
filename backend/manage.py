#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

"""
主函數 main():
環境變量設置:
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings"):
作用: 設置環境變量 DJANGO_SETTINGS_MODULE，指定 Django 項目的設置文件（在這裡是 backend/settings.py）。
為什麼需要: Django 需要知道項目的配置（如數據庫、應用列表等），而這個環境變量告訴 Django 去哪裡找設置文件。
setdefault: 如果 DJANGO_SETTINGS_MODULE 已經被設置（例如在其他環境中），則不會覆蓋它。

執行命令行指令:
功能: 調用 execute_from_command_line 函數，傳入 sys.argv（命令行參數）。
sys.argv: 這是一個列表，包含命令行輸入的參數。例如，運行 python manage.py runserver 時，sys.argv 會是 ['manage.py', 'runserver']。
作用: 將用戶輸入的命令（例如 runserver、migrate）傳遞給 Django 的命令行處理器，執行相應的管理任務。
"""

"""
白話說明
manage.py 就像是 Django 項目的「萬能遙控器」，你可以用它來控制項目的各種功能。當你輸入像 python manage.py runserver 這樣的命令時，這個文件會：

找到你的項目設置:
它會告訴 Django：「嘿，我的項目設置在 backend/settings.py 裡，你去那裡找配置吧！」
如果你已經在其他地方設置了這個信息，它就不會亂改。
檢查 Django 是否準備好:
它會試著載入 Django 的管理工具。如果 Django 沒裝，或者你的環境有問題（比如忘了激活虛擬環境），它會跳出來說：「兄弟，Django 沒找到！你是不是沒裝？還是忘了開虛擬環境？」
執行你的命令:
你輸入的命令（比如 runserver、migrate）會被傳給 Django，然後 Django 就去執行對應的工作。例如：
runserver: 啟動一個本地的開發服務器，讓你可以在瀏覽器裡看網站。
migrate: 幫你創建或更新數據庫表。
createsuperuser: 幫你創建一個管理員帳號。
"""


if __name__ == "__main__":
    main()
