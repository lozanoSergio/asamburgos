import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 3000
})

const rejectPromise = (resError) => {
    let error = {};

    if (resError && resError.response && resError.response.data) {
        error = resError.response.data;
    } else {
        error = resError;
    }

    return Promise.reject(error);
}


export const createPortfolio = async (userProfileData) => {
    return axiosInstance.post('/userProfiles', userProfileData)
    .then(response => response.data)
    .catch(error => rejectPromise(error))
}