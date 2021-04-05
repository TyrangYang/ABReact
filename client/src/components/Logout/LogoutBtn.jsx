import { useMutation } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router';
import { cleanAccessToken } from '../../accessToken';
import { USER_LOGOUT } from '../../queries';

const LogoutBtn = () => {
    const history = useHistory();
    const [logout, { client }] = useMutation(USER_LOGOUT);
    return (
        <button
            onClick={() => {
                // clean token
                logout();
                cleanAccessToken();
                // clean apollo cache
                client.resetStore();
                // redirect
                history.push('/');
            }}
        >
            LOGOUT
        </button>
    );
};

export default LogoutBtn;
