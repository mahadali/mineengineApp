import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthLayout from '../../layouts/auth';
import { ErrorText } from '../../config/theme';
import Input from '../../components/input/input';
import CommonButton from '../../components/button/button';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { AuthHeadText, FormLayout } from './login';
import { useRegister } from '../../hooks/auth-hook';

const signupSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup
        .string()
        .email('Please enter in proper format')
        .matches(
            /^[a-zA-Z0-9@_.-]*$/,
            'Sorry, only letters (a-z), number (0-9), and periods (.) are allowed'
        )
        .required('Email address is required'),
    phone_number: yup
        .string()
        .required('Phone Number is required')
        .min(10, 'Phone number is invalid'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'The password must be between 8 to 16 characters.')
        .max(16, 'The password must be between 8 to 16 characters.')
        .matches(
            /[A-Z][a-z]/,
            'The password must contain at least one uppercase and one lowercase letter.'
        )
        .matches(/[0-9]/, 'The password must contain at least one number.'),
    confirm_password: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'The passwords do not match'),
    country: yup.string().required('Country is required'),
    postal_code: yup.string().required('Postal Address is required'),
});

const RegisterScreen = () => {
    const [loginErr, setLoginErr] = useState(null);

    const navigation = useNavigation();
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone_number: '',
            password: '',
            confirm_password: '',
            country: '',
            postal_code: '',
        },
        validationSchema: signupSchema,
        onSubmit: (values) => {
            const data = {
                username: values.email,
                ...values,
            };
            Register(data);
        },
    });

    const { mutate: Register, isLoading } = useRegister({
        onSuccess: (res) => {
            if (res.status == '200') {
                toast.show('Account Created Successfully', {
                    type: 'custom',
                });
                navigation.navigate('Login');
                formik.resetForm();
            } else {
                setLoginErr(res.data.message);
            }
        },
        onError: (err) => {
            console.log('Error', err);
        },
    });

    return (
        <AuthLayout>
            <AuthHeadText>Create an account</AuthHeadText>

            <FormLayout>
                <Input
                    label="Name"
                    placeholder="Name"
                    value={formik.values.name}
                    onValueChange={formik.handleChange('name')}
                    onblurInput={formik.handleBlur('name')}
                />
                {formik.touched.name && formik.errors.name && (
                    <ErrorText>{formik.errors.name}</ErrorText>
                )}

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

                <Input
                    label="Phone Number"
                    value={formik.values.phone_number}
                    onValueChange={(val) =>
                        formik.setFieldValue('phone_number', val.replace(/[^0-9]/g, ''))
                    }
                    onblurInput={formik.handleBlur('phone_number')}
                    keyboardType={'phone-pad'}
                    maxLength={13}
                />
                {formik.touched.phone_number && formik.errors.phone_number && (
                    <ErrorText>{formik.errors.phone_number}</ErrorText>
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

                <Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    value={formik.values.confirm_password}
                    onValueChange={formik.handleChange('confirm_password')}
                    onblurInput={formik.handleBlur('confirm_password')}
                    password
                />
                {formik.touched.confirm_password && formik.errors.confirm_password && (
                    <ErrorText>{formik.errors.confirm_password}</ErrorText>
                )}

                <Input
                    label={'Country'}
                    placeholder="Country"
                    value={formik.values.country}
                    onValueChange={formik.handleChange('country')}
                    onblurInput={formik.handleBlur('country')}
                />
                {formik.touched.country && formik.errors.country && (
                    <ErrorText>{formik.errors.country}</ErrorText>
                )}

                <Input
                    label={'Zip Code'}
                    placeholder="Zip Code"
                    value={formik.values.postal_code}
                    onValueChange={formik.handleChange('postal_code')}
                    onblurInput={formik.handleBlur('postal_code')}
                    keyboardType={'phone-pad'}
                    maxLength={10}
                />
                {formik.touched.postal_code && formik.errors.postal_code && (
                    <ErrorText>{formik.errors.postal_code}</ErrorText>
                )}

                {loginErr && <ErrorText>{loginErr}</ErrorText>}
            </FormLayout>

            <CommonButton onPress={formik.handleSubmit} loading={isLoading}>
                Create account
            </CommonButton>
        </AuthLayout>
    );
};

export default RegisterScreen;
