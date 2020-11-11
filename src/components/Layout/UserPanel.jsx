import React from 'react';
import CustomContainer from '../ContentContainer/CustomContainer';
import UserBoard from '../User/UserBoard';

export default function UserPanel() {
    return (
        <CustomContainer style={{ height: '100vh' }}>
            <UserBoard />
        </CustomContainer>
    );
}
