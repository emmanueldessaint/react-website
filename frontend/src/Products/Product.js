import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import '../App.css';
import '../css/Products.css';
import { useRecoilValue, useRecoilState } from 'recoil';
import Rating from '@mui/material/Rating';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { itemsBestSellers, changingPage, itemsProduct, numberOfItemsInCart, } from '../Shared/globalState';
import reward from "../assets/img/reward2.png";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ReactHtmlParser from 'react-html-parser';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import { Line } from 'rc-progress';
import StarRateIcon from '@material-ui/icons/StarRate';
import { Helmet } from "react-helmet";

const LinkButton = withStyles((theme) => ({
    root: {
        color: '#020202',
        backgroundColor: '#dbb013',
        borderRadius: 0,
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
                    <div>{children}</div>
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

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#020202',
        backgroundColor: '#7387b7',
        borderRadius: 0,
        opacity: 0.9,
        fontWeight: '600',
        '&:hover': {
            backgroundColor: '#7387b7',
            opacity: 1,
            fontWeight: '800',
        },
    },
}))(Button);

const ReviewButton = withStyles((theme) => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#413138',
        borderRadius: 0,
        borderColor: '#413138',
        border: '1px solid',
        '&:hover': {
            backgroundColor: '#ffffff',
            color: '#505050',
            border: '1px solid',
            borderColor: '#505050',
            fontWeight: '600',
        },
    },
}))(Button);

const ReviewButtonMobile = withStyles((theme) => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#413138',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: '#ffffff',
            color: '#505050',
            border: '1px solid',
            borderColor: '#505050',
        },
    },
}))(Button);

const ButtonSubmitComment = withStyles((theme) => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#119c2c',
        borderRadius: 5,
        opacity: 0.9,
        '&:hover': {
            backgroundColor: '#1dbf3c',
        },
    },
}))(Button);



