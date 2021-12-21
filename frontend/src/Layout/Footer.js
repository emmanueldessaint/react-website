import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import { Link } from "react-router-dom";
import creditCard from "../assets/img/creditCard1.png";
import MoodIcon from '@material-ui/icons/Mood';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import '../App.css';
import '../css/Footer.css';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useRecoilValue } from 'recoil';
import { currentPageProduct } from '../Shared/globalState';
import { InsertEmoticon } from '@material-ui/icons';
import { useState } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default function Footer() {

    const setActuelPage = useRecoilValue(currentPageProduct);
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);

    const resetPage = () => {
        setActuelPage(1);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const addUserNewsletter = () => {
        axios.post("https://parisfabrics.com/api/subscribe ", {
            userInfo: email,
        }).then((res) => {
            setOpen(true)
            console.log('testestetst')
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="pt-10 generalBackground">
            <div className=" backgroundFooterItems bgBlue">
                <Grid container justifyContent="center" >
                    <Grid spacing={2} container item xs={12} sm={11} md={9}>
                        <Grid className="textAlignCenter" item xs={12} sm={6} md={3} >
                            <div className="heightIconsFooter "><img src={creditCard} className="iconsFooter pt-4" alt="logo credit card" /></div>
                            <div className="grey7 font6 size2 minHeight50Footer">SECURE PAYMENT</div>
                            <h5 className="font2">With credit card or Paypal</h5>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className="textAlignCenter">
                            <div className="heightIconsFooter pt-4"><MoodIcon /></div>
                            <div className="grey7 font6 size2 minHeight50Footer">SATISFIED OR REFUNDED</div>
                            <h5 className="font2">7 days from time of delivery</h5>

                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className="textAlignCenter">

                            <div className="heightIconsFooter pt-4"><LocalShippingIcon className="iconsFooter" /></div>
                            <div className="grey7 font6 size2 minHeight50Footer">FREE SHIPPING</div>
                            <h5 className="font2">From 40$ of purchases</h5>
                        </Grid>


                        <Grid item xs={12} sm={6} md={3} className="textAlignCenter">
                            <div className="heightIconsFooter pt-4"><LiveHelpIcon className="iconsFooter" /></div>
                            <div className="grey7 font6 size2 minHeight50Footer">RESPONSIVE CUSTOMER SERVICE</div>
                            <h5 className="font2">Guaranteed response within 24 hours</h5>
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
                                        <p className="font2">Paris Fabrics has been founded in 2019. We currently are located in France, in the city of Paris.The main reason we're here today is you. 99% of our customers are happy with what we offer, and we often get messages to thank us. It goes both ways!</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" className="menuQuality pb-5">
                        <Grid container item xs={12} md={11} lg={10} className="mt-7">
                            <Grid item className="pt-5" container justifyContent="center" md={12} lg={8}>
                                <Grid className="flexCenter" item md={4} sm={6} xs={12}>
                                    <div className="widthItemsFooter font2">
                                        <h3>ParisFabrics</h3>
                                        <div>52 rue de la porte</div>
                                        <div>75000 Paris</div>
                                        <div>contact@parisfabrics.com</div>
                                    </div>
                                </Grid>
                                <Grid className="flexCenter" item md={4} sm={6} xs={12}>
                                    <div className="widthItemsFooter font2">
                                        <h3 >About us</h3>
                                        <Link to="/shippingpolicy" onClick={resetPage} className="textDecorationNone"><div className="hoverUnderlined" style={{ color: 'rgb(223, 223, 223)' }}>Shipping policy</div></Link>
                                        <Link to="/refundpolicy" onClick={resetPage} className="textDecorationNone"><div className="hoverUnderlined" style={{ color: 'rgb(223, 223, 223)' }}>Refund policy</div></Link>
                                        <Link to="/faq" onClick={resetPage} className="textDecorationNone"><div className="hoverUnderlined" style={{ color: 'rgb(223, 223, 223)' }}>FAQ's</div></Link>
                                        <Link to="/termsofservice" onClick={resetPage} className="textDecorationNone"><div className="hoverUnderlined" style={{ color: 'rgb(223, 223, 223)' }}>Terms of service</div></Link>
                                        <Link to="/privacypolicy" onClick={resetPage} className="textDecorationNone"><div className="hoverUnderlined" style={{ color: 'rgb(223, 223, 223)' }}>Privacy policy</div></Link>
                                    </div>
                                </Grid>

                                <Grid className="flexCenter" item md={4} sm={6} xs={12}>
                                    <div className="widthItemsFooter font2">
                                        <h3>Privates sales and newsletter</h3>

                                        <div>Access privates sales and stay<br />up to date with Paris Fabrics news</div>
                                        <div className="flexCenter mt-4">
                                            <TextField
                                                className="inputFooter"
                                                placeholder=" Your email ..."
                                                margin="normal"
                                                style={{ paddingLeft: '10px', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', }}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {/* <button className="buttonSendNewsletters font8 borderNone mt-2"><MailOutlineIcon className=""/></button> */}
                                            <button onClick={addUserNewsletter} className="buttonSendNewsletters font2 mt-2 letterSpacing1 size2">OK </button>
                                            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} >
                                                <div className="snackbarFooter opacity9 bgBlue pl-5 pr-5 font2 p-1  bold200 textWhite borderRadius5 boxShadowButton verticalAlign" onClose={handleClose} severity="success">
                                                    <span><MailOutlineIcon className="mt-1" /></span><span className="ml-3 size2 font2">You are subscribeb to our newsletter !</span>
                                                </div>
                                            </Snackbar>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item className="pt-5 verticalAlign" container justifyContent="center" md={12} lg={4}>
                                <h1 className="verticalAlign titleFooter font8">Paris<span className="ml-1"></span>Fabrics</h1>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}