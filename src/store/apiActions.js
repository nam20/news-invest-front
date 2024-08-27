import { API_REQUEST, API_REQUEST_FAILURE, API_REQUEST_SUCCESS } from './actionTypes';
import axios from 'axios';

export const apiRequest = (resource) => ({
    type: API_REQUEST,
    resource,
});

export const apiRequestSuccess = (resource, data) => ({
    type: API_REQUEST_SUCCESS,
    resource,
    data,
});

export const apiRequestFailure = (resource, error) => ({
    type: API_REQUEST_FAILURE,
    resource,
    error,
});

export const fetchResource =
  (resource, { url, method, params = {}, data = null, headers = {} }) => {

  return async (dispatch) => {
    dispatch(apiRequest(resource));

    try {
      const response = await axios({ url, method, params, data, headers });
      dispatch(apiRequestSuccess(resource, response.data));
    } catch (error) {
      dispatch(apiRequestFailure(resource, error.message));
    }
  }
}