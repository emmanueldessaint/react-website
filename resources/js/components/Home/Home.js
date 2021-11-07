import { useState, useEffect } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Rating from '@mui/material/Rating';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { styled } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { LoadData } from '../../Constants.js'
import axios from 'axios';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import logo from "../../../assets/img/sewing3.jpg";
import reward from "../../../assets/img/reward2.svg";
import earth from "../../../assets/img/earth1.png";
import sewing from "../../../assets/img/sewing2.jpg";
import review from "../../../assets/img/review1.png";
import '../../App.css';
import '../../css/Home.css';

const useStyles = makeStyles(theme => ({

    greyLine: {
        "border-left": "1px solid black;"
    },
    testProduit: {
        backgroundColor: 'black',
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: 10,
        },
    },
}));

export default function Home() {

    const classes = useStyles();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [bestSellers, setBestSellers] = useState([]);
    const [avgNote, setAvgNote] = useState('');
    const [userReviews, setUserReviews] = useState([]);
    const [items, setItems] = useState([]);
    const [arrayCarousel, setArrayCarousel] = useState([])
    const [p, setP] = useState(1);



    useEffect(() => {
        fetch("http://localhost:8000/api/reviews")
            .then(res => res.json())
            .then(
                (result) => {
                    let averageNote = 0;
                    let allProducts = [];
                    allProducts = result.bestSellers;
                    for (let j = 0; j < allProducts.length; j++) {
                        let totalNotes = 0;
                        for (let k = 0; k < allProducts[j].reviews.length; k++) {
                            totalNotes += allProducts[j].reviews[k].note;
                        }
                        averageNote = totalNotes / allProducts[j].reviews.length;
                        allProducts[j].updated_at = averageNote;
                    }

                    setIsLoaded(true);
                    setBestSellers(allProducts);
                    setAvgNote(result.reviewsAverage);
                    setUserReviews(result.allReviews);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const consoleLog = () => {
        console.log(userReviews)
    }

    // const goingRight = () => {
    //     if (p === userReviews.length) {
    //         setP(1);
    //     } else {
    //         setP(p+1);
    //     }     
    //     var element = document.getElementsByClassName("myDIV");
    //     element.classList.add("show");        
    // }
    // const goingLeft = () => {
    //     if (p === 1) {
    //         setP(userReviews.length);
    //     } else {
    //         setP(p-1);
    //     }    
    // }

    // useEffect(() => {   
    //     if(userReviews.length > 0) {
    //         if (userReviews.slice(p+1,p+2).length > 0) {
    //             var arrayCarousel2 = [];
    //             arrayCarousel2[0] = (userReviews.slice(p-1,p)[0]);
    //             arrayCarousel2.push(userReviews.slice(p,p+1)[0]);
    //             arrayCarousel2.push(userReviews.slice(p+1,p+2)[0]);
    //         } else if (userReviews.slice(p,p+1).length > 0) {
    //             var arrayCarousel2 = [];
    //             arrayCarousel2.push(userReviews.slice(p-1,p)[0]);
    //             arrayCarousel2.push(userReviews.slice(p,p+1)[0]);
    //             arrayCarousel2.push(userReviews.slice(0,1)[0]);
    //         } else {
    //             var arrayCarousel2 = [];
    //             arrayCarousel2.push(userReviews.slice(p-1,p)[0]);
    //             arrayCarousel2.push(userReviews.slice(0,1)[0]);
    //             arrayCarousel2.push(userReviews.slice(1,2)[0]);
    //         }   

    //         setArrayCarousel(arrayCarousel2);
    //     } 

    // }, [p, userReviews])


    return (
        <div className="mt-9">
            <div>
                <img src={logo} alt="Logo" className="imgIntro" />
            </div>
            <Container>
                <Grid container justifyContent="center" className="menuQuality">
                    <Grid item container xs={12} md={10}>

                        <Grid item xs={12} sm={4} className={classes.alignTitle}>
                            <Button onClick={consoleLog}>update panier</Button>
                            <div className="mt-6">
                                <span className="flexCenter"><img src={earth} alt="earth_icon" className="smallIcons " /></span>
                                <span className="flexCenter mt-2 titleHomeArguments grey2 font6 size2 opacity9">RESPECT FOR THE LAND</span>
                                <div className="blueBar"></div>
                                <span className="flexCenter mt-2 grey2 font4 opacity9">Environment and traditions</span>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={4} className="flexBetween">
                            <div className="orangeBar"></div>
                            <div className="mt-6">
                                <span className="flexCenter"><LocalShippingIcon /></span>
                                <span className="flexCenter mt-2 titleHomeArguments grey2 font6 size2 opacity9">TRACKING DELIVERY</span>
                                <div className="blueBar"></div>
                                <span className="flexCenter mt-2 grey2 font4 opacity9">All around the world</span>
                            </div>
                            <div className="orangeBar"></div>
                        </Grid>

                        <Grid item xs={12} sm={4} className={classes.alignTitle}>
                            <div className="mt-6">
                                <span className="flexCenter"><img src={sewing} alt="sewing_icon" className="smallIcons backgroundIcons" /></span>
                                <span className="flexCenter mt-2 titleHomeArguments grey2 font6 size2 opacity9">A REAL KNOW-HOW</span>
                                <div className="blueBar"></div>
                                <span className="flexCenter mt-2 grey2 font4 opacity9">The highest quality</span>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <div className="mt-10">
                    <div className="flexCenter"><img src={reward} alt="reward_svg" className="rewardIcon opacity6" /></div>
                    <span className="flexCenter font8 size7 mt-3 bold600 grey2 opacity9">Our best sellers</span>
                    <span className="flexCenter font4 grey2 opacity9">Discover our customers' favorite products !</span>
                </div>
                {isLoaded &&
                    <div>
                        <Grid container justifyContent="center">
                            <Grid item container xs={12} md={11} lg={10}>

                                {bestSellers.map(item => (
                                    <Grid
                                        item xs={12} sm={6} md={3} lg={3}
                                        key={item.id}
                                    >
                                        <div className="cardProduct lightShadowCard2">
                                            <Link to={{ pathname: '/product', state: { product: item } }}>
                                                <img className="imageProduct" src="https://picsum.photos/200/300" />
                                                <div className="hideProduct">
                                                    <div className="elementAppear">
                                                        DISCOVER
                                                    </div>
                                                </div>
                                                <div className="nameProduct font1 flexCenter">{item.name}</div>
                                                <div className="centerText mt-3">
                                                    <Rating
                                                        precision={0.5}
                                                        readOnly
                                                        size="small"
                                                        name="simple-controlled"
                                                        value={item.updated_at}
                                                        emptyIcon={
                                                            <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                                        }
                                                    />
                                                </div>
                                                <div className="priceProduct font2 mt-2 ml-3 pb-1 opacity9">${item.price}.00</div>
                                            </Link>
                                        </div>
                                    </Grid>
                                ))}

                            </Grid>
                        </Grid>
                    </div>
                }
                <div className="flexCenter mt-10"><img src={review} alt="reward_svg" className="reviewIcon opacity6" /></div>
                <h2 className="flexCenter font8 size7 bold600 grey2 opacity9">They lived the experience</h2>
                <Grid className="pt-7" container justifyContent="center">
                    <Grid container item xs={11} md={11} spacing={4}>
                        <Grid item md={3} xs={12} className=" bgWhite3 verticalAlign">
                            <Grid >
                                <div className="textAlignCenter ">
                                    <div>{avgNote}/5</div>
                                    <h4 className="flexCenter opacity9">Based on purchases on AmazingSewing</h4>
                                    <div>
                                        <Rating
                                            precision={0.5}
                                            readOnly
                                            name="simple-controlled"
                                            value={avgNote}
                                            emptyIcon={
                                                <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                            }
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item md={9} sm={12} className="textReviews"  >
                            <Grid container justifyContent="center" spacing={6}>
                                {userReviews.map(item => (
                                    <Grid
                                        item xs={12} sm={6} lg={3}
                                        key={item.id}
                                    >
                                        <div className='transitionReview myDIV'>
                                            <Rating
                                                precision={0.5}
                                                readOnly
                                                className="stars"
                                                name="simple-controlled"
                                                value={item.note}
                                                emptyIcon={
                                                    <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                                }
                                            />
                                            <div className="lightShadowCard1">
                                                <div className="mt-5 pl-2 pt-2 opacity9">{item.description.length < 60 ? item.description : item.description.substring(0, 70) + " . . ."}</div>
                                                <div className="mt-5 pl-2 pb-2">{item.title}</div>
                                            </div>
                                        </div>


                                    </Grid>
                                ))}
                                {/* <button className="buttonTransition" onClick={goingRight}>right</button>
                                <button className="buttonTransition" onClick={goingLeft}>left</button>        */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

        </div>
    )
}


