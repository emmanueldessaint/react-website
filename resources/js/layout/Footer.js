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
  import '../../assets/css/fonts.css';

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
            <div className=" backgroundFooterItems">
                <Grid container justifyContent="center" >
                    <Grid container xs={12} sm={11} md={9}>
                        <Grid item sm={6} md={3} className={classes.alignTitle}>
                            <h4 className="flexCenter">SECURE PAYMENT</h4>
                            <h5 className="flexCenter">With credit card or Paypal</h5>
                        </Grid>
                        <Grid item sm={6} md={3} className={classes.alignTitle} className="greyLineBorders">
                            <h4 className="flexCenter">SATISFIED OR REFUNDED</h4>
                            <h5 className="flexCenter">7 days from time of delivery</h5>
                        </Grid>
                        <Grid item sm={6} md={3} className={classes.alignTitle} className="greyLineBorders">
                        <h4 className="flexCenter">FREE SHIPPING</h4>
                            <h5 className="flexCenter">From 40$ of purchases</h5>
                        </Grid>
                        <Grid item sm={6} md={3} className={classes.alignTitle}>
                        <h4 className="flexCenter">RESPONSIVE CUSTOMER SERVICE</h4>
                            <h5 className="flexCenter">Guaranteed response within 24 hours</h5>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className="backgroundFooter ">
                <Container>
                    <Grid container justifyContent="center" className="menuQuality">
                        <Grid container xs={12} md={10} className="mt-7">
                            <div className="flexCenter pt-5 mt-2">
                                <YouTubeIcon className="m-3"/>
                                <YouTubeIcon className="m-3"/>
                                <YouTubeIcon className="m-3"/>
                                <YouTubeIcon className="m-3"/>
                            </div>
                            <div className="widthP mt-4">  unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                
                            <Grid container spacing={2} className="pt-10">
                            
                                <Grid item md={9} xs={12} container spacing={2} >
                                    <Grid item md={3} xs={6}>
                                        <h3>Amazing Sewing</h3>
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
                                <Grid item md={3} xs={12} className={classes.alignTitle}>
                                    <h1>AmazingBikes</h1>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

