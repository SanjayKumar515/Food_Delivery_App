import { View, Text, StatusBar, Platform, Image, Animated, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { loginStyles } from '@unistyles/authStyles'
import { useStyles } from 'react-native-unistyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomText from '@components/global/CustomText'
import BreakerText from '@components/ui/BreakerText'
import PhoneInput from '@components/ui/PhoneInput'
import { resetAndNavigate } from '@utils/NavigationUtils'
import SocialLogin from '@components/ui/SocialLogin'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'


const LoginScreen: FC = () => {
    const animatedValue = useRef( new Animated.Value( 0 ) ).current
    const keyboardOffsetHeight = useKeyboardOffsetHeight()
    const { styles } = useStyles( loginStyles )
    const [ phone, setPhone ] = useState( '' )
    const [ loading, setLoading ] = useState( false )


    useEffect( () => {
        if ( keyboardOffsetHeight == 0 ) {
            Animated.timing( animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            } ).start()

        } else {

            Animated.timing( animatedValue, {
                toValue: -keyboardOffsetHeight * 0.25,
                duration: 500,
                useNativeDriver: true
            } ).start()

        }

    }, [keyboardOffsetHeight] )

    const handleLogin = async () => {
        setLoading( true )
        setTimeout( () => {
            setLoading( false )
            resetAndNavigate( "UserBottomTab" )
        }, 2000 )
    }

    return (
        <SafeAreaView style={ styles.container }>
            <StatusBar hidden={ Platform.OS !== 'android' } />

            <Image
                source={ require( '@assets/images/login.png' ) }
                style={ styles.cover }
            />

            <Animated.ScrollView
                bounces={ false }
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode={ 'on-drag' }
                style={{transform:[{translateY:animatedValue}]}}
                contentContainerStyle={ styles.bottomContainer }
            >

                <CustomText fontFamily='Okra-Bold' variant='h2' style={ styles.title }>
                    India's #1 Food Delivery App
                </CustomText>

                <BreakerText text='Log in or sign up' />

                <PhoneInput
                    onfocus={ () => { } }
                    onBlur={ () => { } }
                    value={ phone }
                    onChangeText={ setPhone }
                />


                <TouchableOpacity
                    style={ styles.buttonContainer }
                    activeOpacity={ 0.8 }
                    onPress={ handleLogin }

                >
                    { loading ? ( <ActivityIndicator size='small' color="#fff" /> ) : ( <CustomText color='#fff' fontFamily='Okra-Medium' variant="h5">
                        Continue
                    </CustomText> ) }

                </TouchableOpacity>
                <BreakerText text='or' />

                <SocialLogin />
            </Animated.ScrollView>

            <View style={ styles.footer }>
                <CustomText>By continuing, you agree to our</CustomText>
                <View style={ styles.footerTextContainer }>
                    <CustomText style={ styles.footerText }>Terms of Services</CustomText>
                    <CustomText style={ styles.footerText }>Privacy Policy</CustomText>
                    <CustomText style={ styles.footerText }>Content Policies</CustomText>
                </View>


            </View>

        </SafeAreaView>
    )
}

export default LoginScreen