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
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import logo from "../../assets/img/logo1.png";
import creditCard from "../../assets/img/creditCard1.png";
import delivery from "../../assets/img/delivery2.jpg";
import trackPackage from "../../assets/img/trackPackage1.png";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import '../App.css';
import '../css/Footer.css';
import YouTubeIcon from '@material-ui/icons/YouTube';
import '../../assets/css/fonts.css';
import SendIcon from '@material-ui/icons/Send';

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
        <div className="pt-10 generalBackground">
            <div className=" backgroundFooterItems">
                <Grid container justifyContent="center" >
                    <Grid spacing={2} container item xs={12} sm={11} md={9}>
                        <Grid className="textAlignCenter" item xs={12} sm={6} md={3} >
                            <div className="heightIconsFooter "><img src={creditCard} className="iconsFooter pt-4"/></div>
                            <span className="grey2 font6 size2">SECURE PAYMENT</span>
                            <h5>With credit card or Paypal</h5>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className="greyLineBorders textAlignCenter">
                            <div className="heightIconsFooter "><img src={trackPackage} className="iconsFooterTrack pt-4"/></div>                  
                            <span className="grey2 font6 size2">SATISFIED OR REFUNDED</span>
                            <h5>7 days from time of delivery</h5>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className="greyLineBorders textAlignCenter">
                            <div className="heightIconsFooter pt-4"><LocalShippingIcon className="iconsFooter"/></div>                  
                            <span className="grey2 font6 size2">FREE SHIPPING</span>
                            <h5>From 40$ of purchases</h5>
                        </Grid>
                        <Grid className="textAlignCenter" item xs={12} sm={6} md={3} >
                            <div className="heightIconsFooter pt-4"><LiveHelpIcon className="iconsFooter"/></div>
                            <span className="grey2 font6 size2">RESPONSIVE CUSTOMER SERVICE</span>
                            <h5>Guaranteed response within 24 hours</h5>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className="backgroundFooter ">
                <Container>
                    <Grid container justifyContent="center" className="menuQuality pt-5">
                        <Grid container item xs={12} md={11} lg={10} >

                            <Grid container justifyContent="center" item xs={12} md={5}>
                                <div className="flexCenter pt-5 mt-2">
                                    <YouTubeIcon className="m-3" />
                                    <YouTubeIcon className="m-3" />
                                    <YouTubeIcon className="m-3" />
                                    <YouTubeIcon className="m-3" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={7} container justifyContent="center" >
                                <Grid item xs={11} md={12}  >
                                    <div className="widthP mt-4">
                                        <p>unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" className="menuQuality pb-5">
                        <Grid container item xs={12} md={11} lg={10} className="mt-7">
                            <Grid item className="pt-5" container justifyContent="center" md={12} lg={8}>
                                <Grid className="flexCenter" item md={4} sm={6} xs={12}>
                                    <div className="widthItemsFooter">
                                        <h3>Amazing Sewing</h3>
                                        <div>5 rue des oiseaux</div>
                                        <div>27220 Fresney</div>
                                        <div>contact@amazingsewing.com</div>
                                    </div>
                                </Grid>
                                <Grid className="flexCenter" item md={4} sm={6} xs={12}>
                                    <div className="widthItemsFooter">
                                        <h3>About us</h3>
                                        <div>Who are we ?</div>
                                        <div>Our corporate values</div>
                                        <div>Guaranty and return</div>
                                    </div>
                                </Grid>

                                <Grid className="flexCenter" item md={4} sm={6} xs={12}>
                                    <div className="widthItemsFooter">
                                        <h3>Privates sales and newsletter</h3>

                                        <div>Access privates sales and stay<br />up to date with AmazingSewing news</div>
                                        <div className="flexCenter mt-4">
                                            <TextField
                                                className="inputFooter"
                                                placeholder=" Your email ..."
                                            />
                                            <button className="buttonSendNewsletters font8"><SendIcon /></button>
                                            </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item className="pt-5 verticalAlign" container justifyContent="center" md={12} lg={4}>
                                <h1 className="verticalAlign">AmazingSewing</h1>
                            </Grid>
                        </Grid>
                    </Grid>

                </Container>
            </div>
        </div>
    )
}

