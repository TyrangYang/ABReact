import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../slice/userSlice';

import { v4 as uuidV4 } from 'uuid';
import { Button, TextField, IconButton } from '@material-ui/core';
import { PersonAdd, Close, Check } from '@material-ui/icons';

import { useForm } from 'react-hook-form';

import ModalBox from '../ContentContainers/ModalBox';
import Styles from './UserBoard.module.css';

const AddNewUser = () => {
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const { allUsers } = useSelector((state) => state.Users);
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();

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
                Add New Person
            </Button>
            {showAddUserForm && (
                <ModalBox
                    onClickBackground={() => {
                        setShowAddUserForm(false);
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <h2>ADD NEW USER</h2>
                        <IconButton
                            onClick={() => {
                                setShowAddUserForm(false);
                            }}
                        >
                            <Close />
                        </IconButton>
                    </div>
                    <form
                        className={Styles.addUserForm}
                        onSubmit={handleSubmit((e) => {
                            dispatch(
                                addUser({
                                    id: uuidV4(),
                                    name: e.newName.toUpperCase(),
                                })
                            );
                            setShowAddUserForm(false);
                        })}
                    >
                        <TextField
                            type="text"
                            name="newName"
                            placeholder="Enter a new name"
                            inputRef={register({
                                required: true,
                                validate: {
                                    notHaveSameName: (val) => {
                                        let newName = val.toUpperCase();
                                        return !allUsers.reduce((acc, cur) => {
                                            if (acc) return true;
                                            else return cur.name === newName;
                                        }, false);
                                    },
                                },
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            endIcon={<Check />}
                        >
                            Confirm
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowAddUserForm(false)}
                        >
                            cancel
                        </Button>
                    </form>
                </ModalBox>
            )}
        </>
    );
};

export default AddNewUser;
