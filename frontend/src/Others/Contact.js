import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import { useState, useEffect } from 'react';
import axios from 'axios';


const CustomButton = withStyles((theme) => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#413138',
        borderColor: '#413138',
        borderRadius: 0,
        border: '1px solid',
        '&:hover': {
            backgroundColor: '#ffffff',
            color: '#505050',
            border: '1px solid',
            borderColor: '#505050',
            fontWeight: '600',
        },
    },
}))(Button);

export default function Contact() {

    const [name, setName] = useState('');
    const [errorInName, setErrorInName] = useState(false);
    const [message, setMessage] = useState('');
    const [errorInMessage, setErrorInMessage] = useState(false);
    const [email, setEmail] = useState('');
    const [errorInMail, setErrorInMail] = useState(false);

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    const sendMessage = () => {
        let errorInForm = false
        if (email.length < 2) {
            setErrorInMail(true);
            errorInForm = true;
        } else {
            setErrorInMail(false);
        }
        if (name.length < 1) {
            setErrorInName(true);
            errorInForm = true;
        } else {
            setErrorInName(false);
        }
        if (message.length < 1) {
            setErrorInMessage(true);
            errorInForm = true;
        } else {
            setErrorInMessage(false);
        }
        
        if (errorInForm === true) {
            return;
        }
        var user = {};
        user.name = name;
        user.email = email;
        user.message = message;
        axios.post("https://parisfabrics.com/api/contact ", {
            userInfo: user,
        }).then((res) => {


        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="pt-13">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Contact - Paris Fabrics</title>
            </Helmet>
            <Grid container justifyContent="center" >
                <Grid item xs={11} sm={9} md={7}>
                    <Box>

                        <div className="grey7 mt-8">Contact us with the form below or send us an e-mail to contact@parisfabrics.com. We usually reply within 48h.</div>
                        <Grid item container spacing={3} >
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    label="Your name"
                                    onChange={(e) => setName(e.target.value)}
                                    error={errorInName}
                                    helperText={errorInName ? "You must enter your name !" : ""}
                                >
                                </TextField>
                            </Grid >
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    label="Your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={errorInMail}
                                    helperText={errorInMail ? "You must enter your email !" : ""}
                                >
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid>
                            <TextField
                                margin="normal"
                                variant="outlined"
                                multiline
                                rows="4"
                                fullWidth
                                label="Your message"
                                onChange={(e) => setMessage(e.target.value)}
                                error={errorInMessage}
                                helperText={errorInMessage ? "You must enter a message !" : ""}
                            >
                            </TextField>
                        </Grid>
                        <CustomButton
                            style={{ marginTop: "20px" }}
                            fullWidth
                            variant="contained"
                            margin="normal"
                            onClick={sendMessage}>Send message</CustomButton>
                    </Box>
                </Grid>
                {/* <Grid item container xs={11} sm={10} md={9} lg={8} spacing={2}>
                    <div className="mt-7 centerText size5 letterSpacing2">Contact</div>
                    <div className="mt-7">Contact us with the form below or send us an e-mail to contact@amazing-sewing.com. We usually reply within 48h.</div>
                    <Grid item container xs={12} spacing={2}>
                        <Grid xs={6}>
                            <TextField
                                label="name"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={6}>
                            <TextField
                                label="email"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Grid> */}
            </Grid>
        </div>
    )
}