import React from 'react';
import CustomContainer from './CustomContainer';
import UserBoard from './UserBoard/UserBoard';

export default function UserPanel() {
    return (
        <>
            <CustomContainer style={{ height: '100vh' }}>
                <UserBoard />
            </CustomContainer>
        </>
    );
}
