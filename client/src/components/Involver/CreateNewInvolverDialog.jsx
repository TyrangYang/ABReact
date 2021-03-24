import React, { useContext } from 'react';
import { eventStore } from '../Event/EventContextProvider';
import {
    CREATE_NEW_INVOLVER_IN_USER,
    GET_INVOLVERS_IN_GIVEN_USER_BY_USER_ID,
    ADD_NEW_INVOLVER_IN_EVENT,
    GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID,
} from '../../queries';
import { useMutation } from '@apollo/client';
import {
    Button,
    FormControlLabel,
    TextField,
    Checkbox,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';

import { useForm, Controller } from 'react-hook-form';

import Styles from './InvolverDisplay.module.css';

const CreateNewInvolverDialog = ({ open, closeDialog }) => {
    const {
        state: { currentEventID, currentUserID },
    } = useContext(eventStore);

    const [involverJoinEvent] = useMutation(ADD_NEW_INVOLVER_IN_EVENT, {
        update(cache, { data: { involverJoinEvent } }) {
            const { getInvolversInEvent } = cache.readQuery({
                query: GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID,
                variables: { eventID: currentEventID },
            });
            cache.writeQuery({
                query: GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID,
                variables: { eventID: currentEventID },
                data: {
                    getInvolversInEvent: [
                        ...getInvolversInEvent,
                        involverJoinEvent,
                    ],
                },
            });
        },
    });

    const [createNewInvolver] = useMutation(CREATE_NEW_INVOLVER_IN_USER, {
        update(cache, { data: { createNewInvolverToUser } }) {
            const { getInvolversInUser } = cache.readQuery({
                query: GET_INVOLVERS_IN_GIVEN_USER_BY_USER_ID,
                variables: { userID: currentUserID },
            });
            cache.writeQuery({
                query: GET_INVOLVERS_IN_GIVEN_USER_BY_USER_ID,
                variables: { userID: currentUserID },
                data: {
                    getInvolversInUser: [
                        ...getInvolversInUser,
                        createNewInvolverToUser,
                    ],
                },
            });
        },
    });

    const { register, handleSubmit, errors, control } = useForm();

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="add-Involver"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="add-Involver">Create New Involver</DialogTitle>
            <DialogContent>
                <form
                    id="add-Involver-Form"
                    className={Styles.addInvolverForm}
                    onSubmit={handleSubmit(async (e) => {
                        closeDialog();
                        let {
                            data: { createNewInvolverToUser },
                        } = await createNewInvolver({
                            variables: {
                                userID: currentUserID,
                                involverName: e.newName,
                            },
                        });
                        if (e.joinThisEvent) {
                            await involverJoinEvent({
                                variables: {
                                    eventID: currentEventID,
                                    involverID: createNewInvolverToUser.id,
                                },
                            });
                        }
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
                                    : errors.newName.type === 'notHaveSameName'
                                    ? 'Same name exist'
                                    : ''
                                : ''
                        }
                    />
                    <FormControlLabel
                        labelPlacement="start"
                        label="Join This Event"
                        color="primary"
                        control={
                            <Controller
                                render={({ onChange, value }) => {
                                    return (
                                        <Checkbox
                                            checked={value}
                                            onChange={(e) => {
                                                onChange(e.target.checked);
                                            }}
                                        />
                                    );
                                }}
                                control={control}
                                name="joinThisEvent"
                                defaultValue={false}
                            />
                        }
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={() => {
                        closeDialog();
                    }}
                >
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
    );
};

export default CreateNewInvolverDialog;
