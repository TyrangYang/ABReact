import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        currentUserID: '603f4a07d9e3f179763a5dc2',
        auth: true,
        loading: false,
    },

    reducers: {
        userLogin: (state, action) => {
            return {
                ...state,
                currentUserID: action.payload.id,
            };
        },
    },
});

export const { userLogin } = userSlice.actions;

export default userSlice.reducer;
