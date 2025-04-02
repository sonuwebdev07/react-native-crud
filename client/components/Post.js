import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FooterMenu from './menus/FooterMenu'
import { TextInput } from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PostContext } from '@/context/postContext'


const Post = ({ navigation }) => {

    //global state
    const [posts, setPosts] = useContext(PostContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePost = async (req, res) => {
        try {
            setLoading(true);
            if (!title || !description) {
                alert("Please add Post Title or Description")
            }
            const { data } = await axios.post('/post/create-post', { title, description });
            setLoading(false);
            setPosts([...posts, data?.posts]);
            alert(data?.message)
            navigation.navigate('Home');
        } catch (error) {
            alert(error.response.data.message || error.message);
            setLoading(false);
            console.log(error);
        }
    }
    return (

        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 justify-center items-center">
                    <Text className="text-lg font-semibold mb-4">Create a Post</Text>

                    <TextInput
                        className='w-96 border p-3 mb-4 rounded-md'
                        placeholder="Enter Post Title"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />

                    <TextInput
                        className='w-96 border p-3 mb-4 rounded-md h-32'
                        placeholder="Enter Post Description"
                        multiline={true}
                        numberOfLines={6}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />

                    <TouchableOpacity
                        className="bg-blue-500 flex-row items-center px-4 py-2 rounded-lg"
                        onPress={handlePost}
                    >
                        <Icon name="add" size={24} color="white" />
                        <Text className="text-white font-semibold ml-2">Create Post</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <FooterMenu />
        </SafeAreaView>

    )
}

export default Post