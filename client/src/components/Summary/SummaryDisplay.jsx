import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { eventStore } from '../Event/EventContextProvider';
import { CREATE_NEW_BILL_TO_EVENT, GET_BILLS_BY_EVENT_ID } from '../../queries';
import { useMutation } from '@apollo/client';
import moment from 'moment';

import { Archive } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import TableDisplay from '../ContentContainers/TableDisplay';

import ConfirmDialog from '../widgets/ConfirmDialog';

const BtnWithConfirmDialog = ({ fn }) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    return (
        <div>
            <IconButton
                color="primary"
                onClick={() => {
                    setShowConfirmDialog(true);
                }}
            >
                <Archive />
            </IconButton>
            <ConfirmDialog
                open={showConfirmDialog}
                closeDialog={() => setShowConfirmDialog(false)}
                confirmMessage="123"
                onClickConfirmDeleteButton={fn}
            ></ConfirmDialog>
        </div>
    );
};

const SummaryDisplay = ({ summary, merged }) => {
    const {
        state: { currentEventID },
    } = useContext(eventStore);

    const [addNewBill] = useMutation(CREATE_NEW_BILL_TO_EVENT, {
        update: (cache, { data: { addNewBillToEvent: curItem } }) => {
            const { getBillsInEvent: prevList } = cache.readQuery({
                query: GET_BILLS_BY_EVENT_ID,
                variables: { eventID: currentEventID },
            });

            cache.writeQuery({
                query: GET_BILLS_BY_EVENT_ID,
                variables: { eventID: currentEventID },
                data: {
                    getBillsInEvent: [...prevList, curItem],
                },
            });
        },
    });

    const tableContent = useMemo(() => {
        if (merged) {
            return summary.map((e) => {
                return [e.from.name + '---->' + e.to.name, e.amount.toFormat()];
            });
        } else {
            return summary.map((e) => {
                return [
                    e.from.name + '---->' + e.to.name,
                    e.amount.toFormat(),

                    <BtnWithConfirmDialog
                        fn={() => {
                            addNewBill({
                                variables: {
                                    eventID: currentEventID,
                                    payerID: e.from.id,
                                    participantsID: [e.to.id],
                                    amount: e.amount.toJSON(),
                                    date: moment().format('YYYY-MM-DD'),
                                },
                            });
                        }}
                    />,
                ];
            });
        }
    }, [
        summary,
        merged,
        addNewBill,
        currentEventID,
        // showConfirmDialog,
        // setShowConfirmDialog,
    ]);

    return (
        <div>
            {tableContent.length !== 0 ? (
                <>
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
                </>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h2> Bill All Set </h2>
                </div>
            )}
        </div>
    );
};

SummaryDisplay.propTypes = {
    summary: PropTypes.array,
    merged: PropTypes.bool,
};

export default React.memo(SummaryDisplay);
