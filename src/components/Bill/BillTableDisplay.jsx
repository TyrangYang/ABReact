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
} from '@material-ui/core';

import DeleteBtnConfirmModal from '../widgets/DeleteBtnWithConfirmModal';

const OneTableRow = ({ rowData }) => {
    const dispatch = useDispatch();
    return (
        <>
            <TableRow data-testid="billItem">
                <TableCell align="center">{rowData.payer}</TableCell>
                <TableCell align="center">{rowData.amount}</TableCell>
                <TableCell align="center">{rowData.participants}</TableCell>
                <TableCell align="center">{rowData.date}</TableCell>
                <TableCell align="center">
                    <DeleteBtnConfirmModal
                        title="Do you want Delete this Bill?"
                        confirmMessage="123"
                        onClickConfirmDeleteButton={() => {
                            dispatch(removeBill(rowData.id));
                        }}
                    />
                </TableCell>
            </TableRow>
        </>
    );
};

const BillTableDisplay = ({ tableData }) => {
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
                    {tableData.map((row, idx) => (
                        <OneTableRow rowData={row} key={idx}></OneTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

OneTableRow.propTypes = {
    rowData: PropTypes.object.isRequired,
};

BillTableDisplay.propTypes = {
    tableData: PropTypes.array.isRequired,
};

export default React.memo(BillTableDisplay);
