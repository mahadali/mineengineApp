import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'react-native';
import { color, sizes } from '../../config/theme';

const LandingScreen = ({ show }) => {
    const [open, setOpen] = useState(true);
    const [remove, setRemove] = useState(true);

    useEffect(() => {
        setOpen(show);

        if (!show) {
            setTimeout(() => {
                setRemove(false);
            }, 750);
        }

        return () => setOpen(show);
    }, [show]);

    return remove ? (
        <Animatable.View
            animation={open ? 'fadeIn' : 'fadeOut'}
            easing="ease-out"
            duration={500}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: wp('100%'),
                height: hp('100%') + StatusBar.currentHeight,
                zIndex: 999,
                flex: 1,
            }}
        >
            <Wrapper>
                <Animatable.View animation="fadeIn" easing="ease-out" duration={800} delay={1500}>
                    <LogoImage source={require('../../assets/images/logo.png')} />

                    <WelcomeText>Welcome to the</WelcomeText>
                    <WelcomeText>
                        <WelcomeTextBold>YD</WelcomeTextBold> Engine App
                    </WelcomeText>
                </Animatable.View>
            </Wrapper>
        </Animatable.View>
    ) : null;
};

const Wrapper = styled.View`
    width: 100%;
    flex: 1 0;
    justify-content: center;
    background-color: ${color.screenBg};
`;
const LogoImage = styled.Image`
    margin-left: auto;
    margin-right: auto;
    width: ${wp('70%')}px;
    height: ${wp('35%')}px;
    resize-mode: contain;
`;
const WelcomeText = styled.Text`
    font-size: ${sizes.size22}px;
    text-align: center;
    color: ${color.white};
`;

const WelcomeTextBold = styled(WelcomeText)`
    font-weight: bold;
`;

export default LandingScreen;
