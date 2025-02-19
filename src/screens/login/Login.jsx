import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Input from './components/Input';
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const [formData, setFormData] = useState({});
    const navigation = useNavigation();
  
    return (
      <View className="flex-1 bg-black px-5 pt-10">
        <Text className="text-red-600 text-3xl font-bold self-start">NETFLIX</Text>
        <View className="flex-1 justify-center">
          <Text className="text-white text-2xl font-bold mb-5 self-start">Sign In</Text>
          <TextInput className="w-full h-12 bg-gray-800 rounded px-4 text-white mb-4" placeholder="Email" placeholderTextColor="#888" />
          <TextInput className="w-full h-12 bg-gray-800 rounded px-4 text-white mb-4" placeholder="Password" placeholderTextColor="#888" secureTextEntry />
          <TouchableOpacity className="w-full h-12 bg-red-600 items-center justify-center rounded mt-2">
            <Text className="text-white text-lg font-bold">Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text className="text-gray-500 mt-5 text-center">New to Netflix? <Text className="text-white font-bold">Sign up now</Text></Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };

export default Login