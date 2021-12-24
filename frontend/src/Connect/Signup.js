import { useState, useEffect } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import axios from 'axios';
import '../css/Connect.css';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from "recoil";
import { previousUrl, account, idUser } from "../Shared/globalState";


const CustomCheckbox = withStyles({
    root: {
        color: '#413138',
        '&$checked': {
            color: '#413138',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({

    buttonProgress: {
        color: '#413138',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    defaultButton: {
        color: '#ffffff',
        backgroundColor: '#413138',
        borderColor: '#413138',
        borderRadius: 5,
        border: '1px solid',
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#505050',
            border: '1px solid',
            borderColor: '#505050',
            fontWeight: '600',
        },
    }
}));

export default function Signup() {

    let history = useHistory();
    const classes = useStyles();

    const [firstName, setFirstName] = useState('');
    const [errorInFirstName, setErrorInFirstName] = useState(false);
    const [lastName, setLastName] = useState('');
    const [errorInLastName, setErrorInLastName] = useState(false);
    const [email, setEmail] = useState('');
    const [errorInEmail, setErrorInEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [errorInPassword, setErrorInPassword] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorInRepeatPassword, setErrorInRepeatPassword] = useState(false);
    const [acceptConditions, setAcceptConditions] = useState(true);
    const [errorAcceptConditions, setErrorAcceptConditions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [thisUrl, setThisUrl] = useRecoilState(previousUrl);
    const [accountName, setAccountName] = useRecoilState(account);
    const [id, setId] = useRecoilState(idUser);
    const [alreadyConnected, setAlreadyConnected] = useState(false);
    const [errorSignup, setErrorSignup] = useState(false);

    const SignupRequest = () => {
        let errorInForm = false
        if (email.length < 2) {
            setErrorInEmail(true);
            errorInForm = true;
        } else {
            setErrorInEmail(false);
        }
        if (password.length < 5) {
            setErrorInPassword(true);
            errorInForm = true;
        } else {
            setErrorInPassword(false);
        }
        if (firstName.length < 2) {
            setErrorInFirstName(true);
            errorInForm = true;
        } else {
            setErrorInFirstName(false);
        }
        if (lastName.length < 2) {
            setErrorInLastName(true);
            errorInForm = true;
        } else {
            setErrorInLastName(false);
        }
        if (acceptConditions === false) {
            setErrorAcceptConditions(true);
            errorInForm = true;
        } else {
            setErrorAcceptConditions(false);
        }
        if (repeatPassword !== password) {
            setErrorInRepeatPassword(true);
            errorInForm = true;
        } else {
            setErrorInRepeatPassword(false);
        }

        if (errorInForm === true) {
            return;
        }
        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }



        axios.post("https://parisfabrics.com/api/register ", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            repeatPassword: password
        }).then((res) => {
            setSuccess(true);
            setLoading(false);
            setAccountName(firstName);
            setId(res.data.success.id);

            localStorage.setItem(
                "loggin_Paris_Fabrics",
                JSON.stringify([{
                    name: firstName,
                    id: res.data.success.id,
                }])
            );
            if (thisUrl === "/Connect") {
                history.push("/");
            } else {
                setThisUrl("/signup");
                history.goBack();
            }
        }).catch((err) => {
            console.log(err);
            setSuccess(true);
            setLoading(false);
            setErrorSignup(true);
        })
    }

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    const checkboxConditions = () => {
        setAcceptConditions(!acceptConditions)
    }

    return (
        <Container className="pt-15">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Signup - Paris Fabrics</title>
            </Helmet>
            <Grid justifyContent='center' container>
                <Grid container spacing={2} item xs={12} sm={10} md={8} >
                    <Grid item container>
                        <div className="mb-4 size3 grey7 bold600">Create my account</div>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Firstname"
                            error={errorInFirstName}
                            helperText={errorInFirstName ? "You must enter a firstname !" : ""}
                            onChange={(e) => setFirstName(e.target.value)}
                            margin="none"
                        >
                        </TextField>
                    </Grid >
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Lastname"
                            error={errorInLastName}
                            helperText={errorInLastName ? "You must enter a lastname !" : ""}
                            onChange={(e) => setLastName(e.target.value)}
                            margin="none"
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Email"
                            error={errorInEmail}
                            helperText={errorInEmail ? "You must enter an email !" : ""}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="none"
                        >
                        </TextField>
                    </Grid >
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            label="Password"
                            error={errorInPassword}
                            helperText={errorInPassword ? "your password must contain at least 6 characters !" : ""}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="none"
                            type="password"
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            label="Password confirmation"
                            error={errorInRepeatPassword}
                            helperText={errorInRepeatPassword ? "passwords are not the same !" : ""}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            margin="none"
                            type="password"
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} className="" style={{ marginTop: '-10px' }}>
                        <FormControlLabel control={<CustomCheckbox defaultChecked={true} />} label="I accept to receive the newsletters from ParisFabrics" />
                    </Grid>
                    <Grid item xs={12} className="" style={{ marginTop: '-20px' }}>
                        <FormControl required error={errorAcceptConditions}>
                            <FormControlLabel control={<CustomCheckbox checked={acceptConditions} onChange={checkboxConditions} />} label="I accept the general conditions" />
                            {errorAcceptConditions && <FormHelperText>You must accept the general conditions !</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className="pt-5" >
                    {errorSignup && <div className="flexCenter textRed opacity4 mb-2">Error, this email address is already in use !</div>}
                        <Button
                            margin="normal"
                            variant="contained"
                            className={classes.defaultButton}
                            fullWidth
                            style={{ letterSpacing: 1, wordSpacing: 2, }}
                            onClick={SignupRequest}
                            disabled={loading}
                            type="submit"
                        >
                            Create account {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}