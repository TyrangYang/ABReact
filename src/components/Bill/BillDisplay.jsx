import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Dinero from 'dinero.js';
import { useUserName } from '../../hooks/useUserName';

import { Snackbar } from '@material-ui/core';
import BillTableDisplay from './BillTableDisplay';

export const WarningContext = React.createContext({
    showDeleteWarning: false,
    setShowDeleteWarning: () => {},
});

const BillDisplay = () => {
    const { allBills } = useSelector((state) => state.Bills);
    const getNameById = useUserName();

    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    const tableContent = useMemo(() => {
        return allBills.map((e) => {
            return {
                id: e.id,
                payer: getNameById(e.payer),
                amount: Dinero(e.amount).toFormat(),
                participants: e.participants.map((e) => getNameById(e)),
                date: e.date,
            };
        });
    }, [allBills, getNameById]);

    return (
        <WarningContext.Provider
            value={{ showDeleteWarning, setShowDeleteWarning }}
        >
            <div>
                {tableContent.length !== 0 ? (
                    <BillTableDisplay tableContent={tableContent} />
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h2>Add new Bill</h2>
                    </div>
                )}
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={showDeleteWarning}
                onClose={() => {
                    setShowDeleteWarning(false);
                }}
                autoHideDuration={2500}
                ContentProps={{ style: { background: 'teal' } }}
                message={`Delete Success`}
            />
        </WarningContext.Provider>
    );
};

export default BillDisplay;
