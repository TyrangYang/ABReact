import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from '@material-ui/core';

const Styles = {
    background: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '10',
        overflow: 'auto',
    },
    contentWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px',
        width: '40%',
        backgroundColor: 'rgb(255, 255, 255)',
    },
};

const ModalBox = (props) => {
    return (
        <div
            id="modalBox-background"
            style={Styles.background}
            onClick={(e) => {
                if (e.target.id === 'modalBox-background')
                    props.onClickBackground();
            }}
        >
            <Paper style={Styles.contentWrapper}>{props.children}</Paper>
        </div>
    );
};

ModalBox.propTypes = {
    onClickBackground: PropTypes.func,
};

export default ModalBox;
