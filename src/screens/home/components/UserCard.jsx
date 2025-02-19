import { Text,Platform,Dimensions,View } from 'react-native'
import React from 'react'

const UserCard = ({ user }) => {
    const { name, email, phone } = user
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const scale = Dimensions.get('window').scale;
    const os = Platform.OS;

    const textSize = Math.floor(24/scale);

    return (
        <View className={`bg-white p-5 border-[1px] border-zinc-300 rounded-md shadow ${os == 'ios' ? 'shadow-zinc-300':'shadow-zinc-700'}`}>
            <Text className='font-bold text-xl' style={{textSize: textSize}}>{name}</Text>
            <Text style={{textSize: textSize}}>{phone}</Text>
            <Text className='font-light text-black' style={{textSize: textSize}}>{email}</Text>
        </View>
    )
}

export default UserCard