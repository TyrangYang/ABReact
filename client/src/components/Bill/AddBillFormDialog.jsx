import React, { useState, useContext, useMemo } from 'react';
import { eventStore } from '../Event/EventContextProvider';
import {
    GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID,
    CREATE_NEW_BILL_TO_EVENT,
    GET_BILLS_BY_EVENT_ID,
} from '../../queries';
import { useQuery, useMutation } from '@apollo/client';

import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';

import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    FormHelperText,
    TextField,
    Select,
    MenuItem,
    Switch,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';
import Styles from './AddBillFormDialog.module.css';
import MultiLineSlider from './MultiLineSlider';
import HoverHelpWidget from '../widgets/HoverHelpWidget';

const AddBillForm = ({ open, closeDialog }) => {
    const {
        state: { currentEventID },
    } = useContext(eventStore);

    const { data, loading, error } = useQuery(
        GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID,
        {
            variables: { eventID: currentEventID },
        }
    );

    const [addNewBill] = useMutation(CREATE_NEW_BILL_TO_EVENT, {
        update: (cache, { data: { addNewBillToEvent: curItem } }) => {
            const { getBillsInEvent: prevList } = cache.readQuery({
                query: GET_BILLS_BY_EVENT_ID,
                variables: { eventID: currentEventID },
            });

            cache.writeQuery({
                query: GET_BILLS_BY_EVENT_ID,
                variables: { eventID: currentEventID },
                data: {
                    getBillsInEvent: [...prevList, curItem],
                },
            });
        },
    });

    const allInvolvers = useMemo(() => {
        if (loading || error) return [];
        else return data?.getInvolversInEvent;
    }, [data, loading, error]);

    // handle form
    const { handleSubmit, register, watch, errors, control } = useForm();

    // Watch variables those needed in evenly split on real-time
    const showUnevenlySplit = watch('unevenly');
    const formParticipants = watch('participants', []);
    const formAmount = watch('amount', 0);

    const [unevenlyRes, setUnevenlyRes] = useState([]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="add-Bill"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="add-Bill">
                    ADD NEW BILL
                    <HoverHelpWidget
                        messageOnHover={
                            <div>
                                <p>Payer is who actual spend the money</p>
                                <p>Participant(s) are those split this bill</p>
                                <p>Do not forgot yourself</p>
                            </div>
                        }
                    />
                </DialogTitle>
                <DialogContent>
                    <form
                        data-testid="add-new-bill-form"
                        id="add-bill-form"
                        className={Styles.addBillForm}
                        onSubmit={handleSubmit((e) => {
                            if (!e.unevenly) {
                                addNewBill({
                                    variables: {
                                        eventID: currentEventID,
                                        payerID: e.payer.id,
                                        participantsID: e.participants.map(
                                            (e) => e.id
                                        ),
                                        amount: {
                                            amount: +e.amount * 100,
                                            currency: 'USD',
                                            precision: 2,
                                        },
                                        date: e.date,
                                    },
                                });
                            } else {
                                unevenlyRes.forEach((each) => {
                                    addNewBill({
                                        variables: {
                                            eventID: currentEventID,
                                            payerID: e.payer.id,
                                            participantsID: [each.id],
                                            amount: {
                                                amount: +each.amount * 100,
                                                currency: 'USD',
                                                precision: 2,
                                            },
                                            date: e.date,
                                        },
                                    });
                                });
                            }
                            closeDialog();
                        })}
                    >
                        <FormControl error={!!errors.payer}>
                            <InputLabel id="Payer_label">Payer</InputLabel>
                            <Controller
                                as={
                                    <Select labelId="Payer_label" value="">
                                        {allInvolvers.map((e) => (
                                            <MenuItem key={e.id} value={e}>
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
                            helperText={
                                !!errors.amount && errors.amount.message
                            }
                        />

                        <FormControl error={!!errors.participants}>
                            <InputLabel id="test"> Participant(s) </InputLabel>
                            <Controller
                                as={
                                    <Select multiple labelId="test">
                                        {allInvolvers.map((e) => (
                                            <MenuItem key={e.id} value={e}>
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

                        <TextField
                            label="date"
                            type="date"
                            inputRef={register({ required: 'date required' })}
                            name="date"
                            defaultValue={moment().format('YYYY-MM-DD')}
                            error={!!errors.date}
                            helperText={!!errors.date && errors.date.message}
                        />

                        <FormControlLabel
                            labelPlacement="start"
                            label="Unevenly split"
                            control={
                                <Controller
                                    render={(props) => (
                                        <Switch
                                            checked={props.value}
                                            onChange={(e) =>
                                                props.onChange(e.target.checked)
                                            }
                                            color="primary"
                                            aria-labelledby="open-unevenly"
                                        />
                                    )}
                                    name="unevenly"
                                    defaultValue={false}
                                    control={control}
                                />
                            }
                        />

                        {showUnevenlySplit &&
                            !!formParticipants.length &&
                            !!formAmount && (
                                <MultiLineSlider
                                    formParticipants={formParticipants}
                                    totalAmount={+formAmount}
                                    outGoingRes={setUnevenlyRes}
                                />
                            )}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={closeDialog}
                        data-testid="cancel-btn"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        type="submit"
                        form="add-bill-form"
                        data-testid="submit-btn"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddBillForm;
