import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color, sizes } from '../../config/theme';
import CommonButton from '../../components/button/button';
import { Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/user-context';
import { setUserToken } from '../../utils/token-manager';

const AuthLanding = () => {
    const { user, dispatchUser } = useContext(UserContext);

    const navigation = useNavigation();

    const handleGuest = () => {
        const data = {
            firstName: 'Guest',
            username: 'guest@email.com',
            email: 'guest@email.com',
            password: 'Password12#',
        };
        setUserToken(data);
        dispatchUser({
            type: 'SET_USER',
            user: {
                ...data,
                loggedIn: true,
            },
        });
    };

    return (
        <>
            <LogoWrap>
                <LogoImage source={require('../../assets/images/app-icon.png')} />
            </LogoWrap>
            <Wrapper>
                <WelcomeWrap>
                    <WelcomeText>Welcome to the</WelcomeText>
                    <WelcomeText>
                        <WelcomeTextBold>YD</WelcomeTextBold> Engine App
                    </WelcomeText>
                </WelcomeWrap>

                <ButtonWrap>
                    <NormalText>New to the YD Engine App?</NormalText>
                    <CommonButton
                        bgColor={color.white}
                        textColor={color.black}
                        onPress={() => navigation.navigate('Register')}
                    >
                        Create an account
                    </CommonButton>
                </ButtonWrap>
                <ButtonWrap>
                    <NormalText>Already have an account?</NormalText>
                    <CommonButton
                        bgColor={color.white}
                        textColor={color.black}
                        onPress={() => navigation.navigate('Login')}
                    >
                        Login
                    </CommonButton>
                </ButtonWrap>

                <Divider />

                <CommonButton borderColor={color.white} onPress={handleGuest}>
                    Login as guest
                </CommonButton>
            </Wrapper>
        </>
    );
};

const LogoWrap = styled.View`
    background-color: ${color.primary};
    padding-top: ${Platform.OS === 'android'
        ? `${StatusBar.currentHeight + wp('5%')}px`
        : `${wp('5%')}px`};
`;

const LogoImage = styled.Image`
    margin-left: auto;
    margin-right: auto;
    width: 43px;
    height: 32px;
    resize-mode: contain;
`;

const Wrapper = styled.View`
    background-color: ${color.screenBg};
    flex: 1 0;
    padding-top: ${wp('20%')}px;
    padding-horizontal: ${wp('10%')}px;
`;

const WelcomeWrap = styled.View`
    margin-bottom: ${wp('8%')}px;
`;

const WelcomeText = styled.Text`
    font-size: ${sizes.size22}px;
    color: ${color.white};
`;

const NormalText = styled.Text`
    font-size: ${sizes.size20}px;
    color: ${color.white};
    padding-bottom: ${wp('2%')}px;
`;

const WelcomeTextBold = styled(WelcomeText)`
    font-weight: bold;
`;

const ButtonWrap = styled.View`
    margin-top: ${wp('10%')}px;
`;

const Divider = styled.View`
    height: 2px;
    background-color: ${color.white};
    width: 100%;
    margin-vertical: ${wp('10%')}px;
`;

export default AuthLanding;
