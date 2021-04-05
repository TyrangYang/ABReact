import React, { memo } from 'react';
import propTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

function DataLoading({ loading, error }) {
    return (
        <div>
            <h2>Loading</h2>
            <CircularProgress color="primary" />
            {!loading && error && (
                <div>
                    <h2>Error happen!! Please waite</h2>
                    <p>ERROR:{error.message}</p>
                </div>
            )}
        </div>
    );
}

DataLoading.prototype = {
    loading: propTypes.bool.isRequired,
    error: propTypes.object,
};

export default memo(DataLoading);
