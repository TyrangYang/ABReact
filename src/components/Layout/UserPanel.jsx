import React from 'react';
import PanelContainer from '../ContentContainers/PanelContainer';
import UserBoard from '../User/UserBoard';

export default function UserPanel() {
    return (
        <PanelContainer style={{ height: '100vh' }}>
            <UserBoard />
        </PanelContainer>
    );
}
