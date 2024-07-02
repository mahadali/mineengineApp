import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';
import AuthLanding from '../screens/auth/auth-landing';
import { color } from '../config/theme';
import MainScreen from '../screens/dashboard';
import ForgotPassword from '../screens/auth/forgot-password';

const AuthStack = createNativeStackNavigator();
const DashboardNav = createNativeStackNavigator();

export function Auth() {
    return (
        <AuthStack.Navigator
            initialRouteName="AuthLanding"
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom',
                sceneContainerStyle: {
                    backgroundColor: color.screenBg,
                },
            }}
        >
            <AuthStack.Screen name="AuthLanding" component={AuthLanding} />
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
            <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
        </AuthStack.Navigator>
    );
}

export function MainNav() {
    return (
        <DashboardNav.Navigator
            initialRouteName="MainScreen"
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom',
                sceneContainerStyle: {
                    backgroundColor: color.screenBg,
                },
            }}
        >
            <DashboardNav.Screen name="MainScreen" component={MainScreen} />
        </DashboardNav.Navigator>
    );
}
