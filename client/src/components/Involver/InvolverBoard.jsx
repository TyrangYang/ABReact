import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IconButton, Avatar, CircularProgress } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { useQuery } from '@apollo/client';
import { GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID } from '../../queries';

import AddNewInvolver from './AddNewInvolver';
import TableDisplay from '../ContentContainers/TableDisplay';

function InvolverBoard() {
    const { currentEventID } = useSelector((state) => state.Event);
    const { data, loading, error } = useQuery(
        GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID,
        {
            variables: { eventID: currentEventID },
        }
    );

    const [allInvolvers, setAllInvolvers] = useState([]);

    useEffect(() => {
        if (loading === false)
            setAllInvolvers(data.getEventInfoByID.allInvolvers);
    }, [loading, data]);
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
    if (error) {
        return (
            <div>
                <h2>Error happen!! Please waite</h2>
                {error}
            </div>
        );
    }
    if (loading) {
        return (
            <div>
                <h2>Loading</h2>
                <CircularProgress color="primary" />
            </div>
        );
    }
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '10px',
                }}
            >
                <AddNewInvolver />
            </div>
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

export default InvolverBoard;
