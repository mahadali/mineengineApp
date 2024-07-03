import React, { useContext, useEffect, useState } from 'react';
import {
    Keyboard,
    Platform,
    ScrollView,
    StatusBar,
    Animated,
    ActivityIndicator,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { color, sizes } from '../config/theme';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/user-context';
import { deleteUserToken } from '../utils/token-manager';
import { deleteUser } from '../hooks/auth-hook';

const AuthLayout = ({ children, noPadding, noBackBtn, alignTop, logOutBtn }) => {
    const { user, dispatchUser } = useContext(UserContext);

    const navigation = useNavigation();

    const [isLoading, setLoading] = useState(false);
    const [paddHeight, setPaddHeight] = useState(new Animated.Value(0));

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            Animated.timing(paddHeight, {
                toValue: 300,
                duration: 300,
                useNativeDriver: false,
            }).start();
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(paddHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await deleteUser();
            if (response.status == 200) {
                dispatchUser({
                    type: 'SET_USER',
                    user: {
                        loggedIn: false,
                    },
                });
                deleteUserToken();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <AuthHeader>
                {!noBackBtn && (
                    <BackBtnWrap activeOpacity={0.8} onPress={() => navigation.goBack()}>
                        <BackBtnImage source={require('../assets/images/arrow-left.png')} />
                        <BackBtnText>Back</BackBtnText>
                    </BackBtnWrap>
                )}
                {logOutBtn && (
                    <BackBtnWrap activeOpacity={0.8} disabled>
                        <BackBtnText />
                    </BackBtnWrap>
                )}
                <LogoImage source={require('../assets/images/app-icon.png')} />
                {!noBackBtn && (
                    <BackBtnWrap activeOpacity={0.8} onPress={() => navigation.goBack()} disabled>
                        <BackBtnText />
                    </BackBtnWrap>
                )}
                {logOutBtn && (
                    <BackBtnWrap activeOpacity={0.8} onPress={handleLogout}>
                        <BackBtnText>
                            {isLoading ? (
                                <ActivityIndicator size="small" color={color.white} />
                            ) : (
                                'Log Out'
                            )}
                        </BackBtnText>
                    </BackBtnWrap>
                )}
            </AuthHeader>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: alignTop ? 'flex-start' : 'center',
                    paddingVertical: noPadding ? 0 : wp('5%'),
                    paddingHorizontal: noPadding ? 0 : wp('7.5%'),
                    position: 'relative',
                }}
            >
                {Platform.OS === 'android' ? (
                    children
                ) : (
                    <Animated.View style={{ flex: 1, paddingBottom: paddHeight }}>
                        {children}
                    </Animated.View>
                )}
            </ScrollView>
        </Wrapper>
    );
};

const AuthHeader = styled.SafeAreaView`
    padding-top: ${Platform.OS === 'android'
        ? `${StatusBar.currentHeight + wp('5%')}px`
        : `${wp('5%')}px`};
    padding-bottom: ${wp('3%')}px;
    background-color: ${color.screenBg};
    padding-horizontal: ${wp('6%')}px;
    flex-direction: row;
    align-items: center;
`;

const LogoImage = styled.Image`
    margin-left: auto;
    margin-right: auto;
    width: ${wp('13%')}px;
    height: ${wp('8%')}px;
    resize-mode: contain;
`;

const Wrapper = styled.View`
    flex: 1 0;
    background-color: ${color.white};
    position: relative;
`;

const BackBtnWrap = styled.TouchableOpacity`
    width: ${wp('15%')}px;
    padding-vertical: ${wp('2%')}px;
    gap: ${wp('1%')}px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const BackBtnImage = styled.Image`
    width: ${wp('4%')}px;
    height: ${wp('7%')}px;
    resize-mode: contain;
`;

const BackBtnText = styled.Text`
    font-size: ${sizes.size18}px;
    color: ${color.white};
    font-weight: 700;
`;

export default AuthLayout;
