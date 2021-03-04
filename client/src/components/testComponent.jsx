import React, { useState } from 'react';

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

const TestComponent = () => {
    const [showComponent, setShowComponent] = useState(false);
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
                                // TODO
                            }}
                        >
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <ListItemText primary=" Initialize data" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                // TODO
                            }}
                        >
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <ListItemText primary=" Test (add a user)" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                // TODO
                            }}
                        >
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <ListItemText primary=" Test (add a bill)" />
                        </ListItem>
                    </List>
                </Drawer>
            )}
        </>
    );
};

export default TestComponent;
