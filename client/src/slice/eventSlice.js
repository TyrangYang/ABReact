import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'eventSlice',
    initialState: {
        currentEventID: '603f4efb3ca7197a0bacfe6e',
        loading: false,
    },

    reducers: {
        setEventID: (state, action) => {
            return {
                ...state,
                currentEventID: action.payload.id,
            };
        },
    },
});

export const { setEventID } = eventSlice.actions;

export default eventSlice.reducer;
