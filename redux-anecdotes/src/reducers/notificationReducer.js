import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: '',
  activeTimeout: 0
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      const { message, timerId } = action.payload;
      const { activeTimeout } = state;
      if(activeTimeout) clearTimeout(activeTimeout);
      return {
        message: message,
        activeTimeout: timerId
      };
    },
    clearMessage(state) {
      return initialState;
    }
  }
});

export const { setMessage, clearMessage } = notificationSlice.actions;

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(
      setMessage({
        message: message,
        timerId: setTimeout(() => dispatch(clearMessage()), timeout*1000)
      })
    );
  };
};

export default notificationSlice.reducer;
