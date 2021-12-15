import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";

const CustomButton = withStyles((theme) => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#292970',
        borderColor: '#413138',
        borderRadius: 40,
        border: '1px solid',
        height: '50px',
        wordSpacing: 1,
        letterSpacing: 1,
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

    return (
        <Container className="pt-13">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Forgot Password - Paris Fabrics</title>
            </Helmet>
             <Grid container justifyContent="center">
                    <Grid container spacing={2} item xs={12} sm={10} md={6}>
                    <Grid item xs={12} >
                        <h2>Forgot your password ?</h2>
                        <div className="grey6 mb--3">If you continue, ParisFabrics will send a message to this mail address. Click the link in the message and enter a new password on the page that opens.</div>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            label="Your email"
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <CustomButton
                            margin="normal"
                            variant="contained"
                            fullWidth
                        >
                            Send password reset email
                        </CustomButton>
                    </Grid>
                    
                </Grid>
            </Grid>

        </Container>
    )
}