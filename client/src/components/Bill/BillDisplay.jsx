import React, { useMemo, useContext, useState } from 'react';
import { eventStore } from '../Event/EventContextProvider';
import { GET_BILLS_BY_EVENT_ID } from '../../queries';
import { useQuery } from '@apollo/client';

import Dinero from 'dinero.js';
import moment from 'moment';

import BillTableDisplay from './BillTableDisplay';
import DeleteConfirmSnackbar from '../widgets/DeleteConfirmSnackbar';

const BillDisplay = () => {
    const {
        state: { currentEventID },
    } = useContext(eventStore);

    const { data, loading, error } = useQuery(GET_BILLS_BY_EVENT_ID, {
        variables: { eventID: currentEventID },
    });

    const allBills = useMemo(() => {
        if (loading || error) return [];
        return data?.getBillsInEvent;
    }, [loading, error, data]);

    const [showDelConfirmSnackbar, setShowDelConfirmSnackbar] = useState(false);

    const tableContent = useMemo(() => {
        return allBills.map((e) => {
            return {
                id: e.id,
                payer: e.payer.name,
                amount: Dinero(e.amount).toFormat(),
                participants: e.participants.map((e) => e.name),
                date: moment(+e.date).format('YYYY-MM-DD'),
            };
        });
    }, [allBills]);

    return (
        <div>
            {tableContent.length !== 0 ? (
                <BillTableDisplay
                    tableContent={tableContent}
                    // TODO: NEED TO REBUILD DEL
                    setShowDelConfirmSnackbar={setShowDelConfirmSnackbar}
                />
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h2>Add new Bill</h2>
                </div>
            )}
            <DeleteConfirmSnackbar
                open={showDelConfirmSnackbar}
                onClose={() => setShowDelConfirmSnackbar((val) => !val)}
            />
        </div>
    );
};

export default BillDisplay;
