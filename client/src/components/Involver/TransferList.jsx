import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CreateNewInvolverDialog from './CreateNewInvolverDialog';
import { PersonAdd } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 300,
        height: 400,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 2),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function TransferList(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setLeft(props.left.map((e) => ({ ...e, disabled: true })));
        setRight(props.right.map((e) => ({ ...e, disabled: false })));
    }, [props.left, props.right]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;
    const notDisableChecked = (items) => items.filter((e) => !e.disabled);

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === notDisableChecked(items).length) {
            setChecked(not(checked, notDisableChecked(items)));
        } else {
            setChecked(union(checked, notDisableChecked(items)));
        }
    };

    const handleCheckedRight = () => {
        props.setCandidate((prev) => not(prev, leftChecked));
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        props.setCandidate((prev) => prev.concat(rightChecked));
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };
    const customList = (title, items, isRightBox) => (
        <Card>
            {isRightBox && showDialog && (
                <CreateNewInvolverDialog
                    open={showDialog}
                    closeDialog={() => {
                        setShowDialog(false);
                    }}
                />
            )}
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={
                            numberOfChecked(items) ===
                                notDisableChecked(items).length &&
                            notDisableChecked(items).length !== 0
                        }
                        indeterminate={
                            numberOfChecked(items) !==
                                notDisableChecked(items).length &&
                            numberOfChecked(items) !== 0
                        }
                        disabled={notDisableChecked(items).length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${
                    notDisableChecked(items).length
                } selected`}
            />
            <Divider />

            <List className={classes.list} dense component="div" role="list">
                {isRightBox && (
                    <ListItem button onClick={() => setShowDialog(true)}>
                        <ListItemIcon>
                            <PersonAdd />
                        </ListItemIcon>
                        <ListItemText>Create New Involver</ListItemText>
                    </ListItem>
                )}
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value.id}-label`;
                    return (
                        <ListItem
                            key={value.id}
                            role="listitem"
                            button={!value.disabled}
                            onClick={
                                !value.disabled ? handleToggle(value) : () => {}
                            }
                        >
                            <ListItemIcon>
                                <Checkbox
                                    indeterminate={value.disabled}
                                    disabled={value.disabled}
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name} />
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );

    return (
        <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid item>{customList('Joined in Event', left, false)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="medium"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="medium"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList('CANDIDATE', right, true)}</Grid>
        </Grid>
    );
}
