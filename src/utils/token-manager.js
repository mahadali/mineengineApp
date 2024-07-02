import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTH_TOKEN = '@authToken';

// Set User Token in Async Storage
export const setUserToken = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(AUTH_TOKEN, jsonValue);
    } catch (e) {
        console.log(e);
    }
};

// Get User Token from Async Storage
export const getUserToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(AUTH_TOKEN);
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
};

//Delete User Token from Async Storage
export const deleteUserToken = async () => {
    try {
        await AsyncStorage.removeItem(AUTH_TOKEN);
    } catch (e) {
        console.log(e);
    }
};
