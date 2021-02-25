import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import store from '../app/store';

import AddBillForm from '../components/Bill/AddBillForm';
import BillDisplay from '../components/Bill/BillDisplay';
import 'mutationobserver-shim';

beforeEach(() => {
    render(
        <Provider store={store}>
            <AddBillForm />
            <BillDisplay />
        </Provider>
    );
});

test('Open and close add bill form', async () => {
    expect(screen.queryByTestId('add-new-bill-form')).toBeNull();
    userEvent.click(screen.getByTestId('add-new-bill-btn'));
    expect(screen.queryByTestId('add-new-bill-form')).not.toBeNull();
    userEvent.click(screen.getByTestId('cancel-btn'));
    expect(screen.queryByTestId('add-new-bill-form')).toBeNull();
});

it('Invalid empty input', async () => {
    userEvent.click(screen.getByTestId('add-new-bill-btn'));

    expect(screen.queryByText('Select one payer')).toBeNull();
    expect(screen.queryByText('Need amount')).toBeNull();
    expect(screen.queryByText('At least one participant')).toBeNull();
    await waitFor(() => {
        userEvent.click(screen.getByTestId('submit-btn'));
    });

    expect(screen.queryByText('Select one payer')).not.toBeNull();
    expect(screen.queryByText('Need amount')).not.toBeNull();
    expect(screen.queryByText('At least one participant')).not.toBeNull();
});

test('Add new bill', async () => {
    // original length
    const oriLen = screen.queryAllByTestId('billItem').length;
    // open form
    userEvent.click(screen.getByTestId('add-new-bill-btn'));

    // add payer
    userEvent.click(screen.getByLabelText('Payer'));
    userEvent.click(
        within(screen.getByRole('listbox')).getByText('TEST_NAME1')
    );
    //add amount
    userEvent.type(
        screen.getByTestId('add-bill-amount').querySelector('input'),
        '123.12'
    );

    // add participants
    userEvent.click(screen.getByLabelText('Participant(s)'));
    const participantsListbox = within(screen.getByRole('listbox'));
    userEvent.click(participantsListbox.getByText('TEST_NAME2'));
    userEvent.click(participantsListbox.getByText('TEST_NAME4'));

    // submit
    await waitFor(() => {
        // handleSubmit is async
        userEvent.click(screen.getByTestId('submit-btn'));
    });
    // screen.debug();
    // add a new one
    expect(screen.getAllByTestId('billItem')).toHaveLength(oriLen + 1);
});
