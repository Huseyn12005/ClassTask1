import { View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/Logonetflix.png';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignUp = async () => {
    if (!username || !email || !password) {
      console.error("All fields are required");
      return;
    }

    try {
      const requestBody = JSON.stringify({
        username: username, 
        email: email, 
        password: password,
      });

      console.log("Sending request:", requestBody);

      const response = await fetch("http://192.168.1.73:5001/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: requestBody,
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Sign-Up failed:", responseData.message);
        return;
      }

      console.log("Sign-Up successful");
      navigation.navigate("SignIn"); 

    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <View className="flex-1 bg-black px-5 pt-10">
      <Image source={Logo} className="w-25 h-10 right-20" resizeMode="contain" />
      <View className="flex-1 justify-center mb-52">
        <Text className="text-white text-3xl font-bold mb-5 self-start">Sign Up</Text>
        <TextInput className="w-full h-12 bg-gray-800 rounded px-4 text-white mb-4" placeholder="Username" value={username} onChangeText={setUsername} placeholderTextColor="#888" />
        <TextInput className="w-full h-12 bg-gray-800 rounded px-4 text-white mb-4" placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor="#888" />
        <TextInput className="w-full h-12 bg-gray-800 rounded px-4 text-white mb-4" placeholder="Password" value={password} onChangeText={setPassword} placeholderTextColor="#888" secureTextEntry />
        <TouchableOpacity className="w-full h-12 bg-red-600 items-center justify-center rounded mt-2" onPress={handleSignUp}>
          <Text className="text-white text-lg font-bold">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text className="text-gray-500 mt-5 text-center">Already have an account? <Text className="text-white font-bold">Sign in</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;