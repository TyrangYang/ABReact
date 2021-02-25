import React from 'react';
import UserMoneyStatusPieChart from './Charts/UserMoneyStatusPieChart';
import useSummary from '../../hooks/useBillSummary';

export default function SummaryChartsPanel() {
    const [, payerList, receiverList] = useSummary();

    return (
        <div>
            <UserMoneyStatusPieChart
                payerList={payerList}
                receiverList={receiverList}
            />
        </div>
    );
}
