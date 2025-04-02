import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import { useNavigation } from '@react-navigation/native'
import EditModalBox from "./EditModalBox";

const PostCard = ({ posts, myPostScreen }) => {

    //loading state
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({})
    const navigation = useNavigation();


    //delete prompt
    const handleDeletePrompt = (id) => {
        Alert.alert('Attention!!', 'Are you Sure Want to delete this post',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log('Cancel Pressed');
                    }
                },
                {
                    text: 'Delete',
                    onPress: () => handleDeletePost(id)
                }
            ]);
    }

    const handleDeletePost = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(`/post/delete-post/${id}`)
            setLoading(false);
            alert(data?.message);
            navigation.push('MyPost');
        } catch (error) {
            setLoading(false);
            console.log(error);
            alert(error);
        }
    }


    return (
        <View>
            <Text className="text-lg font-bold mb-2 text-green-700">Total Posts {posts.length}</Text>
            {myPostScreen && <EditModalBox modalVisible={modalVisible} setModalVisible={setModalVisible} post={post} />}
            {posts?.map((post, i) => (
                <View className="bg-white p-4 rounded-2xl mt-5 w-96 shadow-md mb-4 border border-gray-200" key={i}>
                    {myPostScreen && (<View className="flex-1 justify-center items-end">
                        <Text className="text-gray-900">
                            <Icon name="edit" color="grey" size={18} onPress={() => { setPost(post), setModalVisible(true) }} /> &nbsp;&nbsp;
                            <Icon name="delete" color="red" size={18} onPress={() => handleDeletePrompt(post?._id)} />
                        </Text>
                    </View>)}

                    <Text className="text-lg font-bold text-gray-900">{post?.title}</Text>
                    <Text className="border h-0"></Text>
                    <Text className="text-gray-600 mt-2">{post?.description}</Text>
                    {post?.postedBy?.name && (<Text className="text-gray-600 mt-2">{" "}<Icon name="person" size={18} /> {" "}Posted by : {post?.postedBy?.name}</Text>)}

                    <Text className="text-xs text-gray-400 mt-3">{" "}<Icon name="schedule" size={18} />{" "} Posted on : {moment(post?.createdAt).format("HH:MM DD:MM:YYYY")}</Text>
                </View>
            ))}
        </View>
    );
};

export default PostCard;
