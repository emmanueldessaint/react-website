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
import { itemsProduct } from '../Shared/globalState'


export default function Products() {


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [numberOfPages, setNumberOfPages] = useRecoilState(numberOfPageProducts);
    const [itemsInCurrentPage, setItemsInCurrentPage] = useState([]);
    const [actuelPage, setActuelPage] = useRecoilState(currentPageProduct);
    const [filter, setFilter] = useState('');
    const [allItems, setAllItems] = useRecoilState(itemsProduct);

    var itemsByPage = 12;
    var increment = 1;
    var emptyArray = [];

    useEffect(() => {
        if (allItems.length !== 0) {
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
        if (filter === 10) {
            let array = [...allItems]
            array.sort(comparePopularity);
            setAllItems(array);
        }
        if (filter === 20) {
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
                        {/* <Grid item xs={12}>
                            <div className="flex">
                                <button className="buttonCategory p-2 pl-4 pr-4 mb-8 ml-4 font5 bold500">Category 1</button>
                                <button className="buttonCategory p-2 pl-4 pr-4 mb-8 ml-4 font5 bold500">Category 2</button>
                                <button className="buttonCategory p-2 pl-4 pr-4 mb-8 ml-4 font5 bold500">Category 3</button>
                            </div>
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                            <div className="flex ml-5 mb-5 ">
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
                        <Grid item xs={12} sm={6}>
                            <div className="alignRight mr-4">
                                <FormControl className="widthFormControl">
                                    <InputLabel><span className="ml-4"></span>Filter by</InputLabel>
                                    <Select
                                        variant="outlined"
                                        onChange={changeFilter}
                                        fullWidth
                                        className="testSelect"
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
                    <Grid container item xs={12} sm={12} md={11} xl={10}>
                        {itemsInCurrentPage.map(item => (
                            <Grid
                                item xs={12} sm={6} md={4} lg={3}
                                key={item.id}
                            >
                                <div className="cardProduct lightShadowCard2 productComputer">
                                    <Link to={`/product/${item.name} `} >
                                        <img className="imageProduct" src="https://picsum.photos/200/300" />
                                        <div className="hideProduct">
                                            <div className="elementAppear">
                                                DISCOVER
                                            </div>
                                        </div>
                                        <div className="nameProduct font10 letterSpacing2 size3 grey8 flexCenter">{item.name}</div>
                                        <div className="flexBetween font2">
                                            <div className="priceProduct grey8 letterSpacing2 mt-4 ml-3 pb-1">${item.price}.00</div>
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
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" className="productMobile">
                    <Grid container item xs={12} sm={12} md={11} xl={10}>
                        {itemsInCurrentPage.map(item => (
                            <Grid
                                item xs={12}
                                key={item.id}
                            >
                                <Link to={`/product/${item.name} `} >
                                    <div className="flex productMobile productMobileCatalog mb-3 mt-3">

                                        <img className="imageProductMobile" src="https://picsum.photos/200/300" />
                                        <div className="ml-2">
                                            <div className="mt-1 font10 letterSpacing2 grey7">{item.name}</div>
                                            {item.reviews.length > 0 &&
                                                <div className="flex productDetails mt-1 opacity6">
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
                                            <div className="mt-4">${item.price}.00</div>
                                        </div>

                                    </div>
                                </Link>
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