import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import FooterMenu from './menus/FooterMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostContext } from '@/context/postContext';
import PostCard from './menus/PostCard';

const Home = () => {
    const [posts, getAllPost] = useContext(PostContext);
    const [refreshing, setRefreshing] = useState(false);

    //refresh Control
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllPost;
        setTimeout(() => {
            setRefreshing(false);
        }, 2000)
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View className="flex-1 justify-center items-center">
                    <PostCard posts={posts} />
                </View>
            </ScrollView>
            <FooterMenu />
        </SafeAreaView>
    );
};

export default Home;