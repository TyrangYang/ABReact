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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';

import TransferList from './TransferList';

const SelectInvolversToJoinEventDialog = ({ open, closeDialog }) => {
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
        if (eventLoading || eventError || userLoading || userError)
            return [[], []];
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
    }, [
        eventData_Involvers,
        userData_Involvers,
        eventLoading,
        eventError,
        userLoading,
        userError,
    ]);

    const [candidate, setCandidate] = useState([]);

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
            <Dialog
                open={open}
                onClose={closeDialog}
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
                    <Button color="primary" onClick={closeDialog}>
                        cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        onClick={() => {
                            closeDialog();
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

export default SelectInvolversToJoinEventDialog;
