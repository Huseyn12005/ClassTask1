import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import Input from '../login/components/Input';

const Todo = () => {
    const [todo, setTodo] = useState({});
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch("http://172.20.30.67:5001/cards", {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTodos(data);
            }
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const addTodo = async () => {
        try {
            const response = await fetch("http://172.20.30.67:5001/cards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(todo)
            });

            if (response.ok) {
                getTodos();
                setTodo({});
            }
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://172.20.30.67:5001/cards/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            });
            if (response.ok) {
                getTodos();
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <View className='h-full p-5 gap-4'> 
        <Text className='text-2xl font-bold text-center mb-4'>Add todo</Text>
        
        <Input
                name="title"
                setFormData={setTodo}
                value={todo.title}
                placeholder="Enter title"
            />
            <Input
                name="description"
                setFormData={setTodo}
                value={todo.description}
                placeholder="Enter description"
            />
        <TouchableOpacity className='bg-blue-500 p-3 rounded-lg mb-4' onPress={addTodo}>
            <Text className='text-white text-center font-bold'>Send</Text>
        </TouchableOpacity>
        
        <Text className='text-xl font-bold mb-2'>Todos</Text>
        <FlatList
            data={todos}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <View className='flex-row justify-between items-center p-3 mb-2 bg-white rounded-lg shadow'> 
                    <View>
                        <Text className='font-bold text-lg'>{item.title}</Text>
                        <Text>{item.description}</Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteTodo(item._id)}>
                        <Text className='text-red-500 text-lg font-bold'>X</Text>
                    </TouchableOpacity>
                    
                </View>
            )}
            ListEmptyComponent={() => (
                <Text className='text-center text-gray-500'>No items found</Text>
            )}
        />
    </View>
    );
};

export default Todo;