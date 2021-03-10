import { useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BILLS_BY_EVENT_ID } from '../queries';

import { eventStore } from '../components/Event/EventContextProvider';

import Dinero from 'dinero.js';

const useBillSummary = () => {
    const {
        state: { currentEventID },
    } = useContext(eventStore);

    const { data, loading, error } = useQuery(GET_BILLS_BY_EVENT_ID, {
        variables: { eventID: currentEventID },
    });

    const allBills = useMemo(() => {
        if (loading || error) return [];
        return data?.getBillsInEvent;
    }, [loading, error, data]);

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
                    if (from.id === to.id) continue;
                    if (from.id < to.id) {
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
            record[each.from.id] = { involver: each.from, amount: 0 };
            record[each.to.id] = { involver: each.to, amount: 0 };
        }

        for (let each of summary) {
            if (each.amount.getAmount() > 0) {
                record[each.from.id].amount -= each.amount.getAmount();
                record[each.to.id].amount += each.amount.getAmount();
            } else {
                // < 0 (not == 0)
                record[each.from.id].amount += each.amount.getAmount();
                record[each.to.id].amount -= each.amount.getAmount();
            }
        }

        let payerList = [],
            receiverList = [];
        for (let each in record) {
            if (record[each].amount < 0) {
                payerList.push(record[each]);
            } else if (record[each].amount > 0) {
                receiverList.push(record[each]);
            } else {
                // record[each] == 0
                continue;
            }
        }
        // sort two list
        payerList.sort((a, b) => a.amount - b.amount);
        receiverList.sort((a, b) => b.amount - a.amount);

        return [payerList, receiverList];
    }, [summary]);

    return [summary, payerList, receiverList];
};

export default useBillSummary;
