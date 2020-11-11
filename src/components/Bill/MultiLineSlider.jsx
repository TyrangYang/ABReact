import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Grid, Slider, Input } from '@material-ui/core';
import { useUserName } from '../../hooks/useUserName';

import Dinero from 'dinero.js';

const throttle = (fn, delay) => {
    let timer = null;
    return (...args) => {
        if (timer !== null) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

function MultiLineSlider({ formParticipants, totalAmount, outGoingRes }) {
    const getUserById = useUserName();

    const total = Dinero({
        amount: +totalAmount * 100,
        currency: 'USD',
        precision: 2,
    });

    const [prevParticipantsNum, setPrevParticipantsNum] = useState(0);

    const [prevTotalAmount, setPrevTotalAmount] = useState(-10);

    const [inputValues, setInputValues] = useState(
        total
            .allocate(new Array(formParticipants.length).fill(1))
            .map((e) => e.toJSON().amount / 10 ** total.getPrecision())
    );

    if (
        prevParticipantsNum !== formParticipants.length ||
        prevTotalAmount !== totalAmount
    ) {
        setInputValues(
            total
                .allocate(new Array(formParticipants.length).fill(1))
                .map((e) => e.toJSON().amount / 10 ** total.getPrecision())
        );
        setPrevParticipantsNum(formParticipants.length);
        setPrevTotalAmount(totalAmount);
    }

    useEffect(() => {
        outGoingRes(inputValues);
    });

    const balanceSplitAmount = (changingIdx, newVal) => {
        let diff =
            inputValues.reduce((acc, cur, idx) => {
                if (idx === changingIdx) {
                    return acc + newVal;
                } else {
                    return acc + cur;
                }
            }, 0) - totalAmount;

        if (diff <= 0) {
            setInputValues(
                inputValues.map((each, i) =>
                    i === changingIdx ? newVal : each
                )
            );
        } else {
            setInputValues(
                inputValues.map((each, i) => {
                    if (i !== changingIdx) {
                        if (each >= diff) {
                            let res = each - diff;
                            diff = 0;
                            return res;
                        } else {
                            diff = diff - each;
                            return 0;
                        }
                    } else return newVal;
                })
            );
        }
    };

    return (
        <Grid container direction="column" style={{ alignItems: 'center' }}>
            {formParticipants.map((eachParticipants, idx) => (
                <Grid key={idx} container item xs spacing={2}>
                    <Grid item>{getUserById(eachParticipants)}</Grid>
                    <Grid item xs>
                        <Slider
                            value={inputValues[idx]}
                            onChange={throttle(
                                (e, newVal) => balanceSplitAmount(idx, +newVal),
                                50
                            )}
                            min={0}
                            max={+totalAmount}
                            // step={10 ** -total.getPrecision()}
                            valueLabelDisplay="auto"
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={inputValues[idx]}
                            onChange={(e) => {
                                e.target.value === ''
                                    ? balanceSplitAmount(idx, 0)
                                    : balanceSplitAmount(idx, +e.target.value);
                            }}
                            onBlur={(e) => {
                                if (+e.target.value < 0)
                                    balanceSplitAmount(idx, 0);
                                if (+e.target.value > totalAmount)
                                    balanceSplitAmount(idx, totalAmount);
                            }}
                            inputProps={{
                                // step: 10,
                                min: 0,
                                max: totalAmount,
                                type: 'number',
                                // 'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}

MultiLineSlider.propTypes = {
    formParticipants: PropTypes.array,
    totalAmount: PropTypes.number,
    outGoingRes: PropTypes.func,
};

export default React.memo(MultiLineSlider);
