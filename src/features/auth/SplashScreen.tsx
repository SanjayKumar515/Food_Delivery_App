import { View, Text, StatusBar, Platform, Image } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useStyles } from 'react-native-unistyles'
import { splashStyles } from '@unistyles/authStyles'
import Animated ,{FadeInDown} from 'react-native-reanimated'
import CustomText from '@components/global/CustomText'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { SafeAreaView } from 'react-native-safe-area-context'

const SplashScreen: FC = () => {
    const { styles } = useStyles( splashStyles )

    useEffect(()=>{
        const timer = setTimeout(() => {
           resetAndNavigate( 'LoginScreen' )
        }, 2000);

        return () => clearTimeout(timer);
    },[])

    return (
        <SafeAreaView style={ styles.container }>
            <StatusBar hidden={ Platform.OS !== 'android' } />
            <Image
                source={ require( '@assets/images/logo.png' ) }
                style={ styles.logoImage } />

                <Animated.View
                    entering={ FadeInDown.delay(400).duration( 800 ) }
                    style={ styles.animatedContainer }>
                    <Image
                        source={ require( '@assets/images/tree.png' ) }
                        style={ styles.treeImage } />
                    <CustomText 
                    variant="h5"
                    style={styles.msgText}
                    fontFamily="Okra-Medium"
                    color="#fff"
                    >
                        From Kitchen to doorstep,Your cravings, delivered with love!
                    </CustomText>
                    </Animated.View>
        </SafeAreaView>
    )
}

export default SplashScreen