import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
useNavigation

const EditModalBox = ({ modalVisible, setModalVisible, post }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    //Navigation
    const navigation = useNavigation();

    //initial post data
    useEffect(() => {
        setTitle(post?.title);
        setDescription(post?.description);
    }, [post])

    //handle update post 
    const updatePostHandle = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.put(`/post/update-post/${id}`, { title, description });
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
        <SafeAreaProvider>
            <SafeAreaView style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Update Your Post</Text>
                            {/* <Text style={styles.modalText}>{JSON.stringify(post, null, 4)}</Text> */}

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

                            <View className='flex-row gap-32'>
                                <TouchableOpacity
                                    className="bg-blue-500 flex-row items-center px-4 py-2 rounded-lg"
                                    onPress={() => { updatePostHandle(post && post._id), setModalVisible(!modalVisible) }}
                                >
                                    <Text className="text-white font-semibold ml-2">{loading ? "please wait..." : "Update Post"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-red-600 flex-row items-center px-4 py-2 rounded-lg"
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text className="text-white font-semibold ml-2" >Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>

    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});


export default EditModalBox