import React, { useState, useEffect } from 'react';
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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ProductQuality from "../../../assets/img/qualityProduct.png";

import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
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
import YouTubeIcon from '@material-ui/icons/YouTube';
import { numberOfItemsInCart } from '../Shared/globalState'
import { useRecoilState } from 'recoil';
import Rating from '@mui/material/Rating';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


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


export default function Product(props) {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const [quantityProduct, setQuantityProduct] = useState(1);
    const [numberInCart, setNumberInCart] = useRecoilState(numberOfItemsInCart);
    const [averageNote, setAverageNote] = useState(0);

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

    let data = useLocation();
    let product = data.state.product;

    

    const scrollToReviews = () => {
        window.scrollTo(0, 700);
        setValue(2);
        console.log(value);
        
    }

    useEffect(() => {
        console.log(product.reviews)
        let totalNotes = 0
        for (var i = 0; i < product.reviews.length; i++) {
            totalNotes += (product.reviews[i].note)
        }
        let average = totalNotes/product.reviews.length;
        setAverageNote(average);
        window.moveTo(0, 0);
    }, [])

    return (
        <Container className="pt-15">
            <Grid container justifyContent="center" spacing={6}>
                <Grid item xs={12} md={6} >
                    <img className="imageOneProduct" src="https://picsum.photos/200/300" />
                </Grid>
                <Grid item xs={12} sm={10} md={5}>
                    <h2 className="font1 letterSpacing2">{product.name}</h2>
                    <div className="flexBetween mt-9">
                        <span className="priceProduct font2 letterSpacing2">{product.price},00 €</span>
                        <span>
                            <Rating
                                size="small"
                                precision={0.5}
                                readOnly
                                className=""
                                name="simple-controlled"
                                value={averageNote}
                            />
                        </span>
                        <span onClick={scrollToReviews} className="font5 underlined grey3 cursorPointer">Read reviews ({product.reviews.length})</span>
                    </div>
                    <div className="flexBetween mt-9">
                        <span className=" addSubstractCart">
                            <button disabled className=" quantityProduct size2 height30">{quantityProduct}</button>
                            <button onClick={addQuantity} className="colorButton1 greyButton size2 buttonAdd height30">+</button>
                            <button onClick={substractQuantity} className="colorButton1 greyButton size2 buttonSubstract height30">-</button>
                        </span>
                        <span className=" alignRight">
                        <Link to="/cart">
                            <button onClick={addToLocalStorage} className="colorButton1 greyButton bold300 letterSpacing2 font2 buttonAddToCart height30"> Add to cart</button>
                            </Link>  
                        </span>
                    </div>
                    <div>
                        <div className="width90 greyLineProduct m-4"></div>
                    </div>
                    <div>
                        <div>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical </div>
                    </div>
                </Grid>
            </Grid>

            <Box className="mt-13" sx={{ width: '100%' }}>
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
                        <div key={review.id} className="lightShadowCard1 p-3 mb-5">
                            <Grid container className="flexBetween">
                                <Grid item sm={10} xs={12}>
                                    <div className="mb-2">
                                        <span className="mr-2"><AccountCircleIcon /></span>
                                        <span className="font5 bold600 grey2">{review.title}</span>
                                    </div>
                                    <div>
                                        <span className="font3 grey1">{review.description}</span>
                                    </div>
                                </Grid>

                                <Grid item sm={2} xs={12}>
                                    <div className="starsProductReview marginTop600px">
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
        </Container>
    )
}