export default function Product(props) {

    const [value, setValue] = React.useState(0);
    const [quantityProduct, setQuantityProduct] = useState(1);
    const [numberInCart, setNumberInCart] = useRecoilState(numberOfItemsInCart);
    const [allItems, setAllItems] = useRecoilState(itemsProduct);
    const [product, setProduct] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const bestSellers = useRecoilValue(itemsBestSellers);
    const [changePage, setChangePage] = useRecoilState(changingPage);
    const [expanded, setExpanded] = React.useState(false);
    const [defaultImage, setDefaultImage] = useState('');
    const [numberOfStars, setNumberOfStars] = useState({});
    const [writeReviews, setWriteReviews] = useState(false);
    const [valueComment, setValueComment] = useState(0);
    const [newCommentContent, setNewCommentContent] = useState('');
    const [noRating, setNoRating] = useState(false);
    const [filter, setFilter] = useState(0);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (allItems.length !== 0) {
            var urlProduct = window.location.pathname.split('/');
            let decodeUrl = decodeURI(urlProduct[1]);
            let product = allItems.find(element => element.name === decodeUrl)
            setProduct(product);
            setDefaultImage(product.images[0].url);
            setIsLoaded(true);
            setChangePage(false);
            window.scroll(0, 0);
        }
    }, [changePage, allItems]) // on actualise si on change de page car sinon quand on clic sur une autre page, ça n'actualise pas le contenu

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
        // var priceRounded = product.price;
        // var newPrice = priceRounded.parseFloat().toFixed(2);
        let itemProperties = {
            id: `${product.id}`,
            name: `${product.name}`,
            price: `${product.price}`,
            image: `${product.images[0].url}`,
            quantity: 0
        }

        var ourCart = JSON.parse(localStorage.getItem("cart_Paris_Fabrics"));

        var itemExistInCart = false;
        if (ourCart === null) {
            itemProperties.quantity = quantityProduct;
            localStorage.setItem('cart_Paris_Fabrics', JSON.stringify([itemProperties]));
            setQuantityProduct(1);
            setNumberInCart(numberInCart + quantityProduct);
            return;
        }
        for (var i = 0; i < ourCart.length; i++) {
            if (ourCart[i].name === product.name) {
                let quantityInCart = ourCart[i].quantity;
                itemProperties.quantity = quantityInCart + quantityProduct;
                ourCart[i] = itemProperties;
                localStorage.setItem('cart_Paris_Fabrics', JSON.stringify(ourCart));
                itemExistInCart = true;
            }
        }

        if (itemExistInCart === false) {
            itemProperties.quantity = quantityProduct;
            ourCart.push(itemProperties);
            localStorage.setItem('cart_Paris_Fabrics', JSON.stringify(ourCart));
        }
        setQuantityProduct(1);
        setNumberInCart(numberInCart + quantityProduct);
    }

    const scrollToReviews = () => {
        window.scrollTo(0, 700);
        setValue(2);
        handleChangeAccordion('panel3');
    }

    useEffect(() => {
        if (isLoaded === true) {
            let fiveStars = 0;
            let fourStars = 0;
            let threeStars = 0;
            let twoStars = 0;
            let oneStar = 0;
            let collection = {};
            for (var i = 0; i < product.reviews.length; i++) {
                if (product.reviews[i].note === '5') {
                    fiveStars++;
                }
                if (product.reviews[i].note === '4') {
                    fourStars++;
                }
                if (product.reviews[i].note === '3') {
                    threeStars++;
                }
                if (product.reviews[i].note === '2') {
                    twoStars++;
                }
                if (product.reviews[i].note === '1') {
                    oneStar++;
                }
            }
            collection.fiveStars = fiveStars;
            collection.fourStars = fourStars;
            collection.threeStars = threeStars;
            collection.twoStars = twoStars;
            collection.oneStar = oneStar;
            collection.nbOfStars = Number(oneStar + twoStars + threeStars + fourStars + fiveStars);
            setNumberOfStars(collection)
        }
    }, [product])

    const changeProduct = () => {
        setChangePage(true);
    }

    const changeImage = (image) => {
        setDefaultImage(image);
    }

    const handleReviews = () => {
        setWriteReviews(!writeReviews)
        setOpen(true);
    }

    const submitReview = () => {
        if (valueComment === 0) {
            setNoRating(true);
            return;
        }

        var newComment = {};
        newComment.description = newCommentContent;
        newComment.title = "Jean-Jacques";
        newComment.note = valueComment;
        newComment.id_user = "";
        newComment.id_product = product.id;
        axios.post("https://parisfabrics.com/api/createReview ", {
            newComment: newComment,


        }).then((res) => {
            setNewCommentContent('');
            setValueComment(0);
            setNoRating(false);
            var truc = JSON.stringify(product)
            var machin = JSON.parse(truc)

            var truc2 = JSON.stringify(allItems)
            var machin2 = JSON.parse(truc2)

            let indexItem = machin2.findIndex(element => element.name === product.name)
            machin2[indexItem].reviews[machin2[indexItem].reviews.length] = newComment;
            machin.reviews[machin.reviews.length] = newComment;
            setProduct(machin);
            setAllItems(machin2);

        }).catch((err) => {
            console.log(err);
        })
    }

    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        if (isLoaded === true) {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(product.reviews.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(product.reviews.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage, isLoaded]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % product.reviews.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    function compareAsc(a, b) {
        if (a.price < b.price) {
            return -1;
        }
        if (a.price > b.price) {
            return 1;
        }
        return 0;
    }

    function compareDesc(a, b) {
        if (a.price > b.price) {
            return -1;
        }
        if (a.price < b.price) {
            return 1;
        }
        return 0;
    }

    function highestRated(a, b) {
        if (a.note > b.note) {
            return -1;
        }
        if (a.note < b.note) {
            return 1;
        }
        return 0;
    }

    const changeFilter = (event) => {
        setFilter(event.target.value);
    };

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
                <Helmet>
                <meta charSet="utf-8" />
                <title>{product.name} - Paris Fabrics</title>
            </Helmet>
                <Grid container justifyContent="center" spacing={6}>
                    <Grid container item xs={12} sm={11} md={6} className="dispositionImageProduct">

                        <div className="productComputer">
                            {product.images.map(image => (
                                <div key={image.id}>
                                    <Grid item xs={12} onClick={() => changeImage(image.url)} ><img className="cursorPointer switchImg m-1 shadowProduct1" src={window.location.origin + `/images/${image.url}`}></img></Grid>
                                </div>
                            ))}
                        </div>
                        <div className="m-1"><img className="imageOneProduct shadowProduct1 imgAppearTransition" src={window.location.origin + `/images/${defaultImage}`} /></div>
                        <div className="flex">
                            {product.images.map(image => (
                                <div key={image.id}>
                                    <div onClick={() => changeImage(image.url)}><img className="switchImgMobile productMobile cursorPointer" src={window.location.origin + `/images/${image.url}`}></img></div>
                                </div>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={10} md={5}>
                        <div className="font10 size3 grey8 letterSpacing2 textShadow1">{product.name}</div>
                        <div className="flexBetween mt-7">
                            <span className="priceProduct font2 letterSpacing2 ">${(product.price / 100).toFixed(2)}</span>
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
                        <div className="flexBetween mt-6">
                            <Grid container justifyContent="center" >
                                <Grid item xs={11} sm={6}>
                                    <div className=" addSubstractCart flex">

                                        <div className="verticalAlign quantityProduct size2 height27 lightShadowCard2">{quantityProduct}</div>
                                        <ColorButton style={{ minWidth: '50px', minHeight: '25px', maxHeight: '25px' }} variant="contained" color="primary" onClick={addQuantity}>
                                            +
                                        </ColorButton>

                                        {quantityProduct > 1
                                            ? <ColorButton style={{ minWidth: '50px', minHeight: '25px', maxHeight: '25px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', }} size="small" variant="contained" color="primary" onClick={substractQuantity}>
                                                -
                                            </ColorButton>
                                            : <ColorButton style={{ minWidth: '50px', minHeight: '25px', maxHeight: '25px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', }} size="small" variant="contained" color="primary" >
                                                -
                                            </ColorButton>
                                        }

                                    </div>
                                </Grid>
                                <Grid item xs={11} sm={6}>
                                    <div className="divPc alignRight">
                                        <ColorButton onClick={addToLocalStorage} variant="contained" style={{ minWidth: '180px', minHeight: '25px', maxHeight: '25px', fontFamily: 'sans-serif', letterSpacing: '2px', fontWeight: '600', fontSize: '0.8em', backgroundColor: 'orange' }}> Add to cart</ColorButton>
                                    </div>
                                    <div className="divMobile">
                                        <Link to="/cart" className="textDecorationNone">
                                            <ColorButton onClick={addToLocalStorage} variant="contained" fullWidth style={{ minHeight: '25px', maxHeight: '25px', fontFamily: 'sans-serif', letterSpacing: '2px', fontWeight: '600', fontSize: '0.8em', marginTop: '20px', backgroundColor: 'orange' }}> Add to cart</ColorButton>
                                        </Link>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <div className="width90 greyLineProduct m-4"></div>
                        </div>
                        <div>
                            <div>{ReactHtmlParser(product.description)}</div>
                        </div>
                    </Grid>
                    <Grid item xs={false} md={1}></Grid>
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
                            <Tab label="Product quality" {...a11yProps(1)} />
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
                        <div>
                            hello loremp
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Grid container >
                            <Grid item sm={12} xs={12}>
                                <div className="flexBetween mt-2 mb-4">
                                    <div>
                                        {product.avg !== undefined ?
                                            <div className="flex">
                                                <div className="size11 bold600">{(Number(product.avg)).toFixed(2)}</div>
                                                <div className="height50 ml-2">
                                                    <div className="">
                                                        <Rating
                                                            size="small"
                                                            precision={0.5}
                                                            readOnly
                                                            className=""
                                                            name="simple-controlled"
                                                            value={product.avg}
                                                        />
                                                    </div>
                                                    <div className="font2 size08 grey7">based on {product.reviews.length} {product.reviews.length > 1 ? <span>reviews</span> : <span>review</span>}</div>
                                                </div>
                                            </div> : <Typography>Be the first to comment !</Typography>}
                                        <ReviewButton onClick={handleReviews} style={{ borderRadius: '3px', minWidth: '190px', marginTop: '20px', letterSpacing: '1px', wordSpacing: '3px', }}>write a review</ReviewButton>
                                        <div>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogActions className="mb--3  mr-2">
                                                    <ClearIcon onClick={handleClose} className=" cursorPointer" />
                                                </DialogActions>
                                                <DialogTitle id="alert-dialog-title">{"You must be registered to write a review !"}</DialogTitle>
                                                {/* <h3 className="centerText">You must be registered to let a review !</h3> */}
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        <Grid container>
                                                            <Grid item xs={12} sm={6} >
                                                                <Box m={1}>
                                                                    <Link to="/Connect" className="textDecorationNone">
                                                                        <LinkButton fullWidth variant="contained">Connect</LinkButton>
                                                                    </Link>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Box m={1}>
                                                                    <Link to="/Signup" className="textDecorationNone grey9">
                                                                        <LinkButton fullWidth variant="contained">Register now</LinkButton>
                                                                    </Link>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </DialogContentText>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                        {/* <div>Notre examiner le lignes directires aide les clients à rédiger des avis honnetes</div> */}
                                    </div>
                                    <div className="">
                                        <div>
                                            <div className="flex">
                                                <div className="numberStars mr-1 bold800 width20 alignRight grey7"><StarRateIcon style={{ fill: "orange", position: "relative", bottom: '2px' }} />{numberOfStars.fiveStars}</div>
                                                <Line percent={(numberOfStars.fiveStars / numberOfStars.nbOfStars) * 100} strokeWidth="1" strokeColor="orange" trailColor="grey" className="progressBar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex">
                                                <div className="numberStars mr-1 bold800 width20 alignRight grey7"><StarRateIcon style={{ fill: "orange", position: "relative", bottom: '2px' }} />{numberOfStars.fourStars}</div>
                                                <Line percent={(numberOfStars.fourStars / numberOfStars.nbOfStars) * 100} strokeWidth="1" strokeColor="orange" trailColor="grey" className="progressBar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex">
                                                <div className="numberStars mr-1 bold800 width20 alignRight grey7"><StarRateIcon style={{ fill: "orange", position: "relative", bottom: '2px' }} />{numberOfStars.threeStars}</div>
                                                <Line percent={(numberOfStars.threeStars / numberOfStars.nbOfStars) * 100} strokeWidth="1" strokeColor="orange" trailColor="grey" className="progressBar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex">
                                                <div className="numberStars mr-1 bold800 width20 alignRight grey7"><StarRateIcon style={{ fill: "orange", position: "relative", bottom: '2px' }} />{numberOfStars.twoStars}</div>
                                                <Line percent={(numberOfStars.twoStars / numberOfStars.nbOfStars) * 100} strokeWidth="1" strokeColor="orange" trailColor="grey" className="progressBar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex">
                                                <div className="numberStars mr-1 bold800 width20 alignRight grey7"><StarRateIcon style={{ fill: "orange", position: "relative", bottom: '2px' }} />{numberOfStars.oneStar}</div>
                                                <Line percent={(numberOfStars.oneStar / numberOfStars.nbOfStars) * 100} strokeWidth="1" strokeColor="orange" trailColor="grey" className="progressBar" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                        {writeReviews === true &&
                            <div className="mb-3">
                                <div className="flexBetween">
                                    <Rating
                                        precision={1}
                                        className="mb--5"
                                        name="simple-controlled"
                                        value={valueComment}
                                        onChange={(event, newValue) => {
                                            setValueComment(newValue);
                                        }}
                                        emptyIcon={
                                            <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                        }
                                    />
                                    <div className="mr-4 cursorPointer hoverUnderlined grey7" onClick={handleReviews}>close</div>
                                </div>
                                {noRating &&
                                    <div className="errorRating textRed">
                                        You must chose a note !
                                    </div>
                                }
                                <TextField
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    maxRows={10}
                                    label="Your comment"
                                    className="mt--5"
                                    value={newCommentContent}
                                    onChange={(e) => setNewCommentContent(e.target.value)}
                                ></TextField>
                                <ButtonSubmitComment variant="contained" onClick={submitReview} style={{ minWidth: '140px', marginBottom: '15px', marginTop: '10px', letterSpacing: '1px', wordSpacing: '3px', }}>Submit</ButtonSubmitComment>
                            </div>
                        }


                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={<ArrowForwardIosIcon />}
                            previousLabel={<ArrowBackIosIcon />}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            renderOnZeroPageCount={null}
                            pageClassName="pageClassName"
                            containerClassName="containerClassName"
                            pageLinkClassName="pageLinkClassNameReview"
                            activeLinkClassName="activeLinkClassName"
                            previousLinkClassName="previousLinkClassName"
                            nextLinkClassName="nextLinkClassName"
                            pageClassName="pageClassName"
                            previousClassName="previousClassName"
                            nextClassName="nextClassName"
                            breakClassName="breakClassName"
                        />
                        {/* <div className="flexBetween">
                            <div className="flexEnd grey7 ml-3 size09 mb-2">Reviews from {itemOffset} to {itemOffset + itemsPerPage}</div>
                            <div>
                                <FormControl variant="outlined" size="small" className="widthFormControl">
                                    <InputLabel htmlFor="age-native-simple">Filter by</InputLabel>
                                    <Select
                                        native
                                        value={filter}
                                        onChange={changeFilter}
                                        fullWidth
                                        label="Filter by"
                                        inputProps={{
                                            name: 'Filter',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <option className="optionSelect pl-1 pr-1 verticalItem" value={10}>Default</option>
                                        <option className="optionSelect pl-1 pr-1 verticalItem" value={20}>The most recent</option>
                                        <option className="optionSelect pl-1 pr-1 verticalItem" value={30}>The highest-rated</option>
                                    </Select>
                                </FormControl>
                            </div>
                        </div> */}
                        <div className="mt-4"></div>
                        {currentItems && currentItems.map((review, index) => (
                            <div key={index} className="lightShadowCard2 p-3 mb-5 bgWhite">
                                <Grid container className="flexBetween">
                                    <Grid item sm={10} xs={12}>
                                        <div className="mb-2 flexStart">
                                            <span className="mr-2"><AccountCircleIcon /></span>
                                            <span className="font5 bold600 grey8">{review.title}</span>
                                            {/* <span className="ml-3 bold500 size08 font07 grey6">{review.created_at}</span> */}
                                        </div>
                                        <div>
                                            <span className="font2 grey6">{review.description}</span>
                                        </div>
                                    </Grid>

                                    <Grid item sm={2} xs={12}>
                                        <div className="starsProductReview marginTop600px opacity8">
                                            <Rating
                                                size="small"
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
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChangeAccordion('panel3')} className="productMobile" style={{ width: '100vw' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                            >
                                <div>Reviews ({product.reviews.length})</div>
                            </AccordionSummary>
                            <AccordionDetails className="flexColumn">






                                <div className="mlw-1 mb-4 ">
                                    <div>
                                        {product.avg !== undefined ?
                                            <div className="flex">
                                                <div className="size11 bold600">{(Number(product.avg)).toFixed(2)}</div>
                                                <div className="height50 ml-2">
                                                    <div className="">
                                                        <Rating
                                                            size="small"
                                                            precision={0.5}
                                                            readOnly
                                                            className=""
                                                            name="simple-controlled"
                                                            value={product.avg}
                                                        />
                                                    </div>
                                                    <div className="font2 size08 grey7">based on {product.reviews.length} {product.reviews.length > 1 ? <span>reviews</span> : <span>review</span>}</div>
                                                </div>
                                            </div>
                                            : <Typography>Be the first to comment !</Typography>}
                                        <ReviewButtonMobile onClick={handleReviews} style={{ borderRadius: '3px', minWidth: '190px', marginTop: '10px', paddingTop: '5px', letterSpacing: '1px', wordSpacing: '3px', }}>write a review</ReviewButtonMobile>
                                    </div>
                                    <div className="mt-4">
                                        <div>
                                            <div className="flex">
                                                <div className="numberStars mr-1 bold800 width20 alignRight grey7"><StarRateIcon style={{ fill: "orange", position: "relative", bottom: '2px' }} />{numberOfStars.fiveStars}</div>
                                                <Line percent={(numberOfStars.fiveStars / numberOfStars.nbOfStars) * 100} strokeWidth="1" strokeColor="orange" trailColor="grey" className="progressBar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex">
                                                <div className="numberStars mr-1 bold800 width20 alignRight grey7"><StarRateIcon style={{ fill: "orange", position: "relative", bottom: '2px' }} />{numberOfStars.fourStars}</div>
                                                <Line percent={(numberOfStars.fourStars / numberOfStars.nbOfStars) * 100} strokeWidth="1" strokeColor="orange" trailColor="grey" className="progressBar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex">
                                                <div className="numberStars mr-1 bold800 width20 alignRight grey7"><StarRateIcon style={{ fill: "orange", position: "relative", bottom: '2px' }} />{numberOfStars.threeStars}</div>
                                                <Line percent={(numberOfStars.threeStars / numberOfStars.nbOfStars) * 100} strokeWidth="1" strokeColor="orange" trailColor="grey" className="progressBar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex">
                                                <div className="numberStars mr-1 bold800 width20 alignRight grey7"><StarRateIcon style={{ fill: "orange", position: "relative", bottom: '2px' }} />{numberOfStars.twoStars}</div>
                                                <Line percent={(numberOfStars.twoStars / numberOfStars.nbOfStars) * 100} strokeWidth="1" strokeColor="orange" trailColor="grey" className="progressBar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex">
                                                <div className="numberStars mr-1 bold800 width20 alignRight grey7"><StarRateIcon style={{ fill: "orange", position: "relative", bottom: '2px' }} />{numberOfStars.oneStar}</div>
                                                <Line percent={(numberOfStars.oneStar / numberOfStars.nbOfStars) * 100} strokeWidth="1" strokeColor="orange" trailColor="grey" className="progressBar" />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {writeReviews === true &&
                                    <div className="mb-3">
                                        <div>
                                            <Rating
                                                precision={1}
                                                className="mb--5"
                                                name="simple-controlled"
                                                value={valueComment}
                                                onChange={(event, newValue) => {
                                                    setValueComment(newValue);
                                                }}
                                                emptyIcon={
                                                    <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                                }
                                            />
                                        </div>
                                        {noRating &&
                                            <div className="errorRating textRed">
                                                You must chose a note !
                                            </div>
                                        }
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            maxRows={10}
                                            label="Your comment"
                                            className="mt--5"
                                            value={newCommentContent}
                                            onChange={(e) => setNewCommentContent(e.target.value)}
                                        ></TextField>
                                        <ButtonSubmitComment variant="contained" onClick={submitReview} style={{ minWidth: '140px', marginBottom: '15px', marginTop: '10px', letterSpacing: '1px', wordSpacing: '3px', }}>Submit</ButtonSubmitComment>
                                    </div>
                                }
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel={<ArrowForwardIosIcon />}
                                    previousLabel={<ArrowBackIosIcon />}
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={1}
                                    pageCount={pageCount}
                                    renderOnZeroPageCount={null}
                                    pageClassName="pageClassName"
                                    containerClassName="containerClassName"
                                    pageLinkClassName="pageLinkClassNameReview"
                                    activeLinkClassName="activeLinkClassName"
                                    previousLinkClassName="previousLinkClassName"
                                    nextLinkClassName="nextLinkClassName"
                                    pageClassName="pageClassName"
                                    previousClassName="previousClassName"
                                    nextClassName="nextClassName"
                                    breakClassName="breakClassName"
                                />
                                <div className="mt-4"></div>
                                {currentItems && currentItems.map((review, index) => (
                                    <div key={index} className="lightShadowCard2 p-3 mb-5 minWidth500 bgWhite">
                                        <Grid container className="flexBetween" >
                                            <Grid item sm={10} xs={12}>
                                                <div className="mb-2 flex">
                                                    <div className="mr-2"><AccountCircleIcon /></div>
                                                    <div className="font5 bold600 grey8">{review.title}</div><br />
                                                    <div className="ml-3 bold500 size08 font07 grey6">{review.created_at}</div>
                                                </div>
                                                <div>
                                                    <div className="font2 grey6 width100">{review.description}</div>
                                                </div>
                                            </Grid>

                                            <Grid item sm={2} xs={12}>
                                                <div className="starsProductReview marginTop600px opacity8">
                                                    <Rating
                                                        size="small"
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

                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>

                <Grid className="pt-7" container justifyContent="center">
                    <Grid item xs={11} md={11}>
                        <div className="mt-10 mb-3">
                            <div className="flexCenter"><img src={reward} alt="reward_svg" className="rewardIcon opacity6" /></div>
                            <span className="flexCenter font8 size7 mt-3 bold600 bestSellers opacity9 letterSpacing2">Our customers also like ...</span>
                        </div>
                        {isLoaded &&
                            <div className="">
                                <Carousel
                                    responsive={bestSellersCarousel}
                                    infinite={true}
                                >
                                    {bestSellers.map(item => (
                                        <div className="cardProductCarousel lightShadowCard2" key={item.id}>
                                            <Link onClick={changeProduct} to={`/${item.name} `} className="textDecorationNone">
                                                <img className="imageProductCarousel" src={window.location.origin + `/images/${item.images[0].url}`} />
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
                                                <div className="priceProduct font2 grey8 letterSpacing2 mt-2 ml-3 pb-1 opacity9">${(item.price / 100).toFixed(2)}</div>
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
