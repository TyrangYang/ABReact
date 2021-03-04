import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';
import { PersonAdd, Check } from '@material-ui/icons';

import { useForm } from 'react-hook-form';

import Styles from './InvolverBoard.module.css';

const AddNewInvolver = () => {
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const { register, handleSubmit, errors } = useForm();

    const handleOnClose = () => setShowAddUserForm(false);

    return (
        <>
            {/* add new user */}
            <Button
                color="primary"
                onClick={() => {
                    setShowAddUserForm(true);
                }}
                startIcon={<PersonAdd />}
            >
                Add New Involver
            </Button>
            <Dialog
                open={showAddUserForm}
                onClose={handleOnClose}
                aria-labelledby="add-Involver"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="add-Involver" onClose={handleOnClose}>
                    ADD NEW USER
                </DialogTitle>
                <DialogContent>
                    <form
                        id="add-Involver-Form"
                        className={Styles.addUserForm}
                        onSubmit={handleSubmit((e) => {
                            //TODO: add a new involver
                            setShowAddUserForm(false);
                        })}
                    >
                        <TextField
                            type="text"
                            name="newName"
                            placeholder="Enter a new name"
                            inputRef={register({
                                required: true,
                            })}
                            error={!!errors.newName}
                            helperText={
                                !!errors.newName
                                    ? errors.newName.type === 'required'
                                        ? 'Name is required'
                                        : errors.newName.type ===
                                          'notHaveSameName'
                                        ? 'Same name exist'
                                        : ''
                                    : ''
                            }
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleOnClose}>
                        cancel
                    </Button>
                    <Button
                        type="submit"
                        form="add-Involver-Form"
                        color="primary"
                        endIcon={<Check />}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddNewInvolver;
