import React from 'react';

import { Grid } from '@material-ui/core';

import InvolverPanel from './InvolverPanel';
import BillPanel from './BillPanel';
import TestPart from '../testComponent';

import EventContextProvider from './EventContextProvider';

export default function Layout() {
    return (
        <EventContextProvider eventID="604707eb6db86bbbdbd4392a">
            <Grid container>
                <TestPart />
                <Grid item sm={9}>
                    {/* <BillPanel /> */}
                </Grid>
                <Grid item sm={3}>
                    <InvolverPanel />
                </Grid>
            </Grid>
        </EventContextProvider>
    );
}
