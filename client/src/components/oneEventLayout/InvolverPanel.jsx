import React from 'react';
import PanelContainer from '../ContentContainers/PanelContainer';
import InvolverBoard from '../Involver/InvolverBoard';

export default function UserPanel() {
    return (
        <PanelContainer style={{ height: '100vh' }}>
            <InvolverBoard />
        </PanelContainer>
    );
}
