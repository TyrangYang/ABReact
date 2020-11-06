import React, { useState } from 'react';
import AddBillForm from './BillBoard/AddBillForm';
import BillDisplay from './BillBoard/BillDisplay';
import SummaryBoard from './Summary/SummaryBoard';
import { Tabs, Tab, Switch } from '@material-ui/core';

import PieChart from './Summary/Charts/UserMoneyStatusPieChart';
import useSummary from '../hooks/useSummary';

export default function BillPanel() {
    const [showChart, setShowChart] = useState(false);
    const [_, payerList, receiverList] = useSummary();

    const [tabIdx, setTabIdx] = useState(0);

    return (
        <div>
            <AddBillForm />
            <Tabs
                value={tabIdx}
                onChange={(e, newIdx) => setTabIdx(newIdx)}
                indicatorColor="primary"
                variant="scrollable"
                aria-label="tabs"
                centered
            >
                <Tab label="bill Record" />
                <Tab label="transition" />
                <Tab label="summary" />
            </Tabs>
            <div style={{ display: tabIdx === 0 ? 'block' : 'none' }}>
                <BillDisplay />
            </div>
            <div style={{ display: tabIdx === 1 ? 'block' : 'none' }}>
                <SummaryBoard />
            </div>
            {tabIdx === 2 && (
                <div>
                    <Switch
                        checked={showChart}
                        onChange={(e) => {
                            setShowChart(e.target.checked);
                        }}
                        color="primary"
                        name="show-chart"
                    />
                    {showChart && (
                        <PieChart
                            payerList={payerList}
                            receiverList={receiverList}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
