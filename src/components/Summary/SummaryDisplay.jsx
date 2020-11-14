import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { addBill } from '../../slice/billSlice';
import { v4 as uuidV4 } from 'uuid';
import moment from 'moment';

import { Archive } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import TableDisplay from '../ContentContainers/TableDisplay';
import { useUserName } from '../../hooks/useUserName';

const SummaryDisplay = ({ summary, merged }) => {
    // get name hook
    const getNameById = useUserName();
    const dispatch = useDispatch();

    const tableContent = useMemo(() => {
        if (merged) {
            return summary.map((e) => {
                return [
                    getNameById(e.from) + '---->' + getNameById(e.to),
                    e.amount.toFormat(),
                ];
            });
        } else {
            return summary.map((e) => {
                return [
                    getNameById(e.from) + '---->' + getNameById(e.to),
                    e.amount.toFormat(),
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
                    </IconButton>,
                ];
            });
        }
    }, [summary, merged, dispatch, getNameById]);

    return (
        <div>
            {merged ? (
                <TableDisplay
                    tableContent={tableContent}
                    headers={['Transform', 'Amount']}
                />
            ) : (
                <TableDisplay
                    tableContent={tableContent}
                    headers={['Transform', 'Amount', '']}
                />
            )}
        </div>
    );
};

SummaryDisplay.prototype = {
    summary: PropTypes.array,
    merged: PropTypes.bool,
};

export default React.memo(SummaryDisplay);
