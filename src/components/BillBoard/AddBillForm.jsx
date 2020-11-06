import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBill } from '../../slice/billSlice';

import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';

import {
    Button,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    MenuItem,
    TextField,
} from '@material-ui/core';
import Styles from './AddBillForm.module.css';

const AddBillForm = () => {
    const { allUsers } = useSelector((state) => state.Users);
    const dispatch = useDispatch();

    const { handleSubmit, register, errors, control } = useForm();

    const [showAddBillForm, setShowAddBillForm] = useState(false);
    return (
        <div>
            {!showAddBillForm ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowAddBillForm(true)}
                    data-testid="add-new-bill-btn"
                >
                    Add New Bill
                </Button>
            ) : (
                <form
                    data-testid="add-new-bill-form"
                    className={Styles.addBillForm}
                    onSubmit={handleSubmit((e) => {
                        dispatch(
                            addBill({
                                id: uuidV4(),
                                payer: e.payer,
                                amount: {
                                    amount: +e.amount * 100,
                                    currency: 'USD',
                                    precision: 2,
                                },
                                participants: e.participants,
                                date: e.date,
                            })
                        );
                        setShowAddBillForm(false);
                    })}
                >
                    {/* payer */}
                    <FormControl error={!!errors.payer}>
                        <InputLabel id="Payer_label"> Payer </InputLabel>
                        <Controller
                            as={
                                <Select labelId="Payer_label" value="">
                                    {allUsers.map((e) => (
                                        <MenuItem key={e.id} value={e.id}>
                                            {e.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            }
                            name="payer"
                            defaultValue=""
                            control={control}
                            rules={{ required: 'Select one payer' }}
                        />
                        <FormHelperText>
                            {!!errors.payer && errors.payer.message}
                        </FormHelperText>
                    </FormControl>

                    {/* amount */}
                    <TextField
                        data-testid="add-bill-amount"
                        label="Amount"
                        name="amount"
                        type="number"
                        inputProps={{ step: '0.01' }}
                        inputRef={register({
                            required: 'Need amount',
                            pattern: {
                                value: /^(\d{1,15}|\d{0,15}\.\d{1,2}|.)$/,
                                message: 'amount number not valid',
                            },
                        })}
                        error={!!errors.amount}
                        helperText={!!errors.amount && errors.amount.message}
                    />

                    {/* Participant */}
                    <FormControl error={!!errors.participants}>
                        <InputLabel id="test"> Participant(s) </InputLabel>
                        <Controller
                            as={
                                <Select multiple labelId="test">
                                    {allUsers.map((e) => (
                                        <MenuItem key={e.id} value={e.id}>
                                            {e.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            }
                            name="participants"
                            defaultValue={[]}
                            control={control}
                            rules={{
                                required: true,
                                validate: (value) =>
                                    value.length > 0 ||
                                    'At least one participant',
                            }}
                        />
                        <FormHelperText>
                            {!!errors.participants &&
                                errors.participants.message}
                        </FormHelperText>
                    </FormControl>

                    {/* dates */}
                    <TextField
                        label="date"
                        type="date"
                        inputRef={register({ required: 'date required' })}
                        name="date"
                        defaultValue={moment().format('YYYY-MM-DD')}
                        error={!!errors.date}
                        helperText={!!errors.date && errors.date.message}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        data-testid="submit-btn"
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowAddBillForm(false);
                        }}
                        data-testid="cancel-btn"
                    >
                        Cancel
                    </Button>
                </form>
            )}
        </div>
    );
};

export default AddBillForm;
