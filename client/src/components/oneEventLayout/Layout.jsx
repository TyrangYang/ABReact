import React from 'react';

import { Grid } from '@material-ui/core';

import InvolverPanel from './InvolverPanel';
import TestPart from '../testComponent';

export default function Layout() {
    return (
        <>
            <Grid container>
                <TestPart />
                <Grid item sm={9}>
                    {/* <BillPanel /> */}
                </Grid>
                <Grid item sm={3}>
                    <InvolverPanel />
                </Grid>
            </Grid>
        </>
    );
}
