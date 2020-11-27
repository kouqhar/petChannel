import {
  ADD_CHANNEL,
  GET_CHANNELS,
  GET_CHANNEL,
  DELETE_CHANNEL,
  CHANNEL_LOADING,
} from "../actions/types";

const initialState = {
  channels: [],
  channel: {},
  loading: false,
};
const ChannelRed = (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CHANNELS:
      return {
        ...state,
        channels: action.payload,
        loading: false,
      };
    case GET_CHANNEL:
      return {
        ...state,
        channel: action.payload,
        loading: false,
      };
    case ADD_CHANNEL:
      return {
        ...state,
        channels: [action.payload, ...state.channels],
      };
    case DELETE_CHANNEL:
      return {
        ...state,
        channels: state.channels.filter(
          (channel) => channel._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default ChannelRed;
