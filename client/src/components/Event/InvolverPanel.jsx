import React, { useState } from 'react';
import PanelContainer from '../ContentContainers/PanelContainer';
import InvolverDisplay from '../Involver/InvolverDisplay';
import SelectInvolversToJoinEvent from '../Involver/SelectInvolversToJoinEventDialog';
import { Button } from '@material-ui/core';
import { PersonAddOutlined } from '@material-ui/icons';

export default function InvolverPanel() {
    const [showDialog, setShowDialog] = useState(false);
    return (
        <PanelContainer style={{ height: '100vh' }}>
            {/* <CreateNewInvolver
            /> */}
            <Button
                color="primary"
                onClick={() => {
                    setShowDialog(true);
                }}
                startIcon={<PersonAddOutlined />}
            >
                Add New Involver
            </Button>
            <SelectInvolversToJoinEvent
                open={showDialog}
                closeDialog={() => setShowDialog(false)}
            />
            <InvolverDisplay />
        </PanelContainer>
    );
}
