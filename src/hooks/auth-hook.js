import { useMutation, useQuery } from 'react-query';
import { client, clientSite } from '../utils/api';

//Login User
const loginUser = (uData) => {
    return clientSite.post('/wp-json/jwt-auth/v1/token', uData);
};

export const useLogin = ({ onSuccess, onError }) => {
    return useMutation(loginUser, {
        onSuccess,
        onError,
    });
};

//Register User
const registerUser = (uData) => {
    return client.post('/users/register', uData);
};

export const useRegister = ({ onSuccess, onError }) => {
    return useMutation(registerUser, {
        onSuccess,
        onError,
    });
};

// Engine Searching
export const engineSearching = (val) => {
    return client.get(`/search_posts?query=${val}`);
};

//Forgot Password
const forgotPassword = (uData) => {
    return client.post('/users/forgot_password', uData);
};

export const useForgotPassword = ({ onSuccess, onError }) => {
    return useMutation(forgotPassword, {
        onSuccess,
        onError,
    });
};

//Delete User
export const deleteUser = () => {
    return client.delete(`/users/delete`);
};

export const useDelete = ({ onSuccess, onError }) => {
    return useMutation(deleteUser, {
        onSuccess,
        onError,
    });
};

//OTP Verification
const otpVerification = (uData) => {
    return client.post('/api/otp-verification', uData);
};

export const useOtpVerification = ({ onSuccess, onError }) => {
    return useMutation(otpVerification, {
        onSuccess,
        onError,
    });
};

//Resend OTP Code
const resendOTP = (uData) => {
    return client.post('/api/otp-resend', uData);
};

export const useResendOTP = ({ onSuccess, onError }) => {
    return useMutation(resendOTP, {
        onSuccess,
        onError,
    });
};

//Reset Password
const resetPassword = (uData) => {
    return client.post('/api/reset-password', uData);
};

export const useResetPassword = ({ onSuccess, onError }) => {
    return useMutation(resetPassword, {
        onSuccess,
        onError,
    });
};
