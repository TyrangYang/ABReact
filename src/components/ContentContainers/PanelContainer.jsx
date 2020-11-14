import React from 'react';
import { Paper } from '@material-ui/core';

const PanelContainer = (props) => {
    return (
        <Paper
            elevation={3}
            style={{
                margin: '10px',
                padding: '10px',
                overflow: 'auto',
                ...props.style,
            }}
            data-testid="layoutContainerItem"
        >
            {props.children}
        </Paper>
    );
};

export default React.memo(PanelContainer);
