import React, { useEffect } from 'react';
import UserPanel from './UserPanel';
import BillPanel from './BillPanel';

import { fetchAllUsers } from '../../slice/userSlice';
import { fetchAllBills } from '../../slice/billSlice';
import { useDispatch } from 'react-redux';

import { Grid } from '@material-ui/core';

import TestPart from '../testComponent';

export default function Layout() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllUsers());
        dispatch(fetchAllBills());
    }, [dispatch]);
    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                    <TestPart />
                </Grid>
                <Grid item sm={9}>
                    <BillPanel />
                </Grid>
                <Grid item sm={3}>
                    <UserPanel />
                </Grid>
            </Grid>
        </>
    );
}
