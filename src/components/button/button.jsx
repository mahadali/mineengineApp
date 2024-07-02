import React from 'react';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color, sizes } from '../../config/theme';
import { ActivityIndicator } from 'react-native';

const CommonButton = ({ children, bgColor, textColor, borderColor, onPress, loading }) => {
    return (
        <Wrapper activeOpacity={0.7} bgColor={bgColor} borderColor={borderColor} onPress={onPress}>
            <BtnText textColor={textColor}>
                {loading ? <ActivityIndicator color={color.white} size={sizes.size20} /> : children}
            </BtnText>
        </Wrapper>
    );
};

const Wrapper = styled.TouchableOpacity`
    background-color: ${(props) => (props.bgColor ? props.bgColor : color.primary)};
    padding: ${wp('3.5%')}px ${wp('10%')}px ${wp('3.8%')}px;
    border-radius: ${wp('3%')}px;
    border-width: 2px;
    border-color: ${(props) => (props.borderColor ? props.borderColor : color.primary)};
    width: 100%;
`;

const BtnText = styled.Text`
    font-size: ${sizes.size18}px;
    font-weight: 500;
    text-align: center;
    color: ${(props) => (props.textColor ? props.textColor : color.white)};
`;

export default CommonButton;
