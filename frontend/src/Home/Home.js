import { useState, useEffect } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Rating from '@mui/material/Rating';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Container from '@material-ui/core/Container';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { useRecoilState } from 'recoil';
import { Link } from "react-router-dom";
import logo from "../assets/img/sewing3.jpg";
import reward from "../assets/img/reward2.png";
import earth from "../assets/img/earth1.png";
import sewing from "../assets/img/sewing2.jpg";
import review from "../assets/img/review3.png";
import '../App.css';
import '../css/Home.css';
import { itemsProduct, itemsBestSellers, averageNoteArticles } from '../Shared/globalState';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import trackPackage from "../assets/img/trackPackage1.png";
import { Helmet } from "react-helmet";

export default function Home() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [bestSellers] = useRecoilState(itemsBestSellers);
    const [userReviews, setUserReviews] = useState([]);
    const [allItems] = useRecoilState(itemsProduct);
    const [averageNotes] = useRecoilState(averageNoteArticles);

    const images = require.context('../../public/images', true);

    useEffect(() => {
        fetch("https://parisfabrics.com/api/reviews")
            .then(res => res.json())
            .then(
                (result) => {
                    for (var i = 0; i < result.allReviews.length; i++) {
                        result.allReviews[i].product = allItems.find(element => element.id === result.allReviews[i].id_product)
                    }
                    setUserReviews(result.allReviews);
                },
                (error) => {
                    console.log('error', error)
                }
            )
    }, [allItems])

    useEffect(() => {
        if (allItems.length !== 0) {
            setIsLoaded(true);
        }
    }, [allItems])

    window.scroll(0, 0);

    const bestSellersCarousel = {
        large: {
            breakpoint: { max: 4000, min: 1200 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1200, min: 960 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 960, min: 600 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1
        }
    };
    const reviewsCarousel = {
        desktop: {
            breakpoint: { max: 4000, min: 1160 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1160, min: 600 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1
        }
    };

    return (
        <div className="pt-9">
            <div>
                <img src={logo} alt="Logo" className="imgIntro" />
            </div>
            <Container >
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home - Paris Fabrics</title>
            </Helmet>
                <Grid container justifyContent="center" className="menuQuality">
                    <Grid item container xs={12} md={11}>
                        <Grid item xs={12} sm={4}>
                            <div className="mt-6 ">

                                <span className="flexCenter minHeight40"><img src={earth} alt="earth_icon" className="smallIcons " /></span>
                                <span className="flexCenter mt-2 titleHomeArguments grey7 font6 size1 opacity9 letterSpacing2">RESPECT FOR THE LAND</span>
                                <div className="blueBar"></div>
                                <span className="flexCenter mt-1 grey7 font2 opacity9 letterSpacing1">Environment and traditions</span>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={4} className="flexBetween">
                            <div className="orangeBar"></div>
                            <div className="mt-6 ">
                                <span className="flexCenter minHeight40"><img src={trackPackage} alt="sewing_icon" className="smallIconsTrack backgroundIcons" /></span>
                                <span className="flexCenter mt-2 titleHomeArguments grey7 font6 size1 opacity9 letterSpacing2">TRACKING DELIVERY</span>
                                <div className="blueBar"></div>
                                <span className="flexCenter mt-1 grey7 font2 opacity9 letterSpacing1">All around the world</span>
                            </div>
                            <div className="orangeBar"></div>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <div className="mt-6">
                                <span className="flexCenter minHeight40"><img src={sewing} alt="sewing_icon" className="smallIcons backgroundIcons" /></span>
                                <span className="flexCenter mt-2 titleHomeArguments grey7 font6 size1 opacity9 letterSpacing1">A REAL KNOW-HOW</span>
                                <div className="blueBar"></div>
                                <span className="flexCenter mt-1 grey7 font2 opacity9 letterSpacing1">The highest quality</span>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                <div className="mt-10 mb-5">
                    <div className="flexCenter"><img src={reward} alt="reward_svg" className="rewardIcon opacity8" /></div>
                    <span className="flexCenter font8 size7 mt-3 bold600 bestSellers opacity9 letterSpacing2">Our best sellers</span>
                    <span className="flexCenter font5 mt-1 bold400 bestSellers opacity9">Discover our customers' favorite products !</span>
                </div>



                {isLoaded &&
                    <div className="">
                        <Carousel
                            responsive={bestSellersCarousel}
                            infinite={true}
                        >
                            {bestSellers.map(item => (
                                <div>
                                    {item.coup_de_coeur === "1" && <span className="divFavoriteBestsellers grey7 lightShadowCard2 opacity8 ">FAVOURITE</span>}
                                    {item.new === "1" && <span className="divNewBestsellers grey7 lightShadowCard2 opacity8 ">NEW</span>}
                                    {item.coup_de_coeur === "0" && item.new === "0" && <div className="height20"></div>}
                                    <div className="cardProductCarousel lightShadowCard2" key={item.id}>
                                        <Link to={`/${item.name} `} className="textDecorationNone">
                                            <img className="imageProductCarousel" src={window.location.origin + `/images/${item.images[0].url}`} alt="product bestsellers" />
                                            {/* <img className="imageProductCarousel" src={images(`./${item.images[0].url}`).default} alt="product bestsellers" /> */}
                                            <div className="hideProduct">
                                                <div className="elementAppear font5 letterSpacing1">
                                                    DISCOVER
                                                </div>
                                            </div>
                                            <div className="nameProduct font11 letterSpacing1 size3 grey7 flexCenter">{item.name}</div>
                                            <div className="centerText mt-3 opacity8">
                                                <Rating
                                                    precision={0.5}
                                                    readOnly
                                                    size="small"
                                                    name="simple-controlled"
                                                    value={item.avg}
                                                    emptyIcon={
                                                        <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                                    }
                                                />
                                            </div>
                                            <div className="flex">
                                                {item.sales_price !== "0" && item.sales_price !== null &&<div className="priceProduct font2 letterSpacing2 mt-2 ml-3 pb-1 opacity9 textDecorationLineThrough grey6">${(item.sales_price / 100).toFixed(2)}</div>}
                                                <div className="priceProduct font2 grey8 letterSpacing2 mt-2 ml-3 pb-1 opacity9">${(item.price / 100).toFixed(2)}</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                }
                <div className="flexCenter mt-10"><img src={review} alt="reward_svg" className="reviewIcon opacity8" /></div>
                <h2 className="centerText font8 size7 bold600 bestSellers opacity9 letterSpacing2">They enjoyed the experience</h2>
                <Grid className="pt-7" container justifyContent="center">
                    <Grid container item xs={11} md={11} spacing={4}>
                        <Grid item md={3} xs={12} className=" bgBlue verticalAlign">
                            <Grid >
                                <div className="textAlignCenter">
                                    <div><span className="size3 bold600 mr-1">{averageNotes}</span>/ 5</div>
                                    <h4 className="flexCenter opacity9 letterSpacing1 lineHeight1 font2">Based on purchases on ParisFabrics</h4>
                                    <div>
                                        <Rating
                                            precision={0.5}
                                            readOnly
                                            name="simple-controlled"
                                            value={averageNotes}
                                            emptyIcon={
                                                <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                            }
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item md={9} xs={12}>
                            <Carousel
                                responsive={reviewsCarousel}
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={10000}
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                            >
                                {userReviews.map((review, index) => (
                                    <div
                                        className="m-2 bgWhite lightShadowCard3 pt-2 cursorPointer"
                                        key={index}
                                    >

                                        {/* {item.product !== undefined && */}
                                        {/* <Link to={`/${item.product.name}`}> */}
                                        <Rating
                                            precision={0.5}
                                            readOnly
                                            size="small"
                                            className="stars ml-2 opacity8 "
                                            name="simple-controlled"
                                            value={review.note}
                                            emptyIcon={
                                                <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                            }
                                        />
                                        {/* <div className="ml-2 linkItemComment minHeight30">{item.product.name}</div> */}
                                        <div className="lightShadowCard3">
                                            {review.description.length !== null &&
                                                <div className="mt-2 pl-2 pt-2 pr-2 grey6 bold100 font2 minHeight90">{review.description.length < 120 ? review.description : review.description.substring(0, 120) + " (...)"}</div>
                                            }
                                            <div className="mt-5 pl-2 pb-2 font2 bold500 grey9 lightShadowCard3 pt-2">{review.title}</div>
                                        </div>
                                        {/* </Link> */}
                                        {/* } */}
                                    </div>
                                ))}
                            </Carousel>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
