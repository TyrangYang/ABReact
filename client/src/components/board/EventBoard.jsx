import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_NEW_EVENT_TO_USER, GET_EVENTS_FROM_USER } from '../../queries';
import DataLoading from '../widgets/DataLoading';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// get events
// display all event

const EventBoard = () => {
    const { data, loading, error } = useQuery(GET_EVENTS_FROM_USER);
    const [createNewEvent] = useMutation(CREATE_NEW_EVENT_TO_USER, {
        update(cache, { data: { createNewEvent } }) {
            const { getEventsFromUser } = cache.readQuery({ query: GET_EVENTS_FROM_USER });
            cache.writeQuery({
                query: GET_EVENTS_FROM_USER,
                data: {
                    getEventsFromUser: [...getEventsFromUser, createNewEvent],
                },
            });
        },
    });
    const { register, handleSubmit } = useForm();

    if (loading || error) {
        return <DataLoading loading={loading} error={error} />;
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(({ eventName }) => {
                    createNewEvent({ variables: { eventName } });
                })}
            >
                <label htmlFor="event-name">event name:</label>
                <input name="eventName" id="event-name" ref={register} />
                <input type="submit" value="add new one" />
            </form>
            <ul>
                {data.getEventsFromUser.map((event) => {
                    return (
                        <li key={event.id}>
                            <Link to={`/event/${event.id}`}>{event.eventName}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default EventBoard;
