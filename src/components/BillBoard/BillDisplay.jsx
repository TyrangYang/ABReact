import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeBill } from '../../slice/billSlice';

import { IconButton, Paper } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Styles from './BillDisplay.module.css';

import Dinero from 'dinero.js';

const BillDisplay = () => {
    const { allBills } = useSelector((state) => state.Bills);
    const dispatch = useDispatch();

    return (
        <div>
            <div className={Styles.billsContainer}>
                {allBills.map((e) => (
                    <Paper
                        key={e.id}
                        elevation={3}
                        className={Styles.billContainer}
                    >
                        <div>{e.payerName}</div>
                        <div>{Dinero(e.amount).toFormat()}</div>
                        <div>
                            {e.participantsName.map((each, idx) => (
                                <div key={idx}>{each}</div>
                            ))}
                        </div>
                        <div>{e.date}</div>
                        <IconButton
                            color="secondary"
                            onClick={() => {
                                dispatch(removeBill(e.id));
                            }}
                        >
                            <Delete />
                        </IconButton>
                    </Paper>
                ))}
            </div>
        </div>
    );
};

export default BillDisplay;
