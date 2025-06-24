import LoginScreen from '@features/auth/LoginScreen';
import SplashScreen from '@features/auth/SplashScreen';
import RestaurantScreen from '@features/restaurants/RestaurantScreen';
import AnimatedTabs from '@features/tabs/AnimatedTabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '@utils/NavigationUtils';
import {FC} from 'react';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="LoginScreen"
          options={{animation: 'fade'}}
          component={LoginScreen}
        />
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
        <Stack.Screen
          name="UserBottomTab"
          options={{animation: 'fade'}}
          component={AnimatedTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
