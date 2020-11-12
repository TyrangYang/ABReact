import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import store from './app/store';

test('test all', () => {
    expect(1).toBe(1);
});
