import React, { useReducer, useEffect, createContext } from 'react';
import { GET_EVENT_ID_unsafe } from '../../queries';
import { useQuery } from '@apollo/client';

const initialState = {
    currentEventID: '',
};

export const eventStore = createContext(initialState);
const { Provider } = eventStore;

function EventContextProvider({ children, eventID }) {
    // TODO: userID and eventID are temporary
    const { data, loading, error } = useQuery(GET_EVENT_ID_unsafe);

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setEventID':
                return { ...state, currentEventID: action.payload };
            default:
                throw new Error();
        }
    }, initialState);
    useEffect(() => {
        if (!loading && !error) {
            dispatch({
                type: 'setEventID',
                payload: data.getEventID,
            });
        }
    }, [data, loading, error]);
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export default EventContextProvider;
