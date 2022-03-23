import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import Alertslice  from "../features/alert/alertSlice";
import authSlice from '../features/auth/authSlice';
import profileSlice, { allProfile } from '../features/profile/profileSlice';
// import createProfileSlice from "../features/dashboard/me_profile/createProfile";
import postSlice from '../features/post/postSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    notifications : Alertslice.reducer,
    auth:authSlice,
    profile:profileSlice,
    post:postSlice,
    [allProfile.reducerPath]:allProfile.reducer
  },
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(allProfile.middleware),
});
