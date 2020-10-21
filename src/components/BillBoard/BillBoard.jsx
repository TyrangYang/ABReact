import React from 'react';
import AddBillForm from './AddBillForm';
import BillDisplay from './BillDisplay';
import Styles from './BillBoard.module.css';

const BillBoard = () => {
    return (
        <div>
            <AddBillForm />
            <BillDisplay />
        </div>
    );
};

export default React.memo(BillBoard);
