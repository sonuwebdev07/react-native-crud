import {
    View,
    Text,
    Alert,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import InputBox from "@/components/form/InputBox";
import InputSubmit from "@/components/form/InputSubmit";
import axios from 'axios';

const Register = ({ navigation }) => {
    //states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    //functions

    const handleSubmit = async () => {
        try {
            setLoading(true)
            if (!name || !email || !password) {
                Alert.alert("Please Fill All the Details");
                setLoading(false);
                return;
            }
            setLoading(false);
            const { data } = await axios.post('/auth/register', { name, email, password });
            Alert.alert(data && data.message);
            navigation.navigate('Login');
            console.log('Register Data ==>', { name, email, password })
        } catch (err) {
            Alert.alert(err.response.data.message);
            setLoading(false);
            console.log(err);
        }

    }

    return (
        <SafeAreaView className="bg-primary flex-1 px-2">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className='p-6 bg-white justify-center h-full'>
                    <Text className='text-2xl font-bold mb-4 text-center'>Register</Text>

                    <InputBox
                        inputTitle="Name"
                        inputPlaceholder="Enter Name"
                        secureTextEntry={false}
                        value={name}
                        setValue={setName}
                    />
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
                        {/* <Text>{JSON.stringify({ name, email, password, cpassword }, null, 4)}</Text> */}
                        <InputSubmit buttonTitle="Register" loading={loading} handleSubmit={handleSubmit} />
                    </View>
                    <Text className='mt-4'>Already Register Please <Text className='text-red-700' onPress={() => navigation.navigate('Login')}>LOGIN</Text> </Text>

                </View >
            </ScrollView>
        </SafeAreaView >
    );
};

export default Register

