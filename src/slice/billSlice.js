import { createSlice } from '@reduxjs/toolkit';

const billSlice = createSlice({
    name: 'billSlice',
    initialState: {
        // allBills: [
        //     {
        //         id: 'bill1',
        //         payer: 'userId1',
        //         amount: { amount: 10000, currency: 'USD', precision: 2 },
        //         participants: ['userId1', 'userId2'],
        //         date: '2020-04-20',
        //     },
        //     {
        //         id: 'bill2',
        //         payer: 'userId2',
        //         amount: { amount: 40000, currency: 'USD', precision: 2 },
        //         participants: ['userId1', 'userId2', 'userId3'],
        //         date: '2020-01-01',
        //     },
        //     {
        //         id: 'bill3',
        //         payer: 'userId3',
        //         amount: { amount: 50030, currency: 'USD', precision: 2 },
        //         participants: ['userId3', 'userId2'],
        //         date: '2020-02-05',
        //     },
        //     {
        //         id: 'bill4',
        //         payer: 'userId4',
        //         amount: { amount: 20045, currency: 'USD', precision: 2 },
        //         participants: ['userId1', 'userId5'],
        //         date: '2020-02-09',
        //     },
        //     {
        //         id: 'bill5',
        //         payer: 'userId2',
        //         amount: { amount: 10072, currency: 'USD', precision: 2 },
        //         participants: ['userId5'],
        //         date: '2019-12-05',
        //     },
        //     {
        //         id: 'bill6',
        //         payer: 'userId3',
        //         amount: { amount: 7063, currency: 'USD', precision: 2 },
        //         participants: [
        //             'userId1',
        //             'userId2',
        //             'userId3',
        //             'userId4',
        //             'userId5',
        //         ],
        //         date: '2019-12-05',
        //     },
        // ],
        allBills: [],
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
    },
});

export const { addBill, removeBill } = billSlice.actions;

export default billSlice.reducer;
