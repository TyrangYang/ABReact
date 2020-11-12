import React from 'react';
import { Paper } from '@material-ui/core';

const CustomContainer = (props) => {
    return (
        <Paper
            elevation={3}
            style={{
                margin: '10px',
                padding: '10px',
                ...props.style,
            }}
            data-testid="layoutContainerItem"
        >
            {props.children}
        </Paper>
    );
};

export default React.memo(CustomContainer);
