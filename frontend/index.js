/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
/*
當我寫 import App from './App' 時，模組系統會自動查找以下文件（按優先級）：
./App.js
./App.tsx
./App.ts
./App.jsx
*/
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App); /*App只是變數可更改*/
/*
這行代碼使用 AppRegistry.registerComponent 註冊應用程式的根組件。
第一個參數 appName 是應用程式的名稱（從 app.json 導入），React Native 會用它來識別應用。
第二個參數是一個函數 () => App，它返回你導入的 App 組件（即 App.tsx 中的默認導出）。
這告訴 React Native，當應用啟動時，應該渲染 App 組件作為應用程式的入口點。
*/