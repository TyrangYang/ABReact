import React from 'react';
import { createPortal } from 'react-dom';
import { Snackbar } from '@material-ui/core';

export default function DeleteConfirmSnackbar({ open, onClose }) {
    return createPortal(
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open}
                onClose={onClose}
                autoHideDuration={2500}
                ContentProps={{ style: { background: 'teal' } }}
                message={`Delete Success`}
            />
        </div>,
        document.body
    );
}
