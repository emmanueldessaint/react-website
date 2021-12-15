import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import {
    Link
} from "react-router-dom";
import Container from '@material-ui/core/Container';
import {withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useState } from 'react';
import { Helmet } from "react-helmet";

const useStyles = makeStyles(theme => ({
    marginTopBanner: {
        "margin-top": "170px;",
        "width": "70%",
        "margin-left": "auto",
        "margin-right": "auto",
    },
    button: {
        "margin-top": "30px",
    },
    greyLine: {
        height: 1,
        "width": "99%",
        "margin-left": "auto",
        "margin-right": "auto",
        "background-color": "grey",
        marginTop: 10,
    },
    forgotPassword: {
        "display": "flex",
        "justify-content": "center",
    }
}));

const CustomButton = withStyles((theme) => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#413138',
        borderColor: '#413138',
        borderRadius: 5,
        border: '1px solid',
        opacity:0.9,
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#505050',
            border: '1px solid',
            borderColor: '#505050',
            fontWeight: '600',
        },
    },
}))(Button);

const CustomButtonCreate = withStyles((theme) => ({
    root: {
        color: '#413138',
        backgroundColor: 'transparent',
        borderColor: '#413138',
        borderRadius: 5,
        border: '1px solid',
        '&:hover': {
            backgroundColor: '#413138',
            color: '#ffffff',
            border: '1px solid',
            borderColor: '#505050',
            fontWeight: '600',
            opacity:0.9,
        },
    },
}))(Button);

export default function Connect(props) {

    window.scroll(0, 0);

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [errorInEmail, setErrorInEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [errorInPassword, setErrorInPassword] = useState(false);

    const connectRequest = () => {
        let errorInForm = false
        if (email.length < 2) {
            setErrorInEmail(true);
            errorInForm = true;
        } else {
            setErrorInEmail(false);
        }
        if (password.length < 2) {
            setErrorInPassword(true);
            errorInForm = true;
        } else {
            setErrorInPassword(false);
        }
        if (errorInForm === true) {
            return;
        }
        var user = {};
        user.email = email;
        user.password = password;
        axios.post("https://parisfabrics.com/api/connect ", {
            userInfo: user,
        }).then((res) => {
           

        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="pt-13">
            <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Connect - Paris Fabrics</title>
            </Helmet>
                <Grid container justifyContent="center">
                    <Grid container justifyContent="center" spacing={8} item xs={11} sm={12} md={11}>
                        <Grid item xs={12} sm={6}>
                            <Box>
                                <h3>Already customer ?</h3>
                                <TextField
                                    margin="normal"
                                    className={classes.textField}
                                    fullWidth
                                    label="Your email"
                                    error={errorInEmail}
                                    helperText={errorInEmail ? "You must enter an email !" : ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></TextField>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Your password"
                                    error={errorInPassword}
                                    helperText={errorInPassword ? "You must enter a password !" : ""}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                ></TextField>
                                <CustomButton
                                    className={classes.button}
                                    fullWidth
                                    onClick={connectRequest}
                                    style={{letterSpacing:1, wordSpacing:2,}}
                                    margin="normal">Connect</CustomButton>
                                <div className={classes.greyLine}></div>
                                <h5 className={classes.forgotPassword}>Forgot your <Link to="/ForgotPassword" className="grey9 ml-1"> password ?</Link></h5>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h3>New customer ?</h3>
                            <Link to="/signup" className="item textDecorationNone">
                                <CustomButtonCreate
                                    className={classes.button}
                                    fullWidth
                                    style={{letterSpacing:1, wordSpacing:2,}}
                                    margin="normal">Create account
                                </CustomButtonCreate>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}