import { Text, View } from 'react-native'
import React from 'react'

const UserCard = ({ user }) => {
    const { name, email, phone } = user

    return (
        <View className='bg-white p-5 border-[1px] border-zinc-300 rounded-md shadow shadow-zinc-800'>
            <Text className='font-bold text-xl'>{name}</Text>
            <Text>{phone}</Text>
            <Text className='font-light text-black'>{email}</Text>
        </View>
    )
}

export default UserCard