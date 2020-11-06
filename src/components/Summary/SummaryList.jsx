import React from 'react';
import { useDispatch } from 'react-redux';
import { addBill } from '../../slice/billSlice';
import { v4 as uuidV4 } from 'uuid';
import moment from 'moment';

import Paper from '../CustomContainer';
import { Archive } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useUserName } from '../../hooks/useUserName';

const SummaryList = ({ summary, merged }) => {
    // get name hook
    const getNameById = useUserName();
    const dispatch = useDispatch();
    return (
        <div>
            {summary.map((e, idx) => {
                return (
                    <Paper key={idx} style={{ marginTop: '10px' }}>
                        <div>
                            <span>{getNameById(e.from)}</span>
                            <span> ----&gt; </span>
                            <span>{getNameById(e.to)}</span>
                        </div>
                        <div>{e.amount.toFormat()}</div>
                        {!merged && (
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    dispatch(
                                        addBill({
                                            id: uuidV4(),
                                            payer: e.from,
                                            amount: e.amount.toJSON(),
                                            participants: [e.to],
                                            date: moment().format('YYYY-MM-DD'),
                                        })
                                    );
                                }}
                            >
                                <Archive />
                            </IconButton>
                        )}
                    </Paper>
                );
            })}
        </div>
    );
};

export default React.memo(SummaryList);
