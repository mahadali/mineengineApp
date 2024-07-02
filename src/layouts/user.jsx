import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

import Header from '../components/header/header';
import InnerPageHeader from '../components/header/inner-page';
import { color } from '../config/theme';
import { SafeAreaView, View, Animated, Platform, Keyboard } from 'react-native';

const UserLayout = ({
    children,
    header2,
    title,
    noSidePadding,
    noShade,
    bottomEl,
    refreshControl,
    noScrollView = false,
}) => {
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

    return (
        <Wrapper>
            {!noShade && <ShadeImg source={require('../assets/images/auth-shade.png')} />}
            <InnerWrapper>
                <SafeAreaView style={{ flexGrow: 1 }}>
                    {header2 ? <InnerPageHeader title={title || ''} /> : <Header title={title} />}
                    {noScrollView ? (
                        <View style={{ flex: 1 }}>{children}</View>
                    ) : (
                        <MainContent
                            nestedScrollEnabled={true}
                            keyboardShouldPersistTaps="always"
                            listViewDisplayed={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                            noSidePadding={noSidePadding}
                            refreshControl={refreshControl}
                        >
                            <Animated.View style={{ flex: 1, paddingBottom: paddHeight }}>
                                {children}
                            </Animated.View>
                        </MainContent>
                    )}
                    {bottomEl && <LayoutBottom>{bottomEl}</LayoutBottom>}
                </SafeAreaView>
            </InnerWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.View`
    background-color: ${color.screenBg};
    flex: 1;
    position: relative;
`;

const InnerWrapper = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    flex: 1;
`;

const ShadeImg = styled.Image`
    width: ${wp('80%')}px;
    height: ${wp('80%')}px;
    resize-mode: cover;
`;

const MainContent = styled.ScrollView`
    flex: 1;
    margin-top: ${wp('7%')}px;
    margin-bottom: ${wp('5%')}px;
    padding: ${(props) => (props.noSidePadding ? 0 : `0 ${wp('7.5%')}`)}px;
`;

const LayoutBottom = styled.View`
    padding: ${wp('5%')}px;
    padding-top: 0px;
`;

export const LayoutBottomBtnWrap = styled.View`
    flex-direction: row;
    flex-grow: 1;
    gap: ${wp('5%')}px;
`;

export default UserLayout;
