import { useState } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import axios from 'axios';

const CustomButton = withStyles((theme) => ({
    root: {
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
    },
}))(Button);
const CustomCheckbox = withStyles({
    root: {
        color: '#413138',
        '&$checked': {
            color: '#413138',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Signup(props) {

    window.scroll(0, 0);

    const [firstName, setFirstName] = useState('');
    const [errorInFirstName, setErrorInFirstName] = useState(false);
    const [lastName, setLastName] = useState('');
    const [errorInLastName, setErrorInLastName] = useState(false);
    const [email, setEmail] = useState('');
    const [errorInEmail, setErrorInEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [errorInPassword, setErrorInPassword] = useState(false);

    const SignupRequest = () => {
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
        if (errorInForm === true) {
            return;
        }
        var user = {};
        user.email = email;
        user.password = password;
        axios.post("https://parisfabrics.com/api/signup ", {
            userInfo: user,
        }).then((res) => {
           

        }).catch((err) => {
            console.log(err);
        })
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
                            label="Your Firstname"
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
                            label="Your Lastname"
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
                            label="Your email"
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
                            label="Your password"
                            error={errorInPassword}
                            helperText={errorInPassword ? "You must enter a password !" : ""}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="none"
                            type="password"
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={12} className="" style={{ marginTop: '-10px' }}>
                        <FormControlLabel control={<CustomCheckbox />} label="I accept to receive the newsletters from ParisFabrics" />
                    </Grid>
                    <Grid item xs={12} className="" style={{ marginTop: '-20px' }}>
                        <FormControlLabel control={<CustomCheckbox />} label="I accept the general conditions" />
                    </Grid>

                    <Grid item xs={12} className="pt-5" >
                        <CustomButton
                            margin="normal"
                            variant="contained"
                            fullWidth
                            style={{ letterSpacing: 1, wordSpacing: 2, }}
                            onClick={SignupRequest}
                        >
                            Create account
                        </CustomButton>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}