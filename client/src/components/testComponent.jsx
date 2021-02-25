import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';

import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import Container from './ContentContainers/CustomContainer';
import { addBill } from '../slice/billSlice';
import { addUser } from '../slice/userSlice';

const TestComponent = () => {
    const dispatch = useDispatch();
    return (
        <Container>
            <h1>Test Only</h1>
            <Button
                color="primary"
                onClick={() => {
                    dispatch(
                        addBill({
                            id: uuidV4(),
                            payer: 'userId1',
                            amount: {
                                amount: 10000,
                                currency: 'USD',
                                precision: 2,
                            },
                            participants: ['userId2', 'userId3'],
                            date: moment().format('YYYY-MM-DD'),
                        })
                    );
                }}
                startIcon={<Add />}
            >
                Test (add a bill)
            </Button>
            <Button
                color="primary"
                onClick={() => {
                    dispatch(
                        addUser({
                            id: uuidV4(),
                            name: 'User' + Math.random(),
                        })
                    );
                }}
                startIcon={<Add />}
            >
                Test (add a user)
            </Button>
        </Container>
    );
};

export default TestComponent;
