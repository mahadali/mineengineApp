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
import { useForgotPassword } from '../../hooks/auth-hook';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';

const forgotSchema = yup.object({
    email: yup.string().email().required('Email is required'),
});

const ForgotPassword = () => {
    const { user, dispatchUser } = useContext(UserContext);

    const [loginErr, setLoginErr] = useState(null);

    const navigation = useNavigation();
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: forgotSchema,
        onSubmit: (values) => {
            handleForgot(values);
        },
    });

    const { mutate: handleForgot, isLoading } = useForgotPassword({
        onSuccess: (res) => {
            if (res.status == '200') {
                setLoginErr('');
                toast.show(res.data, {
                    type: 'custom',
                });
                navigation.navigate('Login');
                formik.resetForm();
            } else {
                setLoginErr(res.data);
            }
        },
        onError: (error) => {
            console.log('Error =>', error);
        },
    });

    return (
        <AuthLayout>
            <AuthHeadText>Forgot Password</AuthHeadText>

            <FormLayout>
                <Input
                    label="Email address"
                    placeholder="Email address"
                    value={formik.values.email}
                    onValueChange={formik.handleChange('email')}
                    onblurInput={formik.handleBlur('email')}
                />
                {formik.touched.email && formik.errors.email && (
                    <ErrorText>{formik.errors.email}</ErrorText>
                )}
                {loginErr && <ErrorText>{loginErr}</ErrorText>}
            </FormLayout>

            <CommonButton onPress={formik.handleSubmit} loading={isLoading}>
                Submit
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

export default ForgotPassword;
