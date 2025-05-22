/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';   // 用於發送HTTP請求

// 定義待辦事項接口
interface Todo {  //interface和type一樣，都是用來定義型別的，但interface可以繼承，type不能
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

// 主應用組件
const App = () => {
  // 定義狀態，用於儲存待辦事項列表
  const [todos, setTodos] = useState<Todo[]>([]);
  /*
  <Todo[]>:
  TypeScript 語法，指定 todos 的類型是一個 Todo 物件的陣列。

  []:
  useState 的初始值，設定為空陣列，表示 todos 開始時沒有待辦事項。

  [todos, setTodos]:
  useState 返回一個陣列，包含兩部分：
  todos: 狀態變數，初始值為 []，用來存待辦事項列表。
  setTodos: 更新 todos 的函數，呼叫它可以改變 todos 的值並觸發組件重新渲染。
  */
  // 定義狀態，用於儲存新待辦事項的標題，新增待辦事項的輸入框
  const [newTodo, setNewTodo] = useState<string>('');
  /*
  <string>: TypeScript 的類型註記，指定 newTodo 的值必須是字串類型。
  '': 初始值，設定 newTodo 的初始狀態為空字串。
  */ 

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
    if (!newTodo.trim()) {   //.trim() 方法會從字串的兩端去除空格，並返回新的字串。
      //! 會將其後的表達式轉換為布林值（true 或 false），然後取其相反值。
      /*
      if (!newTodo.trim()) 的意思是：
      檢查 newTodo.trim() 是否為假值（例如空字串 ""、null、undefined、NaN 等）。
      如果 newTodo.trim() 是假值，則 !newTodo.trim() 為 true，if 塊內的程式碼會執行。
      如果 newTodo.trim() 是真值（非空字串），則 !newTodo.trim() 為 false，if 塊內的程式碼不會執行。
      */ 
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
        /*
        ... 是 JavaScript 的展開運算子，用於將陣列（或其他可迭代物件）的元素展開為單獨的元素。
        在這裡，...todos 將 todos 陣列的每個元素展開，然後與 response.data 一起組成一個新的陣列。
        */
        setNewTodo(''); // 清空輸入框
      })
      .catch(error => {
        console.error('Add Todo Error:', error.message);
        Alert.alert('錯誤', '無法新增待辦事項');
      });
  };

  // 切換待辦事項完成狀態的函數
  const toggleTodo = (id: number) => {  //toggleTodo 函數接受一個 id 參數，表示待辦事項的唯一識別碼，id由Django內建功能自動生成。
    const todo = todos.find(t => t.id === id);  //find() 方法用於在陣列中查找符合條件的元素，任何 JavaScript 陣列都可以使用 .find()，因為它是Array的內建方法。。
    //t 只是一個開發者自訂的參數名稱，可以是任何的變數名稱，功能只是要抓取陣列中的元素如id、title、completed、created_at。
    if (!todo) return;   //如果沒有找到符合條件的元素，則返回undefined。

    const updatedTodo = { ...todo, completed: !todo.completed };  //這行程式碼會將 todo 物件的 completed 屬性取反，即如果原本是 true，則變為 false，反之亦然。  
    axios.put(`http://10.0.2.2:8000/api/todos/${id}/`, updatedTodo)  
      .then(response => {
        console.log('Toggle Todo Response:', response.data);
        setTodos(todos.map(t => (t.id === id ? response.data : t)));
        /*
        t =>語法：(參數) => 表達式 或 (參數) => { 語句塊 }。
        箭頭 => 的作用：
        => 表示函數體的開始，後面跟著函數的返回值或執行邏輯。

        map 是 JavaScript 陣列的內建方法，遍歷todos陣列的每個元素，並根據回呼函數的返回值創建一個新陣列。

        ? response.data : t：
        條件運算子語法：條件 ? 值1 : 值2。
        如果 t.id === id 為 true，返回 response.data（從 API 返回的更新後的 Todo 物件）。
        如果 t.id === id 為 false，返回 t（原始的 Todo 物件，保持不變）。
        */
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
          placeholder="輸入新待辦事項"  //placeholder 是 React Native 的屬性，用於設置輸入框的提示文字。
          value={newTodo}     //value 是 React Native 的屬性，用於設置輸入框的值。
          onChangeText={setNewTodo}  //onChangeText 是 React Native 的屬性，用於設置輸入框的值變更時的回調函數。
          multiline={true} // 支援多行輸入
          keyboardType="default" // 支援多語言輸入
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>   
          <Text style={styles.buttonText}>新增</Text>
        </TouchableOpacity>
      </View>
      {todos.length === 0 && <Text>暫無待辦事項</Text>}
      <FlatList
        //<FlatList> 是 React Native 中用於渲染可滾動清單的元件
        data={todos}
        keyExtractor={item => item.id.toString()}
        //這句是用來為清單中的每個項目生成唯一標識id。
        //keyExtractor={item => item.id.toString()}這句是把每個項目的id轉成字串以此當他們的key，丟給下面用。
        renderItem={({ item }: { item: Todo }) => (
          /*
          renderItem 是 <FlatList> 的必需屬性，定義如何將 data 陣列中的每個項目渲染為 UI 元件。
          參數：
          item：當前遍歷的資料項目（這裡是 Todo 物件）。
          index：項目的索引（從 0 開始）。
          separators：用於管理分隔線的方法（例如高亮分隔線，未在你的程式碼中使用）。
          */
          /*
          ({ item })：
          使用解構賦值，從 renderItem 傳遞的參數物件中提取 item。
          renderItem 接收一個物件 { item, index, separators }，這裡只提取 item，因為你的程式碼僅需要 Todo 物件，忽略 index 和 separators。
          */ 
          /*
          : { item: Todo }：
          TypeScript 類型註記，指定解構出的 item 必須符合 Todo 介面。
          這確保 item 具有 id（number）、title（string）、completed（boolean）、created_at（string）屬性，增強類型安全。
          */ 
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