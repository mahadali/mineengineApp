import React from 'react';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color, fonts, sizes } from '../../config/theme';

const Input = ({
    label,
    value,
    onValueChange,
    keyboardType,
    onblurInput,
    password,
    multiline,
    numberofLines = 5,
    maxLength,
    disabled,
}) => {
    return (
        <Wrapper>
            {label !== undefined && <LabelInput>{label}</LabelInput>}
            <InputWrap>
                <InputField
                    placeholder=""
                    placeholderTextColor={color.white}
                    value={value}
                    onChangeText={onValueChange}
                    keyboardType={keyboardType}
                    onblurInput={onblurInput}
                    secureTextEntry={password}
                    multiline={multiline}
                    numberofLines={multiline ? numberofLines : 1}
                    maxLength={maxLength}
                    editable={!disabled}
                    selectTextOnFocus
                />
            </InputWrap>
        </Wrapper>
    );
};

const Wrapper = styled.View`
    margin-top: ${wp('5%')}px;
`;

const LabelInput = styled.Text`
    color: ${color.black};
    font-size: ${sizes.size16}px;
    margin-bottom: ${wp('1.5%')}px;
`;

const InputWrap = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${color.white};
    border-width: 1px;
    border-color: ${color.black}40;
    border-radius: ${wp('2.2%')}px;
`;

const InputField = styled.TextInput`
    height: ${(props) => (props.multiline ? wp('30%') : wp('11%'))}px;
    padding-left: ${wp('4%')}px;
    font-size: ${sizes.size16}px;
    color: ${color.black};
    flex: 1 0;
    text-align-vertical: ${(props) => (props.multiline ? 'top' : 'center')};
`;

export default Input;
