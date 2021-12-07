import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import '../../App.css';
import '../../css/Products.css';
import { numberOfPageProducts } from '../Shared/globalState'
import { currentPageProduct } from '../Shared/globalState'
import { useRecoilState } from 'recoil';
import Rating from '@mui/material/Rating';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { itemsProduct, numberOfItemsInCart } from '../Shared/globalState'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: 10,
        },
    },
}));

export default function Products() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [error, setError] = useState(null);
    const [numberInCart, setNumberInCart] = useRecoilState(numberOfItemsInCart);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [numberOfPages, setNumberOfPages] = useRecoilState(numberOfPageProducts);
    const [itemsInCurrentPage, setItemsInCurrentPage] = useState([]);
    const [actuelPage, setActuelPage] = useRecoilState(currentPageProduct);
    const [filter, setFilter] = useState(10);
    const [allItems, setAllItems] = useRecoilState(itemsProduct);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    var itemsByPage = 12;
    var increment = 1;
    var emptyArray = [];

    useEffect(() => {
        if (allItems.length !== 0) {
            scroll(0, 0);
            let newArray = [];
            newArray = allItems.slice(itemsByPage * (actuelPage - 1), itemsByPage * (actuelPage));
            for (var i = 0; i < allItems.length / itemsByPage; i++) {
                emptyArray.push(increment)
                increment++
            }
            setItemsInCurrentPage(newArray)
            setNumberOfPages(emptyArray);
            setIsLoaded(true);
        }
    }, [allItems, actuelPage])

    const addToCart = (item) => {
        setOpen(true);
        var ourCart = JSON.parse(localStorage.getItem("cart_Paris_Fabrics"));

        let itemProperties = {
            id: `${item.id}`,
            name: `${item.name}`,
            price: `${item.price}`,
            image: `${item.images[0].url}`,
            quantity: 1
        }
        var itemExistInCart = false;
        if (ourCart === null) {
            localStorage.setItem('cart_Paris_Fabrics', JSON.stringify([itemProperties]));
            setNumberInCart(numberInCart + 1);
            return;
        }
        for (var i = 0; i < ourCart.length; i++) {
            if (ourCart[i].name === item.name) {
                ourCart[i].quantity++;
                localStorage.setItem('cart_Paris_Fabrics', JSON.stringify(ourCart));
                itemExistInCart = true;
            }
        }
        if (itemExistInCart === false) {
            ourCart.push(itemProperties);
            localStorage.setItem('cart_Paris_Fabrics', JSON.stringify(ourCart));
        }
        setNumberInCart(numberInCart + 1);

    }

    const handleChangePage = (item) => {
        let arrayWithItemsOnPage = [];
        let arrayWithAllItems = [...items];
        arrayWithItemsOnPage = arrayWithAllItems.slice(itemsByPage * (item - 1), itemsByPage * (item));
        setItemsInCurrentPage(arrayWithItemsOnPage);
        window.scrollTo(0, 0);
        setActuelPage(item);
    }

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

    function comparePopularity(a, b) {
        if (a.reviews.length > b.reviews.length) {
            return -1;
        }
        if (a.reviews.length < b.reviews.length) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        console.log("go filter useEffect")
        if (filter === 10) {
            console.log("go filter 10")
            let array = [...allItems]
            array.sort(comparePopularity);
            setAllItems(array);
            
        }
        if (filter === 20) {
            console.log("go filter 20")
            let array = [...allItems]
            array.sort(compareAsc);
            setAllItems(array);
        }
        if (filter === 30) {
            let array = [...allItems]
            array.sort(compareDesc);
            setAllItems(array);
        }
    }, [filter])

    const changeFilter = (event) => {
        setFilter(event.target.value);
        
    };

    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 12;

    useEffect(() => {
        if (isLoaded === true) {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(allItems.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(allItems.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage, isLoaded]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % allItems.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    if (error) {
        return <div >Error: {error.message}</div>;
    } else if (!isLoaded) {
        // return <div className="mt-15 font2 size8 bold700">Loading...</div>;
        return <div className="marginSpinner"><div className="loader">Loading...</div>;</div>
    } else {
        return (
            <Container className="pt-13">
                <Grid container justifyContent="center" className="mt-8">
                    <Grid container item xs={12} sm={12} md={11} lg={11}>
                        <Grid item xs={12} sm={6}>
                            <div className="flex ml-5 mb-5 divPaginationComputer">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=""
                                    previousLabel=""
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={1}
                                    pageCount={pageCount}
                                    renderOnZeroPageCount={null}
                                    pageClassName="pageClassName"
                                    containerClassName="containerClassName"
                                    pageLinkClassName="pageLinkClassName"
                                    activeLinkClassName="activeLinkClassName"
                                    previousLinkClassName="previousLinkClassName"
                                    nextLinkClassName="nextLinkClassName"
                                    pageClassName="pageClassName"
                                    previousClassName="previousClassName"
                                    nextClassName="nextClassName"
                                    breakClassName="breakClassName"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="divPc alignRight mr-4">
                                <FormControl variant="outlined" size="small" className="widthFormControl" >
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
                                          style={{backgroundColor:'white'}}
                                    >
                                        <option className="optionSelect pl-1 pr-1 verticalItem" value={10}>Popularity</option>
                                        <option className="optionSelect pl-1 pr-1 verticalItem" value={20}>Ascending price order</option>
                                        <option className="optionSelect pl-1 pr-1 verticalItem" value={30}>Descending price order</option>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="divMobile mr-4">
                                <FormControl size="small" className="widthFormControl">
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
                                        <option className="optionSelect pl-1 pr-1 verticalItem" value={10}>Popularity</option>
                                        <option className="optionSelect pl-1 pr-1 verticalItem" value={20}>Ascending price order</option>
                                        <option className="optionSelect pl-1 pr-1 verticalItem" value={30}>Descending price order</option>
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" className="productComputer">
                    <Grid container item xs={12} sm={12} md={12} xl={11}>
                        <div className="contentProducts">
                        {itemsInCurrentPage.map((item,index) => (

                                <div className="cardProduct lightShadowCard2 productComputer" key={index}>
                                    <Link to={`/${item.name} `} >
                                        <img className="imageProduct" src={window.location.origin + `/images/${item.images[0].url}`} />
                                        <div className="hideProduct">
                                            <div className="elementAppear">
                                                DISCOVER
                                            </div>
                                        </div>
                                        <div className="nameProduct font10 letterSpacing2 size3 grey8 flexCenter">{item.name}</div>
                                        <div className="flexBetween font2">
                                            <div className="priceProduct grey8 letterSpacing2 mt-4 ml-3 pb-1">${(item.price/100).toFixed(2)}</div>
                                            {item.reviews.length > 0 &&
                                                <div className="flex productDetails mt-4 mr-3 pb-1 opacity8">
                                                    <div className="">({item.reviews.length})<span className="ml-1"></span></div>
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
                                            }
                                        </div>
                                    </Link>

                                </div>
                                // <Grid
                                //     item xs={12} sm={6} md={4} lg={3}
                                //     key={item.id}
                                // >

                                // </Grid>
                            ))}
                        </div>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" className="productMobile">
                    <Grid container item xs={12} sm={12} md={11} xl={10}>
                        {itemsInCurrentPage.map(item => (
                            <Grid
                                item xs={12}
                                key={item.id}
                            >
                                <div>
                                    <div className="flex productMobile productMobileCatalog mb-3 mt-3">
                                        <Link to={`/${item.name} `} style={{ width: '40vw' }} ><img className="imageProductMobile cursorPointer" src={window.location.origin + `/images/${item.images[0].url}`} /></Link>
                                        <div className="pl-2 width100">
                                            <Link to={`/${item.name} `} ><div className="mt-1 font10 letterSpacing2 grey7 cursorPointer">{item.name}</div> </Link>
                                            <Link to={`/${item.name} `} >
                                                {item.reviews.length > 0 &&
                                                    <div className="flex productDetails mt-1 opacity6 cursorPointer">
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
                                                        <div className="ml-1">({item.reviews.length})<span className="ml-1"></span></div>
                                                    </div>
                                                }
                                            </Link>
                                            <div className="flexBetween ">
                                                <Link to={`/${item.name} `} ><div className="mt-4 cursorPointer">${(item.price/100).toFixed(2)}</div></Link>
                                                <div className="flexEnd opacity8 cursorPointer" onClick={() => addToCart(item)}><AddShoppingCartIcon /></div>
                                                <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                                                    <div className="bgSuccess opacity9 bgBlue pl-5 pr-5 font2 p-1  bold200 textWhite borderRadius5 boxShadowButton" onClose={handleClose} severity="success">
                                                        <span><CheckCircleOutlineIcon className="mb-1" /></span><span className="ml-3 size2 mt-3 font2">item added to cart !</span>
                                                    </div>
                                                </Snackbar>
                                                {/* <div className="bgSuccess opacity9 bgBlue pl-4 pr-4 font2 p-2 grey8 bold500 textWhite borderRadius3 boxShadowButton" onClose={handleClose} severity="success">
                                                        <span><CheckCircleOutlineIcon /></span><span className="ml-3 size2">Item added to cart !</span>
                                                    </div> */}


                                                {/* onClick={() => addToCart(item)} */}
                                                {/* <Alert severity="success">This is a success message!</Alert> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="greyBarProductMobile"></div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" className="mt-10">
                    <Grid container item justifyContent="center" xs={12} sm={11} md={10}>
                        <div className="flex lightShadowCard">
                            {numberOfPages.map(item => (
                                <div
                                    key={item}
                                >
                                    {item === actuelPage
                                        ? <button className="boutonPaginationSelected  generalBackground" onClick={() => handleChangePage(item)}>{item}</button>
                                        : <button className="boutonPagination generalBackground" onClick={() => handleChangePage(item)}>{item}</button>
                                    }
                                </div>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}