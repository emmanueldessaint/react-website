import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
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



const useStyles = makeStyles(theme => ({

}));


export default function Products() {

    const classes = useStyles();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [numberOfPages, setNumberOfPages] = useRecoilState(numberOfPageProducts);
    const [itemsInCurrentPage, setItemsInCurrentPage] = useState([]);
    const [actuelPage, setActuelPage] = useRecoilState(currentPageProduct);
    const [age, setAge] = useState('');


    var itemsByPage = 12;
    var increment = 1;
    var emptyArray = [];

    useEffect(() => {
        fetch("http://localhost:8000/api/products")
            .then(res => res.json())
            .then(
                (result) => {
                    
                    let averageNote = 0;
                    let newArray = [];
                    let allProducts = [];
                    allProducts = result.products
                    console.log(allProducts.length)
                    for (let j = 0; j < allProducts.length; j++) {
                        let totalNotes = 0;
                        for (let k = 0; k < allProducts[j].reviews.length; k++) {
                            totalNotes += allProducts[j].reviews[k].note;
                        }
                        averageNote = totalNotes / allProducts[j].reviews.length;
                        allProducts[j].updated_at = averageNote;
                    }
                    setItems(allProducts);
                    newArray = allProducts.slice(itemsByPage * (actuelPage - 1), itemsByPage * (actuelPage));                 
                    for (var i = 0; i < allProducts.length / itemsByPage; i++) {
                        emptyArray.push(increment)
                        increment++
                    }                   
                    console.log('useEffect')
                    setNumberOfPages(emptyArray);
                    setItemsInCurrentPage(newArray)
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const handleChangePage = (item) => {
        let arrayWithItemsOnPage = [];
        let arrayWithAllItems = [...items];
        arrayWithItemsOnPage = arrayWithAllItems.slice(itemsByPage * (item - 1), itemsByPage * (item));
        setItemsInCurrentPage(arrayWithItemsOnPage);
        window.scrollTo(0, 0);
        setActuelPage(item);
    }

    const handleChange = (event) => {
        setAge(event.target.value);
      };
 
    if (error) {
        return <div className={classes.marginTop}>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className={classes.marginTop}>Loading...</div>;
    } else {
        return (
            <Container className="pt-15">
                <Grid container justifyContent="center" className="mt-10">
                    <Grid container item xs={12} sm={12} lg={11}>
                        <Grid item xs={12}>
                            <div className="flex">
                                <button className="buttonCategory p-2 pl-4 pr-4 mb-8 ml-4 font5 bold500">Category 1</button>
                                <button className="buttonCategory p-2 pl-4 pr-4 mb-8 ml-4 font5 bold500">Category 2</button>
                                <button className="buttonCategory p-2 pl-4 pr-4 mb-8 ml-4 font5 bold500">Category 3</button>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="flex ml-5 mb-5 ">
                                {/* lightShadowCard */}
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
                            <div className="alignRight">
                                <FormControl className="widthFormControl">
                                    <InputLabel><span className="ml-4"></span>Filter by</InputLabel>
                                    <Select
                                        variant="outlined"
                                        value={age}
                                        onChange={handleChange}
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
                <Grid container justifyContent="center">
                    <Grid container item xs={12} sm={12} xl={10}>
                        {itemsInCurrentPage.map(item => (
                            <Grid
                                item xs={12} sm={6} md={4} lg={3}
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
                                        <div className="nameProduct flexCenter font1">{item.name}</div>
                                        <div className="flexBetween font2">
                                            <div className="priceProduct mt-4 ml-3 pb-1">${item.price}.00</div>


                                            {item.reviews.length > 0 &&
                                                <div className="flex productDetails mt-4 mr-3 pb-1">
                                                    <div className="grey1">({item.reviews.length})<span className="ml-1"></span></div>
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
                                            }

                                        </div>
                                    </Link>
                                </div>
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