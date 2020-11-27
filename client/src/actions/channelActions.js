import axios from "axios";
import {
  ADD_CHANNEL,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_CHANNELS,
  GET_CHANNEL,
  CHANNEL_LOADING,
} from "./types";

// Add Channel
export const joinChannel = (id, channelData) => (dispatch) => {
  dispatch(clearErrors());

  axios
    .post(`/api/user/channel/join/${id}`, channelData)
    .then((res) =>
      dispatch({
        type: ADD_CHANNEL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get my Channels
export const getMyChannels = () => (dispatch) => {
  dispatch(setChannelLoading());

  axios
    .get("/api/user/channel/my-channels")
    .then((res) =>
      dispatch({
        type: GET_CHANNEL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_CHANNEL,
        payload: null,
      })
    );
};

// Get Channels
export const getChannels = () => (dispatch) => {
  dispatch(setChannelLoading());

  axios
    .get("/api/user/channel/channels")
    .then((res) =>
      dispatch({
        type: GET_CHANNELS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_CHANNELS,
        payload: null,
      })
    );
};

// Set loading state for posts
export const setChannelLoading = () => {
  return {
    type: CHANNEL_LOADING,
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
