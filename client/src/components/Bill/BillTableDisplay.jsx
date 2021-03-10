import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { removeBill } from '../../slice/billSlice';

import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteBtnConfirmModal from '../widgets/DeleteBtnWithConfirmModal';

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
    const dispatch = useDispatch();

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
                    {/* // TODO: del bill */}
                    <DeleteBtnConfirmModal
                        title="Do you want Delete this Bill?"
                        confirmMessage="123"
                        onClickConfirmDeleteButton={() => {
                            dispatch(removeBill(rowData.id));
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
