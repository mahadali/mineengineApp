import React, { useEffect, useReducer, useState } from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastProvider } from 'react-native-toast-notifications';
import { Auth, MainNav } from './src/routes/main-routes';
import { UserContext, userReducer } from './src/context/user-context';
import { color } from './src/config/theme';
import LandingScreen from './src/screens/landing/landing-screen';
import { AUTH_TOKEN } from './src/utils/token-manager';
import { setAuthToken } from './src/utils/api';

function App() {
    const [showLanding, setShowLanding] = useState(true);

    const [user, dispatchUser] = useReducer(userReducer, []);

    const queryClient = new QueryClient();

    const getUserToken = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(AUTH_TOKEN);
            const res = jsonValue != null ? JSON.parse(jsonValue) : null;
            if (res && Object.keys(res).length !== 0) {
                dispatchUser({
                    type: 'SET_USER',
                    user: {
                        ...res,
                        loggedIn: true,
                    },
                });
                setAuthToken(res.token);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUserToken();

        setTimeout(() => {
            setShowLanding(false);
        }, 3000);
    }, []);

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent={true} />

            {Platform.OS === 'ios' ? <LandingScreen show={showLanding} /> : null}

            {!showLanding && (
                <ToastProvider
                    offset={80}
                    duration={3000}
                    renderType={{
                        custom: (toast) => (
                            <View
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    backgroundColor: `${color.black}80`,
                                    borderRadius: 100,
                                }}
                            >
                                <Text style={{ color: 'white' }}>{toast.message}</Text>
                            </View>
                        ),
                    }}
                >
                    <QueryClientProvider client={queryClient}>
                        <UserContext.Provider value={{ user, dispatchUser }}>
                            <NavigationContainer>
                                {user['loggedIn'] && user['loggedIn'] !== undefined ? (
                                    <MainNav />
                                ) : (
                                    <Auth />
                                )}
                            </NavigationContainer>
                        </UserContext.Provider>
                    </QueryClientProvider>
                </ToastProvider>
            )}

            {Platform.OS === 'android' ? <LandingScreen show={showLanding} /> : null}
        </>
    );
}

export default App;
