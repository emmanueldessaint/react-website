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
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useState } from 'react';
import { Helmet } from "react-helmet";
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from "recoil";
import { previousUrl, account, idUser } from "../Shared/globalState";
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';


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
        opacity: "0.6",
        marginTop: 10,
    },
    buttonProgress: {
        color: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },

}));

const CustomButton = withStyles((theme) => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#413138',
        borderColor: '#413138',
        borderRadius: 5,
        border: '1px solid',
        opacity: 0.9,
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
            opacity: 0.9,
        },
    },
}))(Button);

export default function Connect(props) {

    window.scroll(0, 0);

    let history = useHistory();
    const classes = useStyles();
    const { pathname } = useLocation();

    const [email, setEmail] = useState('');
    const [errorInEmail, setErrorInEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [errorInPassword, setErrorInPassword] = useState(false);
    const [thisUrl, setThisUrl] = useRecoilState(previousUrl);
    const [accountName, setAccountName] = useRecoilState(account);
    const [id, setId] = useRecoilState(idUser);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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
        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }
        axios.post("http://localhost:8000/api/login ", {
            email: email,
            password: password
        }).then((res) => {
            setSuccess(true);
            setLoading(false);
            setAccountName(res.data.success.firstname);
            setId(res.data.success.id);

            localStorage.setItem(
                "loggin_Paris_Fabrics",
                JSON.stringify([{
                    name: res.data.success.firstname,
                    id: res.data.success.id,
                }])
            );

            if (thisUrl === "/signup" || thisUrl === "/" || thisUrl === "/catalog" || thisUrl === "/aboutus") {
                history.push("/");
            } else {
                setThisUrl("/Connect");
                history.goBack();
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const updatePrevious = () => {
        setThisUrl(pathname);
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
                                    style={{ letterSpacing: 1, wordSpacing: 2, }}
                                    disabled={loading}
                                    margin="normal">Connect {loading && <CircularProgress size={24} className={classes.buttonProgress} />}</CustomButton>
                                <div className={classes.greyLine}></div>
                                <h5 className="flexCenter grey6">Forgot your <Link to="/ForgotPassword" className="grey7 ml-1"> password ?</Link></h5>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h3>New customer ?</h3>
                            <Link to={{ pathname: "/signup", state: { from: pathname } }} className="item textDecorationNone">
                                <CustomButtonCreate
                                    className={classes.button}
                                    fullWidth
                                    style={{ letterSpacing: 1, wordSpacing: 2, }}
                                    onClick={updatePrevious}
                                    margin="normal"
                                    
                                >
                                    Create account 
                                </CustomButtonCreate>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}