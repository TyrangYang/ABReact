import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import eventReducer from '../slice/eventSlice';

export default configureStore({
    reducer: {
        User: userReducer,
        Event: eventReducer,
    },
});
