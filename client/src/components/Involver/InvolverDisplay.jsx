import React, { useMemo, useContext, useRef } from 'react';

import { IconButton, Avatar, CircularProgress } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { useQuery } from '@apollo/client';
import { GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID } from '../../queries';

import { eventStore } from '../Event/EventContextProvider';

import TableDisplay from '../ContentContainers/TableDisplay';

function InvolverDisplay() {
    const {
        state: { currentEventID },
    } = useContext(eventStore);

    const { data, loading, error } = useQuery(
        GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID,
        {
            variables: { eventID: currentEventID },
        }
    );

    const allInvolvers = useMemo(() => {
        if (loading || error) return [];
        else return data?.getInvolversInEvent;
    }, [data, loading]);
    // solve snapshot problem
    // const billRef = useRef(allBills);

    const tableContent = useMemo(() => {
        return allInvolvers.map((e) => {
            let { id, name } = e;
            return [
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Avatar alt={name[0]} src="will be change" />
                    <span>{name}</span>
                </div>,
                <IconButton
                    color="secondary"
                    onClick={() => {
                        // solve snapshot problem (allBills ==> ref.current)
                    }}
                >
                    <Delete />
                </IconButton>,
            ];
        });
    }, [allInvolvers]);

    // solve snapshot problem
    // useEffect(() => {
    //     billRef.current = allBills;
    // });
    if (loading || error) {
        return (
            <div>
                <h2>Loading</h2>
                <CircularProgress color="primary" />
                {error && (
                    <div>
                        <h2>Error happen!! Please waite</h2>
                        <p>ERROR:{error.message}</p>
                    </div>
                )}
            </div>
        );
    }
    return (
        <div>
            {/* show user list */}
            {tableContent.length !== 0 ? (
                <TableDisplay
                    tableContent={tableContent}
                    headers={['name', '']}
                />
            ) : (
                <h2>no Involver</h2>
            )}
        </div>
    );
}

export default InvolverDisplay;
