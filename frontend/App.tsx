/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

// 定義待辦事項接口
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

// 主應用組件
const App = () => {
  // 定義狀態，用於儲存待辦事項列表
  const [todos, setTodos] = useState<Todo[]>([]);

  // useEffect 在組件載入時執行一次，獲取後端數據
  useEffect(() => {
    // 使用 axios 發送 GET 請求到後端 API
    axios.get<Todo[]>('https://organic-tribble-r46pvpwv4g69cw569-8000.app.github.dev/api/todos/')
      .then(response => setTodos(response.data))  // 成功時更新 todos 狀態
      .catch(error => console.error(error));      // 失敗時打印錯誤
  }, []);  // 空依賴陣列表示只執行一次

  // 渲染 UI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>待辦事項列表</Text>
      {/* FlatList 用於顯示滾動列表 */}
      <FlatList
        data={todos}                          // 數據來源
        keyExtractor={item => item.id.toString()}  // 每個項目的唯一標識
        renderItem={({ item }: { item: Todo }) => (  // 渲染每個待辦事項
          <View style={styles.item}>
            <Text>{item.title}</Text>         {[/*顯示標題*/]}
            <Text>{item.completed ? '已完成' : '未完成'}</Text>  {[/*顯示完成狀態*/]}
          </View>
        )}
      />
    </View>
  );
};

// 定義樣式
const styles = StyleSheet.create({
  container: {
    flex: 1,          // 佔滿整個螢幕
    padding: 20,      // 內邊距 20
  },
  title: {
    fontSize: 24,     // 標題字體大小
    marginBottom: 20, // 下方間距
  },
  item: {
    padding: 10,             // 每個項目的內邊距
    borderBottomWidth: 1,    // 底部邊框寬度
    borderBottomColor: '#ccc',  // 底部邊框顏色
  },
});

export default App;  // 導出組件
