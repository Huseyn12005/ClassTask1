import { TextInput } from 'react-native'
import React from "react";

const Input = ({ name, setFormData, value, placeholder, secureTextEntry }) => {
  return (
      <TextInput
        className='border border-gray-300 rounded-lg p-4 text-lg bg-white'
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setFormData((prev) => ({ ...prev, [name]: text }))}
        secureTextEntry={secureTextEntry}
      />
  );
};

export default Input;