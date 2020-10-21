import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dinero from 'dinero.js';

import { useUserName } from '../../hooks/useUserName';

const SummaryBoard = () => {
    const { allBills } = useSelector((state) => state.Bills);

    const summary = useMemo(() => {
        let m = new Map();
        for (let bill of allBills) {
            let oriCurrency = Dinero(bill.amount);
            let allocate = oriCurrency.allocate(
                Array(bill.participants.length).fill(1)
            );
            for (let i = 0, len = bill.participants.length; i < len; ++i) {
                if (bill.participants[i] !== bill.payer) {
                    let from = bill.participants[i],
                        to = bill.payer,
                        amount = allocate[i],
                        key = '';
                    if (from < to) {
                        key = JSON.stringify([from, to]);
                    } else {
                        key = JSON.stringify([to, from]);
                        amount = Dinero({ amount: 0 }).subtract(amount);
                    }
                    if (!m.has(key)) m.set(key, amount);
                    else {
                        m.set(key, m.get(key).add(amount));
                    }
                }
            }

            // m.forEach((val, key) => {
            //     console.log(key, val.getAmount());
            // });
        }
        // analysis map
        let res = [];
        m.forEach((val, key) => {
            let [from, to] = JSON.parse(key);
            if (val.getAmount() > 0) {
                res.push({
                    from,
                    to,
                    amount: val,
                });
            } else if (val.getAmount() === 0) {
                return;
            } else {
                res.push({
                    from: to,
                    to: from,
                    amount: Dinero({ amount: 0 }).subtract(val),
                });
            }
        });

        return res;
    }, [allBills]);
    const idNameMap = useUserName();
    summary.forEach((e) => {
        console.log(idNameMap(e.from), idNameMap(e.to), e.amount.getAmount());
    });
    return <div></div>;
};

export default React.memo(SummaryBoard);
