import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ModalBox from '../../ContentContainers/ModalBox';
import {
    Button,
    IconButton,
    OutlinedInput,
    Typography,
} from '@material-ui/core';
import { Delete, Close } from '@material-ui/icons';

const DeleteBtnWithConfirmModal = ({ confirmMessage, onClickDeleteButton }) => {
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
                    <Typography
                        fontWeight="fontWeightBold"
                        style={{ margin: '10px 0' }}
                    >
                        Please type
                        <span> {confirmMessage} </span>
                        to confirm.
                    </Typography>
                    <OutlinedInput
                        id="component-outlined"
                        placeholder="Confirm"
                        value={confirmTapping}
                        onChange={(e) => {
                            setConfirmTapping(e.target.value);
                        }}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={confirmMessage !== confirmTapping}
                        style={{ marginTop: '10px ' }}
                        onClick={() => {
                            onClickDeleteButton();
                            setShowModal(false);
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
    onClickDeleteButton: PropTypes.func.isRequired,
};

export default React.memo(DeleteBtnWithConfirmModal);
