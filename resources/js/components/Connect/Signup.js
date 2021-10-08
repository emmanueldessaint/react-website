import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
    
    "width":"80%",
    "margin-left":"auto",
    "margin-right":"auto",
    },
    button: {
        
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

export default function Signup(props) {

    const classes = useStyles();

    return (
        <div className={classes.marginTopBanner}>
            <Grid   >
                
                    <h2>Créer mon compte</h2>
                   
                        <Grid container spacing={4} >
                            <Grid item xs={6}>
                                <TextField 
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    label="Votre prénom"
                                >                                             
                                </TextField>
                            </Grid >  
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    label="Votre prénom"
                                >                        
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} >
                            <Grid item xs={6}>
                                <TextField 
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    label="Votre email"
                                >                                             
                                </TextField>
                            </Grid >  
                            <Grid container  item xs={6}>
                                <Grid item xs={4}>
                                    <TextField 
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        label="Votre email"
                                    >                                             
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField 
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        label="Votre email"
                                    >                                             
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField 
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        label="Votre email"
                                    >                                             
                                    </TextField>
                                </Grid>
                            </Grid >                            
                        </Grid> 
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <TextField     
                                    margin="normal"                                    
                                    variant="outlined"
                                    fullWidth
                                    label="Votre mot de passe"
                                >                                             
                                </TextField>
                            </Grid>
                        </Grid>   
                        <Grid className="pt-2">
                            <FormControlLabel control={<Checkbox />} label="I accept to receive the newsletters from amazingBikes" />                                                                                      
                        </Grid>
                        <Grid>
                            <FormControlLabel control={<Checkbox />} label="I accept the general conditions" /> 
                        </Grid>
                        <Grid className="pt-5" container spacing={4}>
                            <Grid item xs={12}>
                                <Button 
                                    margin="normal" 
                                    variant="contained" 
                                    fullWidth
                                >
                                    Create account
                                </Button>
                            </Grid>
                        </Grid>                                                                                        
                
            </Grid>
        </div>
    )
}

