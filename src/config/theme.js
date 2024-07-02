import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

// C O L O R S
export const color = {
    primary: '#000000',
    black: '#000000',
    white: '#ffffff',
    grey: '#999999',
    success: '#42ba96',
    danger: '#E42B2B',
    warning: '#FF7207',
    green: '#1CC800',
    screenBg: '#000000',
};

// F O N T S
export const fonts = {
    CreataDisplay: 'CreatoDisplay-Regular',
    CreataDisplayMedium: 'CreatoDisplay-Medium',
    InterMedium: 'Inter-Medium',
};

// F O N T S  S I Z E S
export const sizes = {
    size8: wp('2%'),
    size10: wp('2.3%'),
    size12: wp('2.8%'),
    size14: wp('3.2%'),
    size16: wp('3.5%'),
    size18: wp('3.8%'),
    size20: wp('4.6%'),
    size22: wp('5.1%'),
    size24: wp('5.6%'),
    size26: wp('6.07%'),
    size28: wp('6.5%'),
    size30: wp('7%'),
    size40: wp('9.3%'),
    size50: wp('11.6%'),
    size64: wp('14.9%'),
};

// H E L P E R F U N C T I O N S
export const handleDigits = (numb) => {
    if (numb && numb !== undefined) {
        var str = numb.toString().split('.');
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return str.length > 0 ? str.join('.') : '0';
    }
};

export const handleInitials = (name) => {
    if (name !== undefined && name !== '') {
        return name
            ?.match(/\b(\w)/g)
            .join('')
            .substring(0, 2);
    }
};

// C U S T O M   S T Y L E S
export const ErrorText = styled.Text`
    font-size: ${wp('3%')}px;
    color: ${color.danger};
    margin-top: ${wp('1.5%')}px;
    ${(props) => props.alignRight && 'text-align: right'}
`;

export const EmptyRecordWrap = styled.View`
    flex: 1 0;
    justify-content: center;
    align-items: center;
`;

export const EmptyRecordText = styled.Text`
    color: ${color.white};
    font-size: ${wp('5%')}px;
    font-family: ${fonts.CreataDisplayMedium};
`;
