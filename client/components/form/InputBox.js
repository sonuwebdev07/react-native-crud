import { Text, View, TextInput } from 'react-native';
import React from 'react';

// interface Props {
//     inputTitle: string;
//     inputPlaceholder: string;
//     secureTextEntry: boolean;
//     value?: string;
//     setValue?: (text: string) => void;
//     onChangeText?: (text: string) => void;
// }

const InputBox = ({ inputTitle, inputPlaceholder, secureTextEntry, onChangeText, value, setValue }) => {
    return (
        <View>
            <Text className='mb-3'>{inputTitle}</Text>
            <TextInput
                placeholder={inputPlaceholder}
                className='border p-3 mb-4 rounded-md'
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    )
}

export default InputBox