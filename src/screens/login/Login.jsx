import {View,Text,TextInput,TouchableOpacity,Image,SafeAreaView,} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMMKVString } from "react-native-mmkv";
import axios from "axios";
import Logo from "../../assets/Logonetflix.png";

const API_URL = "http://192.168.1.73:5001/api/v1/auth/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const [token, setToken] = useMMKVString("authToken");

  const handleSignIn = async () => {
    try {
      const requestBody = {
        email: email,
        password: password,
      };

      console.log("Sending request:", requestBody);

      const response = await axios.post(API_URL, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const authToken = response.data.token;
      setToken(authToken);
      console.log("Token saved:", authToken);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <View className="flex-1 bg-black px-5 pt-10">
      <Image source={Logo} className="w-25 h-10 right-20" resizeMode="contain" />

      <View className="flex-1 justify-center mb-52">
        <Text className="text-white text-3xl font-bold mb-5 self-start">
          Sign In
        </Text>

        <TextInput
          className="w-full h-12 bg-gray-800 rounded px-4 text-white mb-4"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#888"
        />

        <TextInput
          className="w-full h-12 bg-gray-800 rounded px-4 text-white mb-4"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#888"
          secureTextEntry
        />

        <TouchableOpacity
          className="w-full h-12 bg-red-600 items-center justify-center rounded mt-2"
          onPress={handleSignIn}
        >
          <Text className="text-white text-lg font-bold">Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text className="text-gray-500 mt-5 text-center">
            New to Netflix?{" "}
            <Text className="text-white font-bold">Sign up now</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
