import React, { useReducer, useEffect, createContext } from 'react';

const initialState = {
    currentEventID: '',
};

export const eventStore = createContext(initialState);
const { Provider } = eventStore;

function EventContextProvider({ children, eventID }) {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setEventID':
                return { ...state, currentEventID: action.payload };
            default:
                throw new Error();
        }
    }, initialState);

    useEffect(() => {
        dispatch({
            type: 'setEventID',
            payload: eventID,
        });
    }, [eventID]);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export default EventContextProvider;
