import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ModalBox from '../ContentContainers/ModalBox';
import { Button, IconButton, OutlinedInput } from '@material-ui/core';
import { Delete, Close } from '@material-ui/icons';

const DeleteBtnWithConfirmModal = ({
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

            {showModal && (
                <ModalBox
                    onClickBackground={() => closeModal()}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                    }}
                >
                    <IconButton
                        onClick={() => closeModal()}
                        style={{ alignSelf: 'flex-end' }}
                    >
                        <Close />
                    </IconButton>
                    <p style={{ margin: '10px 0' }}>
                        Please type
                        <span> {confirmMessage} </span>
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
    confirmMessage: PropTypes.string.isRequired,
    onClickConfirmDeleteButton: PropTypes.func.isRequired,
};

export default React.memo(DeleteBtnWithConfirmModal);
