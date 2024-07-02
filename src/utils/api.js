import { create } from 'apisauce';

export const siteUrl = 'https://virtualcommercepk.com/mineengineApp';
export const baseUrl = 'https://virtualcommercepk.com/mineengineApp/wp-json/wp/v2';

export const clientSite = create({
    baseURL: siteUrl,
    timeout: 10000,
    headers: {
        Accept: 'application/json',
    },
});

export const client = create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        Accept: 'application/json',
    },
});

export const setAuthToken = (authToken) => {
    if (authToken) {
        client.setHeader('Authorization', 'Bearer ' + authToken);
    } else {
        delete client.auth;
    }
};
