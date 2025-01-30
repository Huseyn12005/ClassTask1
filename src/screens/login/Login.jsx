import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Input from './components/Input';

const Login = () => {
    const [formData, setFormData] = useState({});
  
    return (
      <View className='h-full p-5 gap-4 justify-center bg-gray-100'>
        <Text className='text-4xl text-black text-center mb-3'>Login</Text>
  
        <Input 
          name="email" 
          setFormData={setFormData} 
          value={formData?.email} 
          placeholder="Enter your email" 
        />
  
        <Input 
          name="password" 
          setFormData={setFormData} 
          value={formData?.password} 
          placeholder="Enter your password" 
          secureTextEntry={true}
        />
  
        <TouchableOpacity
          onPress={() => console.log(formData)}
          className='bg-blue-700 py-6 rounded-lg'
        >
          <Text className='text-center text-white text-xl'>Login</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default Login