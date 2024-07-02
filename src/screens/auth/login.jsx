import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AuthLayout from '../../layouts/auth';
import styled from 'styled-components/native';
import { ErrorText, color, sizes } from '../../config/theme';
import Input from '../../components/input/input';
import CommonButton from '../../components/button/button';
import { setUserToken } from '../../utils/token-manager';
import { UserContext } from '../../context/user-context';
import { setAuthToken } from '../../utils/api';
import { useLogin } from '../../hooks/auth-hook';
import { useNavigation } from '@react-navigation/native';

const loginSchema = yup.object({
    username: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
});

const LoginScreen = () => {
    const { user, dispatchUser } = useContext(UserContext);

    const [loginErr, setLoginErr] = useState(null);

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            handleLogin(values);
        },
    });

    const { mutate: handleLogin, isLoading } = useLogin({
        onSuccess: (res) => {
            if (res.status == '200') {
                setLoginErr('');
                const data = {
                    token: res.data.token,
                    name: res.data.user_display_name,
                    email: res.data.user_email,
                };
                setUserToken(data);
                setAuthToken(res.data.token);
                dispatchUser({
                    type: 'SET_USER',
                    user: {
                        ...data,
                        loggedIn: true,
                    },
                });
            } else {
                setLoginErr(res.data.message);
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <AuthLayout>
            <AuthHeadText>Login</AuthHeadText>

            <FormLayout>
                <Input
                    label="Email address"
                    placeholder="Email address"
                    value={formik.values.username}
                    onValueChange={formik.handleChange('username')}
                    onblurInput={formik.handleBlur('username')}
                />
                {formik.touched.username && formik.errors.username && (
                    <ErrorText>{formik.errors.username}</ErrorText>
                )}

                <Input
                    label="Password"
                    placeholder="Password"
                    value={formik.values.password}
                    onValueChange={formik.handleChange('password')}
                    onblurInput={formik.handleBlur('password')}
                    password
                />
                {formik.touched.password && formik.errors.password && (
                    <ErrorText>{formik.errors.password}</ErrorText>
                )}
                {loginErr && <ErrorText>{loginErr}</ErrorText>}

                <ForgotLinkWrap>
                    <ForgotLink
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <ForgotText>Forgot Password?</ForgotText>
                    </ForgotLink>
                </ForgotLinkWrap>
            </FormLayout>

            <CommonButton onPress={formik.handleSubmit} loading={isLoading}>
                Login
            </CommonButton>
        </AuthLayout>
    );
};

export const AuthHeadText = styled.Text`
    font-size: ${sizes.size22}px;
    font-weight: 500;
    color: ${color.black};
`;

export const FormLayout = styled.View`
    flex-grow: 1;
    justify-content: center;
    padding-bottom: ${wp('8%')}px;
`;

const ForgotLinkWrap = styled.View`
    align-items: flex-end;
`;

const ForgotLink = styled.TouchableOpacity`
    padding-vertical: ${wp('2%')}px;
`;

const ForgotText = styled.Text`
    font-size: ${sizes.size18}px;
    font-weight: 400;
    color: ${color.primary};
`;

export default LoginScreen;
