import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';
import SummaryBoard from '../components/Summary/SummaryBoard';
import useSummary from '../hooks/useBillSummary';

import { Provider } from 'react-redux';
import store from '../app/store';

describe('test hook calculation', () => {
    test('send === receive', () => {
        const wrapper = ({ children }) => (
            <Provider store={store}>{children}</Provider>
        );
        const { result } = renderHook(() => useSummary(), { wrapper });
        const [, payerList, receiverList] = result.current;
        const payMoney = payerList.reduce((acc, cur) => {
            return acc + cur[1];
        }, 0);
        const receiveMoney = receiverList.reduce((acc, cur) => {
            return acc + cur[1];
        }, 0);

        expect(payMoney + receiveMoney).toBe(0);
    });
});
