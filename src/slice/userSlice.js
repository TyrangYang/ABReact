import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        allUsers: [
            { id: 'userId1', name: 'TEST_NAME1' },
            { id: 'userId2', name: 'TEST_NAME2' },
            { id: 'userId3', name: 'TEST_NAME3' },
            { id: 'userId4', name: 'TEST_NAME4' },
            { id: 'userId5', name: 'TEST_NAME5' },
            { id: 'userId6', name: 'TEST_NAME6' },
        ],
    },

    reducers: {
        addUser: (state, action) => {
            return {
                ...state,
                allUsers: [...state.allUsers, action.payload],
            };
        },
        removeUser: (state, action) => {
            return {
                ...state,
                allUsers: state.allUsers.filter((e) => e.id !== action.payload),
            };
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
