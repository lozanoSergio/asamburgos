import axios from "axios";
import Cookies from "js-cookie";
import { getCookieFromReq } from "../helpers/utils";

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/v1`,
  timeout: 3000
});

const setAuthHeader = req => {
  const token = req ? getCookieFromReq(req, "jwt") : Cookies.getJSON("jwt");

  if (token) {
    return { headers: { authorization: `Bearer ${token}` } };
  }
  return undefined;
};

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
    .post("/userProfiles", userProfileData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const getUserProfiles = async req => {
  return await axiosInstance
    .get("/userProfiles", setAuthHeader(req))
    .then(response => response.data);
};

export const getUserProfileById = async (req, id) => {
  return await axiosInstance
    .get(`/userProfiles/${id}`, setAuthHeader(req))
    .then(response => response.data);
};

export const updateProfile = async userProfileData => {
  return await axiosInstance
    .patch(
      `/userProfiles/${userProfileData._id}`,
      userProfileData,
      setAuthHeader()
    )
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const updateFee = async (userProfileData, feeData) => {
  return await axiosInstance
    .patch(`/userProfiles/fee/${userProfileData._id}`, feeData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const updateUserActivitiesAndServices = async (
  userProfileData,
  data
) => {
  return await axiosInstance
    .patch(
      `/userProfiles/userActivitiesAndServicies/${userProfileData._id}`,
      data,
      setAuthHeader()
    )
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const deleteUserProfile = async userProfileId => {
  return axiosInstance
    .delete(`/userProfiles/${userProfileId}`, setAuthHeader())
    .then(response => response.data);
};

//activities

export const createActivity = async activityData => {
  return axiosInstance
    .post("/activity", activityData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const getActivities = async req => {
  return await axiosInstance
    .get("/activity", setAuthHeader(req))
    .then(response => response.data);
};

export const getActivityById = async (req, id) => {
  return await axiosInstance
    .get(`/activity/${id}`, setAuthHeader(req))
    .then(response => response.data);
};

export const getUsersInActivity = async (req, id) => {
  return await axiosInstance
    .get(`/activity/users/${id}`, setAuthHeader(req))
    .then(response => response.data);
}

export const updateActivity = async activityData => {
  return await axiosInstance
    .patch(`/activity/${activityData._id}`, activityData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const deleteActivity = async activityId => {
  return axiosInstance
    .delete(`/activity/${activityId}`, setAuthHeader())
    .then(response => response.data);
};

//services

export const createService = async serviceData => {
  return axiosInstance
    .post("/service", serviceData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const getServices = async req => {
  return await axiosInstance
    .get("/service", setAuthHeader(req))
    .then(response => response.data);
};

export const getServiceById = async (req, id) => {
  return await axiosInstance
    .get(`/service/${id}`, setAuthHeader(req))
    .then(response => response.data);
};

export const getUsersInService = async (req, id) => {
  return await axiosInstance
    .get(`/service/users/${id}`, setAuthHeader(req))
    .then(response => response.data);
}

export const updateService = async serviceData => {
  return await axiosInstance
    .patch(`/service/${serviceData._id}`, serviceData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const deleteService = async serviceId => {
  return axiosInstance
    .delete(`/service/${serviceId}`, setAuthHeader())
    .then(response => response.data);
};
