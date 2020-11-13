import React from 'react';
import { Paper } from '@material-ui/core';

const CustomContainer = (props) => {
    return (
        <Paper
            elevation={3}
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: '10px',
                alignItems: 'center',
                height: '50px',
                ...props.style,
            }}
            data-testid="containerItem"
        >
            {props.children}
        </Paper>
    );
};

export default React.memo(CustomContainer);
