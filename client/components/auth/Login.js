import { View, Text, SafeAreaView, Alert, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import InputBox from '@/components/form/InputBox'
import InputSubmit from '@/components/form/InputSubmit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '@/context/authContext';


const Login = ({ navigation }) => {

    //Global State
    const [state, setState] = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async () => {
        try {
            setLoading(true)
            if (!email || !password) {
                Alert.alert("Please Fill All the Details");
                setLoading(false);
                return;
            }
            setLoading(false);
            const { data } = await axios.post('/auth/login', { email, password });
            setState(data);
            await AsyncStorage.setItem('@auth', JSON.stringify(data));
            Alert.alert(data && data.message);
            navigation.navigate('Home');

            console.log('Login Data ==>', { email, password })
        } catch (err) {
            Alert.alert(err.response.data.message);
            setLoading(false);
            console.log(err);
        }
    }
    // temp function to check localStorage
    const getLocalStorageData = async () => {
        let data = await AsyncStorage.getItem('@auth');
        console.log('Local Storage : ', data);
    };
    getLocalStorageData();
    return (

        <SafeAreaView className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="p-6 bg-white justify-center min-h-screen">
                    <Text className="text-2xl font-bold mb-4 text-center">Login</Text>

                    <InputBox
                        inputTitle="Email"
                        inputPlaceholder="Enter Email"
                        secureTextEntry={false}
                        value={email}
                        setValue={setEmail}
                    />
                    <InputBox
                        inputTitle="Password"
                        inputPlaceholder="Password"
                        secureTextEntry={true}
                        value={password}
                        setValue={setPassword}
                    />

                    <View>
                        <InputSubmit buttonTitle="Login" loading={loading} handleSubmit={handleSubmit} />
                    </View>

                    <Text className="mt-4">
                        Don't Have an account? Please{" "}
                        <Text className="text-red-700" onPress={() => navigation.navigate("Register")}>
                            Register
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default Login