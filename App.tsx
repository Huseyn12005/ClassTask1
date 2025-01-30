import "./global.css"
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from "./src/screens/home/Home"
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context"
import Login from "./src/screens/login/Login"

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <Login/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App

