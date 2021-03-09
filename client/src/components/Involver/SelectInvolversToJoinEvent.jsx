import React, { useState, useContext, useMemo } from 'react';
import { eventStore } from '../Event/EventContextProvider';
import { useQuery, useMutation } from '@apollo/client';
import {
    GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID,
    GET_INVOLVERS_IN_GIVEN_USER_BY_USER_ID,
    ADD_NEW_INVOLVER_IN_EVENT,
} from '../../queries';

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
import { PersonAddOutlined } from '@material-ui/icons';

import TransferList from './TransferList';

const SelectInvolversToJoinEvent = () => {
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

    const {
        data: eventData_Involvers,
        loading: eventLoading,
        error: eventError,
    } = useQuery(GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID, {
        variables: { eventID: currentEventID },
    });

    const {
        data: userData_Involvers,
        loading: userLoading,
        error: userError,
    } = useQuery(GET_INVOLVERS_IN_GIVEN_USER_BY_USER_ID, {
        variables: { userID: currentUserID },
    });

    const [involverInEvent, involverOutEvent] = useMemo(() => {
        if (!eventData_Involvers || !userData_Involvers) return [[], []];
        let { getInvolversInEvent } = eventData_Involvers;
        let { getInvolversInUser } = userData_Involvers;
        let inEvent = [],
            outEvent = [];

        getInvolversInUser.forEach((each) => {
            if (
                getInvolversInEvent.some(
                    (eachFromEvent) => each.id === eachFromEvent.id
                )
            )
                inEvent.push(each);
            else outEvent.push(each);
        });
        return [inEvent, outEvent];
    }, [eventData_Involvers, userData_Involvers]);

    const [showDialog, setShowDialog] = useState(false);
    const [candidate, setCandidate] = useState([]);

    const handleOnClose = () => setShowDialog(false);

    const onClickConfirm = () => {
        // mutation: add candidate to an event
        candidate.forEach((each) => {
            involverJoinEvent({
                variables: {
                    eventID: currentEventID,
                    involverID: each.id,
                },
            });
        });
        // clean candidate
        setCandidate([]);
    };

    return (
        <>
            <Button
                color="primary"
                onClick={() => {
                    setShowDialog(true);
                }}
                startIcon={<PersonAddOutlined />}
            >
                Add New Involver
            </Button>
            <Dialog
                open={showDialog}
                onClose={handleOnClose}
                aria-labelledby="add-Involver"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="add-Involver">ADD New Involver</DialogTitle>
                <DialogContent dividers>
                    <TransferList
                        left={involverInEvent}
                        right={involverOutEvent}
                        setCandidate={setCandidate}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleOnClose}>
                        cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        onClick={() => {
                            handleOnClose();
                            onClickConfirm();
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SelectInvolversToJoinEvent;
