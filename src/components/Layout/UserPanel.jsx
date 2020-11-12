import React from 'react';
import LayoutContainer from '../ContentContainer/LayoutContainer';
import UserBoard from '../User/UserBoard';

export default function UserPanel() {
    return (
        <LayoutContainer style={{ height: '100vh' }}>
            <UserBoard />
        </LayoutContainer>
    );
}
