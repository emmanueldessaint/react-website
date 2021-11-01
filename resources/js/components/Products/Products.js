import React, { useState, useEffect  } from 'react';
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

    
    var itemsByPage = 12;
    var increment = 1; 
    var emptyArray = [];

    useEffect(() => {
        fetch("http://localhost:8000/api/products")
          .then(res => res.json())
          .then(
            (result) => {
              
                let newArray= [];

                newArray = result.products.slice(itemsByPage*(actuelPage-1),itemsByPage*(actuelPage));
                setItems(result.products);       
                for (var i = 0; i < result.products.length/itemsByPage; i++) {
                    emptyArray.push(increment)
                    console.log(' 1 page')
                    increment++
                }   

                setNumberOfPages(emptyArray); 
                setItemsInCurrentPage(newArray)
                setIsLoaded(true);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])   

    const consoleFunction = () => {
        console.log(items)
    }

    const handleChangePage = (item) => {
        let arrayWithItemsOnPage = [];
        let arrayWithAllItems = [...items];
        arrayWithItemsOnPage = arrayWithAllItems.slice(itemsByPage*(item-1),itemsByPage*(item));
        setItemsInCurrentPage(arrayWithItemsOnPage);
        window.scrollTo(0, 0);
        setActuelPage(item);
    }
      
    
    if (error) {
        return <div className={classes.marginTop}>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className={classes.marginTop}>Loading...</div>;
    } else {
        return(     
            <Container className="pt-15">
                <Grid container justifyContent="center">   
                    <Grid container item xs={12} sm={11} md={10}>            
                        {itemsInCurrentPage.map(item => (                    
                            <Grid 
                                item xs={12} sm={6} md={4} lg={3} 
                                key={item.id}                                                 
                            >
                                <div className="cardProduct lightShadowCard">   
                                    <Link to={{ pathname: '/product', state: { product : item } }}>                                
                                        <img className="imageProduct" src="https://picsum.photos/200/300"/>
                                        <div className="nameProduct flexCenter">{item.name}</div>                                  
                                        <div className="priceProduct mt-4 ml-3 pb-1">{item.price},00 €</div> 
                                    </Link>                                  
                                </div>      
                            </Grid>                    
                        ))}    
                    </Grid>               
                </Grid>
                <Grid container justifyContent="center" className="mt-10">   
                    <Grid container item justifyContent="center" xs={12} sm={11} md={10}>   
                        <div className="flex">
                            {numberOfPages.map(item => (                    
                                <div   
                                                             
                                    key={item}                                                 
                                >
                                    <button className="boutonPagination testDiv" onClick={() => handleChangePage(item)}>{item}</button> 
                                </div>                    
                            ))}  
                        </div>
                        
                    </Grid>
                </Grid>

            </Container>
        )
    }
}