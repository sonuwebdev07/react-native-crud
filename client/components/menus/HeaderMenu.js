import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '@/context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const HeaderMenu = () => {
    const [state, setState] = useContext(AuthContext);
    const navigation = useNavigation();


    //Log out 
    const handleLogout = async () => {
        setState({ token: '', user: null })
        await AsyncStorage.removeItem('@auth')
        navigation.navigate('Login')
        alert("Logout Successfully")
    }

    return (
        <SafeAreaView>
            <View >
                <TouchableOpacity onPress={handleLogout} className="items-center">
                    <Icon name="logout" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HeaderMenu;
