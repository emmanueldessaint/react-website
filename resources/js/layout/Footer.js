import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

import Container from '@material-ui/core/Container';
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
  import logo from "../../assets/img/logo1.png";
  import '../App.css';
  import '../css/Footer.css';
  import YouTubeIcon from '@material-ui/icons/YouTube';

  const useStyles = makeStyles(theme => ({
    
    
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#ebf1f5',
  }));

export default function Footer() {

    const classes = useStyles();

    return (
        <div className="mt-10">
            <div className="width60">
                <Grid container spacing={2} className="menuQuality">
                    <Grid item sm={6} md={3} className={classes.alignTitle}>
                        <h4 className="flexCenter">Respect du terroir</h4>
                        <h5 className="flexCenter">De l'environnement et des traditions</h5>
                    </Grid>
                    <Grid item sm={6} md={3} className={classes.alignTitle} className="greyLineBorders">
                        <h4 className="flexCenter">Respect du terroir</h4>
                        <h5 className="flexCenter">De l'environnement et des traditions</h5>
                    </Grid>
                    <Grid item sm={6} md={3} className={classes.alignTitle} className="greyLineBorders">
                    <h4 className="flexCenter">Respect du terroir</h4>
                        <h5 className="flexCenter">De l'environnement et des traditions</h5>
                    </Grid>
                    <Grid item sm={6} md={3} className={classes.alignTitle}>
                    <h4 className="flexCenter">Respect du terroir</h4>
                        <h5 className="flexCenter">De l'environnement et des traditions</h5>
                    </Grid>
                </Grid>
            </div>
            <div className="backgroundFooter">
                <Container>
                <div className="flexCenter pt-5 mt-2">
                    <YouTubeIcon className="m-3"/>
                    <YouTubeIcon className="m-3"/>
                    <YouTubeIcon className="m-3"/>
                    <YouTubeIcon className="m-3"/>
                </div>
                <p className="widthP mt-4">  unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div></div>
                    <Grid container spacing={2} className="pt-4">
                        <Grid item md={3} xs={12} className={classes.alignTitle}>
                            <h1>AmazingBikes</h1>
                        </Grid>
                        <Grid item md={9} xs={12} container spacing={2}>
                            <Grid item md={3} xs={6}>
                                <h3>Amazing Bikes</h3>
                                <ul className="ulFooter">
                                    <li >6 rue de la Fontaine<br/>71150 Bouzeron</li>
                                    <li>+33 03 82 72 63 07</li>
                                    <li>reception@amzingbikes.com</li>
                                </ul>
                            </Grid>
                            <Grid item md={3} xs={6}>
                            <h3>A propos</h3>
                                <ul className="ulFooter">
                                    <li>6 rue de la Fontaine<br/>71150 Bouzeron</li>
                                    <li>+33 03 82 72 63 07</li>
                                    <li>reception@amzingbikes.com</li>
                                </ul>
                            </Grid>
                            <Grid item md={3} xs={6}>
                            
                                <ul className="ulFooter">
                                    <li>6 rue de la Fontaine<br/>71150 Bouzeron</li>
                                    <li>+33 03 82 72 63 07</li>
                                    <li>reception@amzingbikes.com</li>
                                </ul>
                            </Grid>
                            <Grid item md={3} xs={6}>
                            <h3>Vente privée et newsletter</h3>
                                <ul className="ulFooter">
                                    <li>Accédez aux ventes privées et restez<br/>informé des informations Chanzy</li>                                                                     
                                    <li>
                                        <TextField 
                                        className="inputFooter"
                                        placeholder=" Votre mail ..."
                                        /></li>
                                </ul>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

