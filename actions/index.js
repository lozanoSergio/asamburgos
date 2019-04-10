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


export const createUserProfile = async (userProfileData) => {
    return axiosInstance.post('/userProfiles', userProfileData)
    .then(response => response.data)
    .catch(error => rejectPromise(error))
}

export const getUserProfiles = async(req) => {
    return await axiosInstance.get('/userProfiles').then(response => response.data);
}

export const getUserProfileById = async (id) => {
    return await axiosInstance.get(`/userProfiles/${id}`).then(response => response.data);
}
