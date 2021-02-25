import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Dinero from 'dinero.js';

const useBillSummary = () => {
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

    const [payerList, receiverList] = useMemo(() => {
        let record = {};

        for (let each of summary) {
            record[each.from] = 0;
            record[each.to] = 0;
        }

        for (let each of summary) {
            if (each.amount.getAmount() > 0) {
                record[each.from] -= each.amount.getAmount();
                record[each.to] += each.amount.getAmount();
            } else {
                // < 0 (not == 0)
                record[each.from] += each.amount.getAmount();
                record[each.to] -= each.amount.getAmount();
            }
        }

        let payerList = [],
            receiverList = [];
        for (let each in record) {
            if (record[each] < 0) {
                payerList.push([each, record[each]]);
            } else if (record[each] > 0) {
                receiverList.push([each, record[each]]);
            } else {
                // record[each] == 0
                continue;
            }
        }
        // sort two list
        payerList.sort((a, b) => a[1] - b[1]);
        receiverList.sort((a, b) => b[1] - a[1]);

        return [payerList, receiverList];
    }, [summary]);

    return [summary, payerList, receiverList];
};

export default useBillSummary;
