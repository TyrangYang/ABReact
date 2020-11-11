import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeBill } from '../../slice/billSlice';

import { IconButton } from '@material-ui/core';
import Paper from '../ContentContainer/CustomContainer';

import { Delete } from '@material-ui/icons';
import Styles from './BillDisplay.module.css';

import Dinero from 'dinero.js';
import { useUserName } from '../../hooks/useUserName';

const BillDisplay = () => {
    const { allBills } = useSelector((state) => state.Bills);
    const dispatch = useDispatch();
    const getNameById = useUserName();

    return (
        <div>
            <div className={Styles.billsContainer}>
                {allBills.map((e) => (
                    <Paper key={e.id} style={{ height: 'none' }}>
                        <div>{getNameById(e.payer)}</div>
                        <div>{Dinero(e.amount).toFormat()}</div>
                        <div>
                            {e.participants.map((each, idx) => (
                                <div key={idx}>{getNameById(each)}</div>
                            ))}
                        </div>
                        <div>{e.date}</div>
                        <IconButton
                            color="secondary"
                            onClick={() => {
                                if (window.confirm('Delete this Bill'))
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
