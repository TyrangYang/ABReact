import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    OutlinedInput,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
} from '@material-ui/core';

const ConfirmDialog = ({
    open,
    closeDialog,
    title = '',
    confirmMessage,
    onClickConfirmDeleteButton,
}) => {
    const [confirmTapping, setConfirmTapping] = useState('');

    const closeModal = () => {
        setConfirmTapping('');
        closeDialog();
    };

    return (
        <Dialog maxWidth="md" fullWidth open={open} onClose={closeModal}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {' '}
                    Please type
                    <span style={{ fontWeight: 'bold' }}>
                        {' ' + confirmMessage + ' '}
                    </span>
                    to confirm.
                </DialogContentText>
                <OutlinedInput
                    id="component-outlined"
                    placeholder="Confirm"
                    value={confirmTapping}
                    onChange={(e) => {
                        setConfirmTapping(e.target.value);
                    }}
                    autoFocus
                    fullWidth
                />
            </DialogContent>
            <DialogActions disableSpacing>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={confirmMessage !== confirmTapping}
                    style={{ marginTop: '10px' }}
                    onClick={() => {
                        onClickConfirmDeleteButton();
                        closeModal();
                    }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    title: PropTypes.string,
    confirmMessage: PropTypes.string.isRequired,
    onClickConfirmDeleteButton: PropTypes.func.isRequired,
};

export default React.memo(ConfirmDialog);
