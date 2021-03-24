import React from 'react';
import PropTypes from 'prop-types';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
const TableDisplay = ({ headers, tableContent }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="table">
                <TableHead>
                    <TableRow>
                        {headers.map((eachHead, idx) => (
                            <TableCell align="center" key={idx}>
                                {eachHead}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableContent.map((row, idx) => (
                        <TableRow key={idx}>
                            {row.map((e, i) => (
                                <TableCell align="center" key={i}>
                                    {e}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

TableDisplay.propTypes = {
    headers: PropTypes.array.isRequired,
    tableContent: PropTypes.array.isRequired,
};

export default TableDisplay;
