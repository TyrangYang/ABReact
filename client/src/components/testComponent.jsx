import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';

import {
    Fab,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { addBill } from '../slice/billSlice';
import { addUser } from '../slice/userSlice';

const TestComponent = () => {
    const [showComponent, setShowComponent] = useState(false);
    const dispatch = useDispatch();
    return (
        <>
            <Fab
                color="primary"
                style={{ position: 'absolute', bottom: '30px', right: '30px' }}
                onClick={() => {
                    setShowComponent((x) => !x);
                }}
            >
                Test
            </Fab>
            {showComponent && (
                <Drawer
                    anchor="right"
                    open={showComponent}
                    onClose={() => {
                        setShowComponent(false);
                    }}
                >
                    <List subheader={<ListSubheader>Test Only</ListSubheader>}>
                        <ListItem
                            button
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
                        >
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <ListItemText primary=" Test (add a bill)" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                dispatch(
                                    addUser({
                                        id: uuidV4(),
                                        name: 'User' + Math.random(),
                                    })
                                );
                            }}
                        >
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <ListItemText primary=" Test (add a user)" />
                        </ListItem>
                    </List>
                </Drawer>
            )}
        </>
    );
};

export default TestComponent;
