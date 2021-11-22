import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
    BrowserRouter as Router,
    ReactDom,
    Switch,
    Route,
    Link,
    useLocation,
} from "react-router-dom";
import '../../App.css';
import '../../css/Products.css';
import { useRecoilState } from 'recoil';
import Rating from '@mui/material/Rating';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { itemsBestSellers, changingPage, itemsProduct, numberOfItemsInCart } from '../Shared/globalState';
import reward from "../../../assets/img/reward2.png";
import review from "../../../assets/img/review1.png";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    marginTop: {
        marginTop: 200,
    },
    productImgDescription: {
        height: 500,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    descriptionImgDescription: {
        height: 200,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    menuDescriptionProduct: {
        marginTop: "100px",
    }

}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    height: 300,
    "margin": "20px",
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//     },
//     heading: {
//         fontSize: theme.typography.pxToRem(15),
//         flexBasis: '33.33%',
//         flexShrink: 0,
//     },
//     secondaryHeading: {
//         fontSize: theme.typography.pxToRem(15),
//         color: theme.palette.text.secondary,
//     },
// }));

export default function Product(props) {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const [quantityProduct, setQuantityProduct] = useState(1);
    const [numberInCart, setNumberInCart] = useRecoilState(numberOfItemsInCart);
    const [averageNote, setAverageNote] = useState(0);
    const [allItems, setAllItems] = useRecoilState(itemsProduct);
    const [product, setProduct] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userReviews, setUserReviews] = useState([]);
    const [avgNote, setAvgNote] = useState('');
    const [bestSellers, setBestSellers] = useRecoilState(itemsBestSellers);
    const [changePage, setChangePage] = useRecoilState(changingPage);

    const [expanded, setExpanded] = React.useState(false);

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        fetch(process.env.MIX_REACT_APP_API + "/api/reviews")
            .then(res => res.json())
            .then(
                (result) => {
                    for (var i = 0; i < result.allReviews.length; i++) {
                        result.allReviews[i].updated_at = allItems.find(element => element.id === result.allReviews[i].id_product)
                    }
                    setUserReviews(result.allReviews);
                },
                (error) => {
                    console.log('error', error)
                }
            )
    }, [allItems])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addQuantity = () => {
        setQuantityProduct(quantityProduct + 1);
    }
    const substractQuantity = () => {
        if (quantityProduct < 2) {
            return;
        }
        setQuantityProduct(quantityProduct - 1);
    }

    const addToLocalStorage = () => {
        let itemProperties = {
            id: `${product.id}`,
            name: `${product.name}`,
            price: `${product.price}`,
            quantity: 0
        }
        if (localStorage.getItem(`${product.name}`) === null) {
            itemProperties.quantity = quantityProduct;
        } else {
            let itemAlreadyInCart = JSON.parse(localStorage.getItem(`${product.name}`));
            itemProperties.quantity = quantityProduct + itemAlreadyInCart.quantity;
        }
        localStorage.setItem(`${product.name}`, JSON.stringify(itemProperties));
        setQuantityProduct(1);
        setNumberInCart(numberInCart + quantityProduct);
    }

    const scrollToReviews = () => {
        window.scrollTo(0, 700);
        setValue(2);
        console.log(value);
    }

    useEffect(() => {
        if (allItems.length !== 0) {
            var urlProduct = window.location.pathname.split('/');
            let decodeUrl = decodeURI(urlProduct[2]);
            let product = allItems.find(element => element.name === decodeUrl)
            setProduct(product);
            setIsLoaded(true);
            setChangePage(false);
            scroll(0, 0)
        }
    }, [changePage])

    useEffect(() => {
        if (isLoaded === true) {
            let totalNotes = 0
            for (var i = 0; i < product.reviews.length; i++) {
                totalNotes += (product.reviews[i].note)
            }
            let average = totalNotes / product.reviews.length;
            setAverageNote(average);
            window.moveTo(0, 0);
        }
    }, [])

    const changeProduct = () => {
        setChangePage(true);
    }

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


    if (!isLoaded) {
        return <div className="marginSpinner"><div className="loader">Loading...</div></div>
    } else {
        return (
            <Container className="pt-15 singleProduct">
                <Grid container justifyContent="center" spacing={6}>
                    <Grid container item xs={12} sm={11} md={7} className="flex">
                        <Grid item xs={12} sm={3} md={3} className="productComputer">
                            <Grid item xs={12} ><img className="cursorPointer switchImg m-1" src="https://picsum.photos/200/300"></img></Grid>
                            <Grid item xs={12}><img className="switchImg m-1" src="https://picsum.photos/200/300"></img></Grid>
                            <Grid item xs={12}><img className="switchImg m-1" src="https://picsum.photos/200/300"></img></Grid>
                        </Grid>
                        <Grid item xs={12} sm={9} md={9}><img className="imageOneProduct" src="https://picsum.photos/200/300" /></Grid>
                        <div className="flex">
                            <div><img className="switchImgMobile productMobile" src="https://picsum.photos/200/300"></img></div>
                            <div><img className="switchImgMobile productMobile" src="https://picsum.photos/200/300"></img></div>
                            <div><img className="switchImgMobile productMobile" src="https://picsum.photos/200/300"></img></div>
                        </div>
                        {/* <Grid container justifyContent="center">
                            <Grid item xs={12} container className="productMobile" spacing={1}>
                                <Grid item xs={4}><img className="switchImgMobile productMobile" src="https://picsum.photos/200/300"></img></Grid>
                                <Grid item xs={4}><img className="switchImgMobile productMobile" src="https://picsum.photos/200/300"></img></Grid>
                                <Grid item xs={4}><img className="switchImgMobile productMobile" src="https://picsum.photos/200/300"></img></Grid>
                            </Grid>
                        </Grid> */}
                    </Grid>
                    {/* <img src={window.location.origin + `/images/${product.image}`}></img> */}
                    <Grid item xs={12} sm={10} md={5}>
                        <div className="font10 size3 grey8 letterSpacing2">{product.name}</div>

                        <div className="flexBetween mt-9">
                            <span className="priceProduct font2 letterSpacing2">{product.price},00 €</span>
                            <span>
                                <Rating
                                    size="small"
                                    precision={0.5}
                                    readOnly
                                    className=""
                                    name="simple-controlled"
                                    value={product.avg}
                                />
                            </span>
                            <span onClick={scrollToReviews} className="font5 underlined grey8 cursorPointer scrollSmooth">Read reviews ({product.reviews.length})</span>
                        </div>
                        <div className="flexBetween mt-9">
                            <Grid container justifyContent="center" >
                                <Grid item xs={11} sm={6}>
                                    <span className=" addSubstractCart">
                                        <button disabled className=" quantityProduct size2 height30">{quantityProduct}</button>
                                        <button onClick={addQuantity} className="colorButton1  size2 buttonAdd height30">+</button>
                                        <button onClick={substractQuantity} className="colorButton1  size2 buttonSubstract height30">-</button>
                                    </span>
                                </Grid>
                                <Grid item xs={11} sm={6}>
                                    <div className="divPc alignRight">
                                        <Link to="/cart">
                                            <button onClick={addToLocalStorage} className="colorButton1  bold300 letterSpacing2 font2 buttonAddToCart height30"> Add to cart</button>
                                        </Link>
                                    </div>
                                    <div className="divMobile">
                                        <Link to="/cart">
                                            <button onClick={addToLocalStorage} className="mt-5 colorButton1  bold300 letterSpacing2 font2 buttonAddToCartMobile height30"> Add to cart</button>
                                        </Link>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <div className="width90 greyLineProduct m-4"></div>
                        </div>
                        <div>
                            <div>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical </div>
                        </div>
                    </Grid>
                </Grid>

                <Box className="pt-10 productComputer" sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Description" {...a11yProps(0)} />
                            <Tab label="Fiche produit" {...a11yProps(1)} />
                            <Tab label="reviews" {...a11yProps(2)} />
                        </Tabs>
                        <div className=" greyLineProduct "></div>
                    </Box>
                    <TabPanel className="mt-3" value={value} index={0}>
                        <Grid container spacing={4}>
                            <Grid item xs={8} className="alignCenter"><span>unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></Grid>
                            {/* <Grid item xs={4}><img src={ProductQuality} alt="ProductQuality" className={classes.imgFull} /></Grid> */}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {/* <Button onClick={handleConsole}>click me</Button> */}
                        {product.reviews.map(review => (
                            <div key={review.id} className="lightShadowCard2 p-3 mb-5">
                                <Grid container className="flexBetween">
                                    <Grid item sm={10} xs={12}>
                                        <div className="mb-2">
                                            <span className="mr-2"><AccountCircleIcon /></span>
                                            <span className="font5 bold600 grey8">{review.title}</span>
                                            <span className="ml-3 bold500 size08 font07 grey6">{review.created_at}</span>
                                        </div>
                                        <div>
                                            <span className="font2 grey6">{review.description}</span>
                                        </div>
                                    </Grid>

                                    <Grid item sm={2} xs={12}>
                                        <div className="starsProductReview marginTop600px opacity8">
                                            <Rating
                                                precision={0.5}
                                                readOnly
                                                name="simple-controlled"
                                                value={review.note}
                                                emptyIcon={
                                                    <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                                }
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        ))}

                    </TabPanel>
                </Box>
                <Grid container justifyContent="center" className="productMobile mt-7">
                    <Grid container item xs={12} md={7}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')} className="productMobile">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"

                            >
                                <div>Description</div>

                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                    maximus est, id dignissim quam.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')} className="productMobile">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <div>Fiche Produit</div>

                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                                    diam eros in elit. Pellentesque convallis laoreet laoreet.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChangeAccordion('panel3')} className="productMobile">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                            >
                                <div>Reviews ({product.reviews.length})</div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    {product.reviews.map(review => (
                                        <div key={review.id} className="lightShadowCard2 p-3 mb-5">
                                            <Grid container className="flexBetween">
                                                <Grid item sm={10} xs={12}>
                                                    <div className="mb-2">
                                                        <span className="mr-2"><AccountCircleIcon /></span>
                                                        <span className="font5 bold600 grey8">{review.title}</span><br/>
                                                        <span className="ml-3 bold500 size08 font07 grey6">{review.created_at}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font2 grey6">{review.description}</span>
                                                    </div>
                                                </Grid>

                                                <Grid item sm={2} xs={12}>
                                                    <div className="starsProductReview marginTop600px opacity8">
                                                        <Rating
                                                            precision={0.5}
                                                            readOnly
                                                            name="simple-controlled"
                                                            value={review.note}
                                                            emptyIcon={
                                                                <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                                            }
                                                        />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
                {/* <div className="flexCenter mt-15"><img src={review} alt="reward_svg" className="reviewIcon opacity6" /></div>
                <h2 className="flexCenter font8 size7 bold600 bestSellers opacity9 letterSpacing2">They lived the experience</h2>
                <Grid className="pt-5" container justifyContent="center">
                    <Grid container item xs={11} md={11} spacing={4}>
                        <Grid item md={3} xs={12} className=" bgBlue verticalAlign">
                            <Grid >
                                <div className="textAlignCenter">
                                    <div><span className="size3 bold800 mr-1">{avgNote}</span>/ 5</div>
                                    <h4 className="flexCenter opacity9 letterSpacing1 lineHeight1 font2">Based on purchases on {product.name}</h4>
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
                        <Grid item md={9} xs={12}>
                            <Carousel
                                responsive={reviewsCarousel}
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={10000}
                            >
                                {userReviews.map(item => (
                                    <div
                                        className="m-2"
                                        key={item.id}
                                    >
                                        <div className=''>
                                            <Rating
                                                precision={0.5}
                                                readOnly
                                                size="small"
                                                className="stars ml-2 opacity8"
                                                name="simple-controlled"
                                                value={item.note}
                                                emptyIcon={
                                                    <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                                }
                                            />
                                            <div className="lightShadowCard3">

                                                <div className="mt-2 pl-2 pt-2 grey6 bold100 font2">{item.description.length < 60 ? item.description : item.description.substring(0, 70) + " . . ."}</div>
                                                <div className="mt-5 pl-2 pb-2 font2 bold500 grey9">{item.title}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </Grid>
                    </Grid>
                </Grid> */}
                <Grid className="pt-10" container justifyContent="center">
                    <Grid item xs={11} md={11}>
                        <div className="mt-10">
                            <div className="flexCenter"><img src={reward} alt="reward_svg" className="rewardIcon opacity6" /></div>
                            <span className="flexCenter font8 size7 mt-3 bold600 bestSellers opacity9 letterSpacing2">Our customers also like ...</span>
                        </div>
                        {isLoaded &&
                            <div>
                                <Carousel
                                    responsive={bestSellersCarousel}
                                    infinite={true}
                                    autoPlaySpeed={1000}
                                >
                                    {bestSellers.map(item => (
                                        <div className="cardProduct lightShadowCard2" key={item.id}>
                                            <Link to={`/product/${item.name} `} onClick={changeProduct}>
                                                <img className="imageProduct" src="https://picsum.photos/200/300" />
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
                                                <div className="priceProduct font2 grey8 letterSpacing2 mt-2 ml-3 pb-1 opacity9">${item.price}.00</div>
                                            </Link>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        }
                    </Grid>
                </Grid>


            </Container >
        )
    }
}
