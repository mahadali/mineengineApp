import React, { createContext } from 'react';

const defaultContext = {
    user: {
        loggedIn: false,
        dispatch: null,
    },
};

const defaultContextImage = {
    image: {
        uri: '',
        openModal: false,
        onPictureUpload: false,
        onTakePicture: false,
    },
};

export const UserContext = createContext(defaultContext);
export const ImageContext = createContext(defaultContextImage);

export const userReducer = (state = defaultContext, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...action.user,
            };
        case 'CLEAR_USER':
            return defaultContext;
        default:
            return state;
    }
};

export const imageReducer = (state = defaultContextImage, action) => {
    switch (action.type) {
        case 'SET_IMAGE':
            return {
                ...action.image,
            };
        case 'CLEAR_IMAGE':
            return defaultContextImage;
        default:
            return state;
    }
};
