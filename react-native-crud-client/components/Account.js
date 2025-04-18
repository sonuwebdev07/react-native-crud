import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '@/context/authContext';
import FooterMenu from './menus/FooterMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';
import axios from 'axios';

const Account = ({ navigation }) => {
    // Global state
    const [state, setState] = useContext(AuthContext);
    const { findUser } = state;

    // Local state
    const [name, setName] = useState(findUser?.name || '');
    const [password, setPassword] = useState('');
    const [email] = useState(findUser?.email || '');
    const [loading, setLoading] = useState(false);

    // Update User
    const handleUpdate = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put('/auth/update-user', {
                name,
                password: password || undefined,
                email
            });

            setState({ ...state, findUser: data.updatedUser });
            setLoading(false);
            alert(data?.message || "Profile updated successfully!");
            navigation.navigate('Login');
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
            setLoading(false);
            console.error(error);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                <View className="flex-1 justify-center items-center px-4">
                    {findUser ? (
                        <>
                            <Text className="text-lg font-bold mb-6">Account</Text>
                            <Image
                                source={icons.person}
                                className="w-32 h-32 mb-6 rounded-full border-4 border-white shadow-md"
                            />
                            <Text className="text-red-700 text-center mb-6">
                                You can update your name and password from here
                            </Text>

                            <View className="w-full">
                                {/* Name */}
                                <View>
                                    <Text className="text-base mb-2">Name</Text>
                                    <TextInput
                                        className="border p-3 mb-4 rounded-md"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>

                                {/* Email */}
                                <View>
                                    <Text className="text-base mb-2">Email</Text>
                                    <TextInput
                                        className="border p-3 mb-4 rounded-md bg-gray-100"
                                        value={email}
                                        editable={false}
                                    />
                                </View>

                                {/* Password */}
                                <View>
                                    <Text className="text-base mb-2">Password</Text>
                                    <TextInput
                                        className="border p-3 mb-4 rounded-md"
                                        value={password}
                                        secureTextEntry
                                        placeholder="Enter new password"
                                        onChangeText={setPassword}
                                    />
                                </View>

                                {/* Role */}
                                <View>
                                    <Text className="text-base mb-2">Role</Text>
                                    <TextInput
                                        className="border p-3 mb-6 rounded-md bg-gray-100"
                                        value={findUser?.role ? String(findUser.role) : ""}
                                        editable={false}
                                    />
                                </View>
                            </View>

                            {/* Update Profile Button */}
                            <TouchableOpacity
                                className="bg-blue-500 px-6 py-3 rounded-md"
                                onPress={handleUpdate}
                                disabled={loading}
                            >
                                <Text className="text-white text-base font-bold">
                                    {loading ? "Please Wait..." : "Update Profile"}
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <View className='w-full justify-center flex-1'>
                            <TouchableOpacity
                                className="bg-gray-800 px-6 py-3 mt-4 w-full rounded-md"
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text className="text-white text-base text-center font-bold">Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-gray-800 px-6 py-3 mt-4 mb-6 w-full rounded-md"
                                onPress={() => navigation.navigate('Register')}
                            >
                                <Text className="text-white text-base text-center font-bold">Register</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
            <FooterMenu />
        </SafeAreaView>
    );
};

export default Account;
