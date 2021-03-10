import React, { useState } from 'react';

import Dinero from 'dinero.js';
import SummaryDisplay from './SummaryDisplay';

import { TextField, MenuItem, Checkbox } from '@material-ui/core';
import styles from './SummaryBoard.module.css';

import useSummary from '../../hooks/useBillSummary';

// compose(f1, f2, f3)(val) === f3(f2(f1(val)))
const compose = (...fn) =>
    fn.reduce(
        (acc, cur) => (...args) => cur(acc(...args)),
        (val) => val
    );

const SummaryBoard = () => {
    const [summary, payerList, receiverList] = useSummary();

    const [merged, setMerged] = useState(false);
    const [sortState, setSortState] = useState(0);

    const sortSummary = (oriSummary) => {
        if (sortState === 0) {
            oriSummary.sort((a, b) => {
                if (a.from.id < b.from.id) return -1;
                else return 1;
            });
        }
        if (sortState === 1) {
            oriSummary.sort((a, b) => {
                if (a.to.id < b.to.id) return -1;
                else return 1;
            });
        }
        if (sortState === 2) {
            oriSummary.sort(
                (a, b) => a.amount.getAmount() - b.amount.getAmount()
            );
        }
        if (sortState === 3) {
            oriSummary.sort(
                (a, b) => b.amount.getAmount() - a.amount.getAmount()
            );
        }
        return [...oriSummary];
    };
    const mergeSummary = (oriSummary) => {
        if (!merged) {
            return oriSummary;
        }

        // Greedy method to calculate a relative less transaction
        let res = [];
        let payerListCopy = payerList.map((e) => ({ ...e })),
            receiverListCopy = receiverList.map((e) => ({ ...e }));
        while (payerListCopy.length !== 0) {
            let curPayer = payerListCopy.pop();
            while (curPayer.amount !== 0) {
                // current payer still need pay somebody
                let curReceiver = receiverListCopy.pop();
                if (curReceiver.amount <= Math.abs(curPayer.amount)) {
                    res.push({
                        from: curPayer.involver,
                        to: curReceiver.involver,
                        amount: Dinero({ amount: curReceiver.amount }),
                    });
                    curPayer.amount += curReceiver.amount;
                } else {
                    res.push({
                        from: curPayer.involver,
                        to: curReceiver.involver,
                        amount: Dinero({ amount: 0 - curPayer.amount }),
                    });
                    curReceiver.amount -= Math.abs(curPayer.amount);
                    curPayer.amount = 0;
                    receiverListCopy.push(curReceiver);
                }
            }
        }
        return res;
    };

    //compose filter function
    const filterFns = compose(mergeSummary, sortSummary);
    return (
        <div>
            {/* tool bar */}
            <div className={styles.tools}>
                <TextField
                    select
                    value={sortState}
                    onChange={(e) => {
                        setSortState(e.target.value);
                    }}
                    label="Arrangement"
                >
                    <MenuItem value={0}>Group By Payer</MenuItem>
                    <MenuItem value={1}>Group By Receiver</MenuItem>
                    <MenuItem value={2}>Amount Increasing</MenuItem>
                    <MenuItem value={3}>Amount Decreasing</MenuItem>
                </TextField>
                <div className={styles.switchGroup}>
                    <Checkbox
                        checked={merged}
                        onChange={(e) => {
                            setMerged(e.target.checked);
                        }}
                        color="primary"
                        name="Merge"
                    />
                    <span>Merged Bills Summary</span>
                </div>
            </div>

            <SummaryDisplay summary={filterFns(summary)} merged={merged} />
        </div>
    );
};

export default SummaryBoard;
