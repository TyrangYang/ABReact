import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllUsers = createAsyncThunk(
    'userSlice/fetchAllUsers',
    async (_, thunkAPI) => {
        let response = [
            { id: 'userId1', name: 'TEST_NAME1' },
            { id: 'userId2', name: 'TEST_NAME2' },
            { id: 'userId3', name: 'TEST_NAME3' },
            { id: 'userId4', name: 'TEST_NAME4' },
            { id: 'userId5', name: 'TEST_NAME5' },
            { id: 'userId6', name: 'TEST_NAME6' },
        ];
        return response;
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        allUsers: [],
        loading: false,
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
    extraReducers: {
        [fetchAllUsers.pending]: (state, action) => {
            console.log('pending', action.type);
        },
        [fetchAllUsers.rejected]: (state, action) => {
            console.log('rejected', action.type);
        },
        [fetchAllUsers.fulfilled]: (state, action) => {
            console.log('fulfilled');
            state.allUsers.push(...action.payload);
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
