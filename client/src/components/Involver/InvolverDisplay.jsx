import React, { useMemo, useContext } from 'react';

import { IconButton, Avatar } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { useQuery } from '@apollo/client';
import { GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID } from '../../queries';

import { eventStore } from '../Event/EventContextProvider';

import TableDisplay from '../ContentContainers/TableDisplay';
import DataLoading from '../widgets/DataLoading';

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
    }, [data, loading, error]);

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
            ];
        });
    }, [allInvolvers]);

    if (loading || error) {
        return <DataLoading loading={loading} error={error} />;
    }
    return (
        <div>
            {/* show involvers list */}
            {tableContent.length !== 0 ? (
                <TableDisplay tableContent={tableContent} headers={['name']} />
            ) : (
                <h2>no Involver</h2>
            )}
        </div>
    );
}

export default InvolverDisplay;
