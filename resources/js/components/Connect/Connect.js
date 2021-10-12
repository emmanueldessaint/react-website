import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
// import AppBar from '@mui/material/AppBar';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { styled } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  const useStyles = makeStyles(theme => ({
    marginTopBanner: {
    "margin-top":"170px;",
    
    "width":"70%",
    "margin-left":"auto",
    "margin-right":"auto",
    },
    button: {
        "margin-top":"30px",
        // height:50,
    },
    greyLine: {
        height:1,
        "width":"99%",
        "margin-left":"auto",
        "margin-right":"auto",
        "background-color":"grey",
        marginTop:10,
    },
    forgotPassword: {
        "display":"flex",
        "justify-content":"center",

    }
    
}));

export default function Connect(props) {

    const classes = useStyles();

    return (
        <div className={classes.marginTopBanner}>
            <Grid container justifyContent="center" spacing={8}>
                <Grid item  xs={12} sm={6}>
                    <Box
                    >
                        <h3>Deja client?</h3>
                        <TextField
                        margin="normal"
                        className={classes.textField}
                        fullWidth
                        label="Votre adresse mail"
                        
                        ></TextField>

                        <TextField
                        margin="normal"
                        
                        fullWidth
                        label="Votre mot de passe"
                        ></TextField>

                        <Button 
                        className={classes.button}
                        fullWidth 
                        variant="contained"
                        margin="normal">Se Connecter</Button>
                        <div className={classes.greyLine}></div>
                        <h5 classNmae={classes.forgotPassword}>Ou vous avez oublié votre mot de passe ?</h5>


                    </Box>
                </Grid>
                <Grid item  xs={12} sm={6}>
                    <h3>Nouveau Client ?</h3>
                    

                    <Link to="/signup" className="item" className={classes.routerDecoration}>
                        
                    
                        <Button 
                            className={classes.button}
                            fullWidth 
                            variant="contained"
                            margin="normal">Créer un compte
                        </Button>
                    </Link>
                </Grid>

            </Grid>
        </div>
    )
}

