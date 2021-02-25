import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllBills = createAsyncThunk(
    'billSlice/fetchAllBills',
    async (_, thunkAPI) => {
        let response = [
            {
                id: 'bill1',
                payer: 'userId1',
                amount: { amount: 10000, currency: 'USD', precision: 2 },
                participants: ['userId1', 'userId2'],
                date: '2020-04-20',
                description: '',
            },
            {
                id: 'bill2',
                payer: 'userId2',
                amount: { amount: 40000, currency: 'USD', precision: 2 },
                participants: ['userId1', 'userId2', 'userId3'],
                date: '2020-01-01',
                description: '',
            },
            {
                id: 'bill3',
                payer: 'userId3',
                amount: { amount: 50030, currency: 'USD', precision: 2 },
                participants: ['userId3', 'userId2'],
                date: '2020-02-05',
                description: '',
            },
            {
                id: 'bill4',
                payer: 'userId4',
                amount: { amount: 20045, currency: 'USD', precision: 2 },
                participants: ['userId1', 'userId5'],
                date: '2020-02-09',
                description: '',
            },
            {
                id: 'bill5',
                payer: 'userId2',
                amount: { amount: 10072, currency: 'USD', precision: 2 },
                participants: ['userId5'],
                date: '2019-12-05',
                description: '',
            },
            {
                id: 'bill6',
                payer: 'userId3',
                amount: { amount: 7063, currency: 'USD', precision: 2 },
                participants: [
                    'userId1',
                    'userId2',
                    'userId3',
                    'userId4',
                    'userId5',
                ],
                date: '2019-12-05',
                description: '',
            },
        ];
        return response;
    }
);
const billSlice = createSlice({
    name: 'billSlice',
    initialState: {
        allBills: [],
        loading: false,
    },

    reducers: {
        addBill: (state, action) => {
            return {
                ...state,
                allBills: [action.payload, ...state.allBills],
            };
        },
        removeBill: (state, action) => {
            return {
                ...state,
                allBills: state.allBills.filter((e) => e.id !== action.payload),
            };
        },
        editBill: (state, action) => {
            // payload {billId, newData}
            return {
                ...state,
                allBills: state.allBills.map((e) => {
                    return e.id !== action.payload.billId
                        ? e
                        : action.payload.newData;
                }),
            };
        },
    },
    extraReducers: {
        [fetchAllBills.pending]: (state, action) => {
            console.log('pending', action.type);
        },
        [fetchAllBills.rejected]: (state, action) => {
            console.log('rejected', action.type);
        },
        [fetchAllBills.fulfilled]: (state, action) => {
            console.log('fulfilled');
            state.allBills.push(...action.payload);
        },
    },
});

export const { addBill, removeBill } = billSlice.actions;

export default billSlice.reducer;
