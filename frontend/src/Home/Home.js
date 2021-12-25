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
import aboutUsImg from '../assets/img/aboutusHome.png';
import '../App.css';
import '../css/Home.css';
import { itemsProduct, itemsBestSellers, averageNoteArticles } from '../Shared/globalState';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import trackPackage from "../assets/img/trackPackage1.png";
import { Helmet } from "react-helmet";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const LinkButton = withStyles((theme) => ({
    root: {
        color: '#020202',
        backgroundColor: '#dbb013',
        borderRadius: 4,
        opacity: 0.9,
        wordSpacing: 3,
        letterSpacing: 1,
        fontWeight: 800,
        '&:hover': {
            opacity: 1,
            backgroundColor: '#dbb013',
        },
    },
}))(Button);

export default function Home() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [bestSellers] = useRecoilState(itemsBestSellers);
    const [userReviews, setUserReviews] = useState([]);
    const [allItems] = useRecoilState(itemsProduct);
    const [averageNotes] = useRecoilState(averageNoteArticles);

    useEffect(() => {
        if (allItems.length !== 0) {
            setIsLoaded(true);
        }
    }, [allItems])

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

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
                <div className="divImgHome">
                    <span className="flexCenter textCenter titleImgHome font12 letterSpacing2 mb-2 size13 bold500">Eat, sleep, craft, repeat.</span>
                    <span className="flexCenter textImgHome textCenter size3 font12">Let's face it, life is just a bunch of obstacles preventing you from sewing.</span>
                    </div>
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
                            {bestSellers.map((item, index) => (
                                <div>
                                    {item.coup_de_coeur === "1" && <span className="divFavoriteBestsellers grey7 lightShadowCard2 opacity8 ">FAVOURITE</span>}
                                    {item.new === "1" && <span className="divNewBestsellers grey7 lightShadowCard2 opacity8 ">NEW</span>}
                                    {item.coup_de_coeur === "0" && item.new === "0" && <div className="height20"></div>}
                                    <div className="cardProductCarousel lightShadowCard2" key={index}>
                                        <Link to={`/${item.name} `} className="textDecorationNone">
                                            <img className="imageProductCarousel" src={window.location.origin + `/images/${item.images[0].url}`} alt="product bestsellers" />
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
                                                {item.sales_price !== "0" && item.sales_price !== null && <div className="priceProduct font2 letterSpacing2 mt-2 ml-3 pb-1 opacity9 textDecorationLineThrough grey6">${(item.sales_price / 100).toFixed(2)}</div>}
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
                        <Grid item md={3} xs={12} className="bgBlue verticalAlign">
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
                                autoPlaySpeed={6000}
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                            >
                                {bestSellers.map((item, index) => (
                                    <div

                                        className="m-2 bgWhite lightShadowCard3 pt-2 textDecorationNone divLinkHome"
                                        key={index}
                                    >
                                        <Link to={`/${item.name}`} className="flexBetween textDecorationNone">
                                            <div className="mt-1">
                                                <Rating
                                                    precision={0.5}
                                                    readOnly
                                                    size="small"
                                                    className="stars ml-2 opacity8 verticalAlign"
                                                    name="simple-controlled"
                                                    value={item.reviews[0].note}
                                                    emptyIcon={
                                                        <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                                    }
                                                />
                                                <div className="textDecorationNone ml-2 grey6 size09">{item.name}</div>
                                            </div>
                                            <img alt="item sewing kit order customer " src={window.location.origin + `/images/${item.images[0].url}`} className="imgReviewsHome mr-2" />
                                        </Link>
                                        <Link className="lightShadowCard3 textDecorationNone">

                                            {item.reviews[0].description.length !== null &&
                                                <div className="mt-2 pl-2 pt-2 pr-2 grey6 bold100 font2 minHeight90 lightShadowCard3">{item.reviews[0].description.length < 120 ? item.reviews[0].description : item.reviews[0].description.substring(0, 120) + " (...)"}</div>
                                            }
                                            <div className="mt-2 pl-2 pb-2 font2 bold500 grey9  pt-2">{item.reviews[0].title}</div>
                                        </Link>

                                    </div>
                                ))}
                            </Carousel>
                        </Grid>
                    </Grid>
                </Grid>
                <div className="flexCenter mt-10"><img src={review} alt="reward_svg" className="reviewIcon opacity8" /></div>
                <h2 className="centerText font8 size7 bold600 bestSellers opacity9 letterSpacing2">Our story ...</h2>
                <Grid className="pt-7" container justifyContent="center">
                    <Grid container item xs={11} md={11} spacing={4}>
                        <Grid item md={6} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <div>
                                <h2 className="grey7 mt--5">... Started with you</h2>
                                <div className="grey7 lineHeight4 textJustify">It is with you that we have started to grow. If we can still provide quality materials, it is thanks to you. For the past few months, we have constantly received suggestions to improve our store and design our next creation.
                                </div>
                                <div className="grey7 lineHeight4 mt-2">We thank you all !</div>
                                <Grid container justifyContent="center">
                                    <Grid xs={10} sm={6} md={6} className="pt-5 pb-5">
                                        <Link to="/aboutus" className="textDecorationNone">
                                            <LinkButton fullWidth variant="contained" className="grey8">More about us</LinkButton>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <img src={aboutUsImg} className="imgHomeAboutUs" alt="Parisfabrics sewing article"></img>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}
