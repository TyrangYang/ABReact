import React from 'react';

import { Grid } from '@material-ui/core';

import InvolverPanel from './InvolverPanel';
import BillPanel from './BillPanel';
import TestPart from '../testComponent';

import EventContextProvider from './EventContextProvider';
import { useParams } from 'react-router';

export default function OneEventLayout() {
    let { id: eventID } = useParams();
    return (
        <EventContextProvider eventID={eventID}>
            <Grid container>
                <TestPart />
                <Grid item sm={9}>
                    <BillPanel />
                </Grid>
                <Grid item sm={3}>
                    <InvolverPanel />
                </Grid>
            </Grid>
        </EventContextProvider>
    );
}
