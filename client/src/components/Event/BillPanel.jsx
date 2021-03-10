import React, { useState } from 'react';
import AddBillFormDialog from '../Bill/AddBillFormDialog';
import BillDisplay from '../Bill/BillDisplay';
import SummaryBoard from '../Summary/SummaryBoard';
import PanelContainer from '../ContentContainers/PanelContainer';

import { Tabs, Tab, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons/';

import SummaryChartsPanel from '../Summary/SummaryChartsPanel';

export default function BillPanel() {
    const [tabIdx, setTabIdx] = useState(0);
    const [showAddBillForm, setShowAddBillForm] = useState(false);

    return (
        <>
            <PanelContainer style={{ height: '100vh' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Tabs
                        value={tabIdx}
                        onChange={(e, newIdx) => setTabIdx(newIdx)}
                        indicatorColor="primary"
                        aria-label="tabs"
                    >
                        <Tab label="bill Record" />
                        <Tab label="transition" />
                        <Tab label="summary" />
                    </Tabs>
                    <Button
                        color="primary"
                        onClick={() => setShowAddBillForm(true)}
                        data-testid="add-new-bill-btn"
                        startIcon={<Add />}
                    >
                        Add New Bills
                    </Button>
                </div>

                <div style={{ display: tabIdx === 0 ? 'block' : 'none' }}>
                    <BillDisplay />
                </div>
                <div style={{ display: tabIdx === 1 ? 'block' : 'none' }}>
                    <SummaryBoard />
                </div>
                {tabIdx === 2 && (
                    <div>
                        <SummaryChartsPanel />
                    </div>
                )}
            </PanelContainer>
            <AddBillFormDialog
                open={showAddBillForm}
                closeDialog={() => setShowAddBillForm(false)}
            />
        </>
    );
}
