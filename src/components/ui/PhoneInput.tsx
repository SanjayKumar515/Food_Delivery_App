import { View, Text, Pressable, TextInput } from 'react-native'
import React, { FC } from 'react'
import { phoneStyles } from '@unistyles/phoneStyles';
import { useStyles } from 'react-native-unistyles';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import { Colors } from '@unistyles/Constants';


interface PhoneInputProps {
    value?: string;
    onChangeText?: ( text: string ) => void;
    onfocus?: () => void;
    onBlur?: () => void;
}

const PhoneInput: FC<PhoneInputProps> = ( {
    value,
    onChangeText,
    onBlur,
    onfocus
} ) => {

    const { styles } = useStyles( phoneStyles )

    return (
        <View style={styles.container}>
            <Pressable style={styles.countryPickerContainer}>
             <CustomText variant="h2">IN</CustomText>

             <Icon
             iconFamily='Ionicons'
             name='caret-down-sharp'
             color={Colors.lightText}
             size={18}
             />
            </Pressable>

            <View style={styles.phoneInputContainer}>
                <CustomText fontFamily='Okra-Bold'>+91</CustomText>
                <TextInput
                placeholder='Enter Mobile Number'
                keyboardType='phone-pad'
                value={value}
                maxLength={10}
                placeholderTextColor={Colors.lightText}
                onChangeText={onChangeText}
                onFocus={onfocus}
                onBlur={onBlur}
                style={styles.input}
                />

            </View>
        </View>
    )
}

export default PhoneInput