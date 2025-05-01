/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
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
  // 定義狀態，用於儲存新待辦事項的標題
  const [newTodo, setNewTodo] = useState<string>('');

  // useEffect 在組件載入時執行一次，獲取後端數據
  useEffect(() => {
    fetchTodos();
  }, []);

  // 獲取待辦事項的函數
  const fetchTodos = () => {
    axios.get<Todo[]>('http://10.0.2.2:8000/api/todos/')
      .then(response => {
        console.log('API Response:', response.data);
        setTodos(response.data);
      })
      .catch(error => {
        console.error('API Error:', error.message);
        if (error.response) {
          console.error('Response Data:', error.response.data);
          console.error('Response Status:', error.response.status);
        } else if (error.request) {
          console.error('No Response Received:', error.request);
        }
      });
  };

  // 新增待辦事項的函數
  const addTodo = () => {
    if (!newTodo.trim()) {
      Alert.alert('錯誤', '請輸入待辦事項標題');
      return;
    }

    axios.post('http://10.0.2.2:8000/api/todos/', {
      title: newTodo,
      completed: false,
    })
      .then(response => {
        console.log('Add Todo Response:', response.data);
        setTodos([...todos, response.data]); // 將新待辦事項添加到列表
        setNewTodo(''); // 清空輸入框
      })
      .catch(error => {
        console.error('Add Todo Error:', error.message);
        Alert.alert('錯誤', '無法新增待辦事項');
      });
  };

  // 切換待辦事項完成狀態的函數
  const toggleTodo = (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, completed: !todo.completed };

    axios.put(`http://10.0.2.2:8000/api/todos/${id}/`, updatedTodo)
      .then(response => {
        console.log('Toggle Todo Response:', response.data);
        setTodos(todos.map(t => (t.id === id ? response.data : t)));
      })
      .catch(error => {
        console.error('Toggle Todo Error:', error.message);
        Alert.alert('錯誤', '無法更新待辦事項');
      });
  };

  // 刪除待辦事項的函數
  const deleteTodo = (id: number) => {
    axios.delete(`http://10.0.2.2:8000/api/todos/${id}/`)
      .then(() => {
        console.log('Delete Todo Success');
        setTodos(todos.filter(t => t.id !== id));
      })
      .catch(error => {
        console.error('Delete Todo Error:', error.message);
        Alert.alert('錯誤', '無法刪除待辦事項');
      });
  };

  // 渲染 UI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>待辦事項列表</Text>
      {/* 新增待辦事項的輸入框和按鈕 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="輸入新待辦事項"
          value={newTodo}
          onChangeText={setNewTodo}
          multiline={true} // 支援多行輸入
          keyboardType="default" // 支援多語言輸入
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>新增</Text>
        </TouchableOpacity>
      </View>
      {todos.length === 0 && <Text>暫無待辦事項</Text>}
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }: { item: Todo }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <Text style={item.completed ? styles.completed : styles.uncompleted}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>刪除</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

// 定義樣式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  uncompleted: {
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default App;