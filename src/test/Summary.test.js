import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryBoard from '../components/Summary/SummaryBoard';

import { Provider } from 'react-redux';
import store from '../app/store';

test('render chart', () => {
    const { getAllByRole, queryByTestId } = render(
        <Provider store={store}>
            <SummaryBoard />
        </Provider>
    );

    expect(queryByTestId('pieChart')).toBeNull();
    userEvent.click(getAllByRole('checkbox')[1]);
    expect(queryByTestId('pieChart')).not.toBeNull();
});
