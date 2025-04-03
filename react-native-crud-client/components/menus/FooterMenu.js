import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const FooterMenu = () => {
    //Hooks
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <SafeAreaView className="bg-gray-800">
            <View className="flex-row justify-around items-center bg-gray-800 py-3 border-t border-gray-700">
                <TouchableOpacity onPress={() => navigation.navigate('Home')} className="items-center">
                    <Icon name="home" size={24} color={route.name === "Home" && "orange"} />
                    <Text className="text-white text-xs">Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Post')} className="items-center">
                    <Icon name="add" size={24} color={route.name === "Post" && "orange"} />
                    <Text className="text-white text-xs">Post</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('MyPost')} className="items-center">
                    <Icon name="list" size={24} color={route.name === "MyPost" && "orange"} />
                    <Text className="text-white text-xs">My Posts</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Account')} className="items-center">
                    <Icon name="person" size={24} color={route.name === "Account" && "orange"} />
                    <Text className="text-white text-xs">Account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default FooterMenu;