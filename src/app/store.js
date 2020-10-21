import { configureStore } from '@reduxjs/toolkit';
import billReducer from '../slice/billSlice';
import userReducer from '../slice/userSlice';

export default configureStore({
    reducer: {
        Users: userReducer,
        Bills: billReducer,
    },
});
