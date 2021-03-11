import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { REMOVE_BILL_FROM_EVENT } from '../../queries';
import { eventStore } from '../Event/EventContextProvider';
import {
    IconButton,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmDialog from '../widgets/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const ParticipantCell = ({ data }) => {
    return (
        <div className={useStyles().root}>
            {data.map((e, idx) => (
                <Chip key={idx} label={e} variant="outlined" color="primary" />
            ))}
        </div>
    );
};

const OneTableRow = ({ rowData, setShowDelConfirmSnackbar }) => {
    const {
        state: { currentEventID },
    } = useContext(eventStore);
    const [showModal, setShowModal] = useState(false);
    const [removeBillFromEvent] = useMutation(REMOVE_BILL_FROM_EVENT, {
        update: (cache, { data: { removeBillFromEvent } }) => {
            cache.modify({
                fields: {
                    getBillsInEvent: (list, { readField }) => {
                        return list.filter(
                            (e) => removeBillFromEvent.id !== readField('id', e)
                        );
                    },
                },
            });
        },
    });

    return (
        <>
            <TableRow data-testid="billItem">
                <TableCell align="center">{rowData.payer}</TableCell>
                <TableCell align="center">{rowData.amount}</TableCell>
                <TableCell align="center" style={{ width: '40%' }}>
                    <ParticipantCell data={rowData.participants} />
                </TableCell>
                <TableCell align="center">{rowData.date}</TableCell>
                <TableCell align="center">
                    <IconButton
                        color="secondary"
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        <Delete />
                    </IconButton>
                    <ConfirmDialog
                        open={showModal}
                        closeDialog={() => {
                            setShowModal(false);
                        }}
                        title="Do you want Delete this Bill?"
                        confirmMessage="123"
                        onClickConfirmDeleteButton={() => {
                            removeBillFromEvent({
                                variables: {
                                    eventID: currentEventID,
                                    billID: rowData.id,
                                },
                            });
                            setShowModal(false);
                            setShowDelConfirmSnackbar(true);
                        }}
                    />
                </TableCell>
            </TableRow>
        </>
    );
};

const BillTableDisplay = ({ tableContent, setShowDelConfirmSnackbar }) => {
    return (
        <TableContainer component={Paper}>
            <Table style={{ minWidth: '500px' }} aria-label="bill-table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Who Paid</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Participant(s)</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableContent.map((row, idx) => (
                        <OneTableRow
                            rowData={row}
                            key={idx}
                            setShowDelConfirmSnackbar={
                                setShowDelConfirmSnackbar
                            }
                        ></OneTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

ParticipantCell.propTypes = {
    data: PropTypes.array.isRequired,
};

OneTableRow.propTypes = {
    rowData: PropTypes.object.isRequired,
};

BillTableDisplay.propTypes = {
    tableContent: PropTypes.array.isRequired,
};

export default React.memo(BillTableDisplay);
