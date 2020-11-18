import React, { useMemo, useRef, useEffect } from 'react';
import { removeUser } from '../../slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import AddNewUser from './AddNewUser';
import TableDisplay from '../ContentContainers/TableDisplay';

function UserBoard() {
    const { allUsers } = useSelector((state) => state.Users);
    const { allBills } = useSelector((state) => state.Bills);
    const dispatch = useDispatch();

    // solve snapshot problem
    const billRef = useRef(allBills);

    const tableContent = useMemo(() => {
        return allUsers.map((e) => {
            let { id, name } = e;
            return [
                name,
                <IconButton
                    color="secondary"
                    onClick={() => {
                        // solve snapshot problem (allBills ==> ref.current)
                        let userInBill = billRef.current.reduce((acc, cur) => {
                            if (acc) return true;
                            else
                                return (
                                    cur.payer === id ||
                                    cur.participants.includes(id)
                                );
                        }, false);
                        if (userInBill) alert('cannot delete');
                        else {
                            if (window.confirm('Want delete this user?'))
                                dispatch(removeUser(id));
                        }
                    }}
                >
                    <Delete />
                </IconButton>,
            ];
        });
    }, [allUsers, dispatch]);

    // solve snapshot problem
    useEffect(() => {
        billRef.current = allBills;
    });

    return (
        <div>
            <AddNewUser />
            {/* show user list */}
            <TableDisplay tableContent={tableContent} headers={['name', '']} />
        </div>
    );
}

export default UserBoard;
