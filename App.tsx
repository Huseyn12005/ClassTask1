import "./global.css"
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from "./src/screens/home/Home"
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context"
import Login from "./src/screens/login/Login"
import Todo from "./src/screens/todo/Todo"

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <Todo/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App

