import React, { useState } from 'react';
import { addUser, removeUser } from '../../slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

import { Button, TextField, IconButton } from '@material-ui/core';
import Paper from '../ContentContainer/CustomContainer';
import { Delete, Check } from '@material-ui/icons';
import Styles from './UserBoard.module.css';

function UserBoard() {
    const [showAddUserForm, setShowAddUserForm] = useState(false);

    const { allUsers } = useSelector((state) => state.Users);
    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm();
    return (
        <div>
            <h2>Users</h2>
            {!showAddUserForm ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setShowAddUserForm(true);
                    }}
                >
                    New User
                </Button>
            ) : (
                <form
                    className={Styles.addUserForm}
                    onSubmit={handleSubmit((e) => {
                        dispatch(
                            addUser({
                                id: uuidv4(),
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
                        inputRef={register({ required: true })}
                        error={!!errors.newName}
                        helperText={!!errors.newName ? 'Name is required' : ''}
                    />
                    <div className={Styles.formBtnGroup}>
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
                    </div>
                </form>
            )}
            {/* show user list */}
            <ul className={Styles.unordered_list}>
                {allUsers.map((e) => {
                    let { id, name } = e;
                    return (
                        <li key={id}>
                            <Paper
                                style={{
                                    alignItems: 'center',
                                    margin: '10px',
                                }}
                            >
                                <div>{name}</div>
                                <IconButton
                                    color="secondary"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                `Do you want to delete ${name}`
                                            )
                                        )
                                            dispatch(removeUser(id));
                                    }}
                                >
                                    <Delete />
                                </IconButton>
                            </Paper>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default React.memo(UserBoard);
