import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

// interface Props {
//     buttonTitle: string;
//     loading: string;
//     setValue?: (text: string) => void;
//     handleSubmit?: (text: string) => void;
// }

const InputSubmit = ({ buttonTitle, handleSubmit, loading }) => {
    return (
        <TouchableOpacity onPress={handleSubmit}
            className='bg-blue-500 p-3 rounded-md'>
            <Text className='text-white text-center'>{loading ? 'Please Wait...' : buttonTitle}</Text>
        </TouchableOpacity>
    )
}

export default InputSubmit