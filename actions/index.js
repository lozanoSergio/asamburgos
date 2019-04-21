import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 3000
});

const rejectPromise = resError => {
  let error = {};

  if (resError && resError.response && resError.response.data) {
    error = resError.response.data;
  } else {
    error = resError;
  }

  return Promise.reject(error);
};

//user profiles

export const createUserProfile = async userProfileData => {
  return axiosInstance
    .post("/userProfiles", userProfileData)
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const getUserProfiles = async req => {
  return await axiosInstance
    .get("/userProfiles")
    .then(response => response.data);
};

export const getUserProfileById = async id => {
  return await axiosInstance
    .get(`/userProfiles/${id}`)
    .then(response => response.data);
};

export const updateProfile = async userProfileData => {
  return await axiosInstance
    .patch(`/userProfiles/${userProfileData._id}`, userProfileData)
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const updateFee = async (userProfileData, feeData) => {
  return await axiosInstance
    .patch(`/userProfiles/fee/${userProfileData._id}`, feeData)
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const updateUserActivitiesAndServices = async (userProfileData, data) => {
  return await axiosInstance
    .patch(`/userProfiles/userActivitiesAndServicies/${userProfileData._id}`, data)
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

//activities

export const createActivity = async activityData => {
  return axiosInstance
    .post("/activity", activityData)
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const getActivities = async req => {
  return await axiosInstance.get("/activity").then(response => response.data);
};

export const getActivityById = async id => {
  return await axiosInstance
    .get(`/activity/${id}`)
    .then(response => response.data);
};

export const updateActivity = async activityData => {
  return await axiosInstance
    .patch(`/activity/${activityData._id}`, activityData)
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

//services

export const createService = async serviceData => {
    return axiosInstance
      .post("/service", serviceData)
      .then(response => response.data)
      .catch(error => rejectPromise(error));
  };
  
  export const getServices = async req => {
    return await axiosInstance.get("/service").then(response => response.data);
  };
  
  export const getServiceById = async id => {
    return await axiosInstance
      .get(`/service/${id}`)
      .then(response => response.data);
  };
  
  export const updateService = async serviceData => {
    return await axiosInstance
      .patch(`/service/${serviceData._id}`, serviceData)
      .then(response => response.data)
      .catch(error => rejectPromise(error));
  };