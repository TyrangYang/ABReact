import React from 'react';
import { useQuery } from '@apollo/client';
import {
    GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID,
    GET_INVOLVERS_IN_GIVEN_USER_BY_USER_ID,
} from '../../queries';
const SelectInvolversToJoinEvent = () => {
    const { currentEventID } = useSelector((state) => state.Event);
    const { currentUserID } = useSelector((state) => state.User);

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

    return <div></div>;
};

export default SelectInvolversToJoinEvent;
