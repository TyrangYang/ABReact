import React, { useState, useMemo } from 'react';
import { addUser, removeUser } from '../../slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidV4 } from 'uuid';
import { useForm } from 'react-hook-form';

import { Button, TextField, IconButton } from '@material-ui/core';
import { Delete, Check, PersonAdd, Close } from '@material-ui/icons';

import TableDisplay from '../ContentContainers/TableDisplay';
import ModalBox from '../ContentContainers/ModalBox';
import Styles from './UserBoard.module.css';

function UserBoard() {
    const [showAddUserForm, setShowAddUserForm] = useState(false);

    const { allUsers } = useSelector((state) => state.Users);
    const dispatch = useDispatch();

    const tableContent = useMemo(() => {
        return allUsers.map((e) => {
            let { id, name } = e;
            return [
                name,
                <IconButton
                    color="secondary"
                    onClick={() => {
                        if (window.confirm(`Do you want to delete ${name}`))
                            dispatch(removeUser(id));
                    }}
                >
                    <Delete />
                </IconButton>,
            ];
        });
    }, [allUsers, dispatch]);

    const { register, handleSubmit, errors } = useForm();
    return (
        <div>
            <Button
                color="primary"
                onClick={() => {
                    setShowAddUserForm(true);
                }}
                startIcon={<PersonAdd />}
            >
                New User
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
                            inputRef={register({ required: true })}
                            error={!!errors.newName}
                            helperText={
                                !!errors.newName ? 'Name is required' : ''
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
            {/* show user list */}
            <TableDisplay tableContent={tableContent} headers={['name', '']} />
        </div>
    );
}

export default React.memo(UserBoard);
