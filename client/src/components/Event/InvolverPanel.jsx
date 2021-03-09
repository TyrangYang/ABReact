import React from 'react';
import PanelContainer from '../ContentContainers/PanelContainer';
import InvolverDisplay from '../Involver/InvolverDisplay';
import CreateNewInvolver from '../Involver/CreateNewInvolver';
import SelectInvolversToJoinEvent from '../Involver/SelectInvolversToJoinEvent';

import { useSelector } from 'react-redux';

export default function UserPanel() {
    const { currentEventID } = useSelector((state) => state.Event);
    const { currentUserID } = useSelector((state) => state.User);

    return (
        <PanelContainer style={{ height: '100vh' }}>
            {/* <CreateNewInvolver
                currentEventID={currentEventID}
                currentUserID={currentUserID}
            /> */}
            <SelectInvolversToJoinEvent
                currentEventID={currentEventID}
                currentUserID={currentUserID}
            />
            <InvolverDisplay currentEventID={currentEventID} />
        </PanelContainer>
    );
}
