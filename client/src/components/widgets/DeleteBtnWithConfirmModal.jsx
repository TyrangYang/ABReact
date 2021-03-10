import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ModalBox from '../ContentContainers/ModalBox';
import {
    Button,
    IconButton,
    OutlinedInput,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
} from '@material-ui/core';
import { Delete, Close } from '@material-ui/icons';

const DeleteBtnWithConfirmModal = ({
    title = '',
    confirmMessage,
    onClickConfirmDeleteButton,
}) => {
    const [confirmTapping, setConfirmTapping] = useState('');

    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setConfirmTapping('');
        setShowModal(false);
    };

    return (
        <div>
            <IconButton
                color="secondary"
                onClick={() => {
                    setShowModal(true);
                }}
            >
                <Delete />
            </IconButton>
            {/* TODO: change to dialog */}
            {showModal && (
                <ModalBox
                    onClickBackground={() => closeModal()}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <h2>{title}</h2>
                        <IconButton
                            onClick={() => closeModal()}
                            // style={{ alignSelf: 'flex-end' }}
                        >
                            <Close />
                        </IconButton>
                    </div>
                    <p style={{ margin: '10px 0', fontSize: '20px' }}>
                        Please type
                        <span style={{ fontWeight: 'bold' }}>
                            {' ' + confirmMessage + ' '}
                        </span>
                        to confirm.
                    </p>
                    <OutlinedInput
                        id="component-outlined"
                        placeholder="Confirm"
                        value={confirmTapping}
                        onChange={(e) => {
                            setConfirmTapping(e.target.value);
                        }}
                        autoFocus
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={confirmMessage !== confirmTapping}
                        style={{ marginTop: '10px' }}
                        onClick={() => {
                            onClickConfirmDeleteButton();
                            closeModal();
                        }}
                    >
                        Delete
                    </Button>
                </ModalBox>
            )}
        </div>
    );
};

DeleteBtnWithConfirmModal.propTypes = {
    title: PropTypes.string,
    confirmMessage: PropTypes.string.isRequired,
    onClickConfirmDeleteButton: PropTypes.func.isRequired,
};

export default React.memo(DeleteBtnWithConfirmModal);
