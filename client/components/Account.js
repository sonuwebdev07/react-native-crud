import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '@/context/authContext'
import FooterMenu from './menus/FooterMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';
import axios from 'axios';

const Account = ({ navigation }) => {
    //Global state
    const [state, setState] = useContext(AuthContext);
    const { findUser, token } = state;

    //local state
    const [name, setName] = useState(findUser?.name);
    const [password, setPassword] = useState(findUser?.password);
    const [email] = useState(findUser?.email);
    const [loading, setLoading] = useState(false);

    //update User
    const handleUpdate = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put('/auth/update-user', { name, password, email });
            setLoading(false);
            let UD = JSON.stringify(data);
            setState({ ...state, user: UD?.updatedUser })
            navigation.navigate('Login')
            alert(data && data.message);
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);

        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                <View className="flex-1 justify-center items-center px-4">

                    <TouchableOpacity className=" bg-gray-800 px-6 py-3 mt-4 w-full rounded-md" onPress={() => navigation.navigate('Login')}>
                        <Text className="text-white text-base text-center font-bold">Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className=" bg-gray-800 px-6 py-3 mt-4 mb-6 w-full rounded-md" onPress={() => navigation.navigate('Register')}>
                        <Text className="text-white text-base text-center font-bold">Register</Text>
                    </TouchableOpacity>
                    <Text className="text-lg font-bold mb-6">Account</Text>

                    <Image
                        source={icons.person}
                        className="w-32 h-32 mb-6 rounded-full border-4 border-white shadow-md"
                    />

                    <Text className="text-red-700 text-center mb-6">
                        You can update your name and password from here
                    </Text>
                    {/* <Text>{JSON.stringify(state, null, 4)}</Text> */}

                    <View className="w-full">
                        <Text className="text-base mb-2">Name</Text>
                        <TextInput
                            className="border p-3 mb-4 rounded-md"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />

                        <Text className="text-base mb-2">Email</Text>
                        <TextInput
                            className="border p-3 mb-4 rounded-md bg-gray-100"
                            value={email}
                            editable={false}
                        />

                        <Text className="text-base mb-2">Password</Text>
                        <TextInput
                            className="border p-3 mb-4 rounded-md"
                            value={password}
                            secureTextEntry
                            onChangeText={(text) => setPassword(text)}
                        />

                        <Text className="text-base mb-2">Role</Text>
                        <TextInput
                            className="border p-3 mb-6 rounded-md bg-gray-100"
                            value={state.findUser?.email}
                            editable={false}
                        />
                    </View>
                    <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-md" onPress={handleUpdate}>
                        <Text className="text-white text-base font-bold">{loading ? "please Wait..." : "Update Profile"}</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

            <FooterMenu />
        </SafeAreaView>

    )
}

export default Account