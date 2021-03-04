import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'eventSlice',
    initialState: {
        currentEventID: '603f4efb3ca7197a0bacfe6e',
        loading: false,
    },

    reducers: {},
});

export const {} = eventSlice.actions;

export default eventSlice.reducer;
