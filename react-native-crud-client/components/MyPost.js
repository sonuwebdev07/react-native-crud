import { View, Text, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterMenu from './menus/FooterMenu'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import PostCard from './menus/PostCard'



const MyPost = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);


    //get user Posts
    const getUserPost = async (req, res) => {
        try {
            setLoading(true);
            const { data } = await axios.get('/post/get-user-post');
            setLoading(false);
            setPosts(data?.userPosts);
        } catch (error) {
            setLoading(false);
            console.log(error);
            alert(error);
        }
    }

    //initial 
    useEffect(() => {
        getUserPost();
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView >
                <View className="flex-1 justify-center items-center">
                    <PostCard posts={posts} myPostScreen={true} />
                </View>
            </ScrollView>
            <FooterMenu />
        </SafeAreaView>
    )
}

export default MyPost