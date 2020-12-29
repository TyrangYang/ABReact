import React from 'react';
import UserPanel from './UserPanel';
import BillPanel from './BillPanel';
import { Grid } from '@material-ui/core';

import TestPart from '../testComponent';

export default function Layout() {
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
