import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Dinero from 'dinero.js';
import { useUserName } from '../../hooks/useUserName';

import BillTableDisplay from './BillTableDisplay';
import AddBillForm from './AddBillForm';

const BillDisplay = () => {
    const { allBills } = useSelector((state) => state.Bills);
    const getNameById = useUserName();

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
        <div>
            {tableContent.length !== 0 ? (
                <BillTableDisplay tableContent={tableContent} />
            ) : (
                <>
                    <h2>Add new Bill</h2>
                    <AddBillForm />
                </>
            )}
        </div>
    );
};

export default BillDisplay;
