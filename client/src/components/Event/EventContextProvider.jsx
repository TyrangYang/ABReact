import React, { useReducer, useEffect, createContext } from 'react';
import { GET_EVENT_ID_unsafe, GET_USER_ID_unsafe } from '../../queries';
import { useQuery } from '@apollo/client';

const initialState = {
    currentUserID: '',
    currentEventID: '',
};

export const eventStore = createContext(initialState);
const { Provider } = eventStore;

function EventContextProvider({ children, eventID }) {
    // TODO: userID and eventID are temporary
    const { data: d1, loading: l1, error: e1 } = useQuery(GET_USER_ID_unsafe);
    const { data: d2, loading: l2, error: e2 } = useQuery(GET_EVENT_ID_unsafe);

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setUserID':
                return { ...state, currentUserID: action.payload };
            case 'setEventID':
                return { ...state, currentEventID: action.payload };
            default:
                throw new Error();
        }
    }, initialState);
    useEffect(() => {
        if (!l1 && !l2 && !e1 && !e2) {
            dispatch({
                type: 'setEventID',
                payload: d2.getEventID,
            });
            dispatch({
                type: 'setUserID',
                payload: d1.getUserID,
            });
        }
    }, [d1, d2, l1, l2, e1, e2]);
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export default EventContextProvider;
