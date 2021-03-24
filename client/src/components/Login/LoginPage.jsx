import React from 'react';
import {
    TextField,
    Button,
    Container,
    Box,
    Grid,
    Avatar,
    makeStyles,
    CssBaseline,
    Link,
    Checkbox,
    FormControlLabel,
    Typography,
} from '@material-ui/core';
import { LockOpenOutlined } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form';

import { USER_LOGIN } from '../../queries';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const LoginPage = () => {
    const history = useHistory();
    const { handleSubmit, register, control } = useForm();
    const classes = useStyles();
    const [userLogin, { _data, _loading, error: loginError }] = useMutation(
        USER_LOGIN,
        {
            update(
                _cache,
                {
                    data: {
                        userLogin: { accessToken },
                    },
                }
            ) {
                // TODO: Store token
                localStorage.setItem('accessToken', accessToken);
            },
        }
    );

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(async ({ email, password }) => {
                        try {
                            await userLogin({
                                variables: { email, password },
                            });
                            // TODO: Store token

                            // history.push('/event');
                        } catch (error) {}
                    })}
                    noValidate
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={register}
                    />
                    {loginError && (
                        <Typography variant="subtitle2" color="error">
                            Email or password is incorrect
                        </Typography>
                    )}

                    <FormControlLabel
                        control={
                            <Controller
                                render={(props) => (
                                    <Checkbox
                                        onChange={(e) =>
                                            props.onChange(e.target.checked)
                                        }
                                        color="primary"
                                        checked={props.value}
                                    />
                                )}
                                control={control}
                                name="remember"
                                defaultValue={false}
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default LoginPage;
