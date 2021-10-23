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
 
  

  const useStyles = makeStyles(theme => ({
    marginTop: {
        marginTop: 200,
    }
}));


export default function Products() {

    const classes = useStyles();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState([]);
    const [actualPage, setActualPage] = useState(1);
    const [itemsInCurrentPage, setItemsInCurrentPage] = useState([]);
    var itemsByPage = 12;
    var a = 1; 
    var emptyArray = [];

    useEffect(() => {
        fetch("http://localhost:8000/api/products")
          .then(res => res.json())
          .then(
            (result) => {
              
                let newArray= [];
               
                newArray = result.products.slice(0,itemsByPage);
                setItems(result.products);       
                for (var i = 0; i < result.products.length/itemsByPage; i++) {
                    emptyArray.push(a)
                    console.log(' 1 page')
                    a++
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
        if (item === 1) {
            arrayWithItemsOnPage = arrayWithAllItems.slice(0,itemsByPage);
            console.log(arrayWithItemsOnPage);
        }
        if (item === 2) {
            arrayWithItemsOnPage = arrayWithAllItems.slice(itemsByPage,itemsByPage*2);
            console.log(arrayWithItemsOnPage);
        }   
        if (item === 3) {
            arrayWithItemsOnPage = arrayWithAllItems.slice(itemsByPage*2,itemsByPage*3);
            console.log(arrayWithItemsOnPage);
        }   
        if (item === 4) {
            arrayWithItemsOnPage = arrayWithAllItems.slice(itemsByPage*3,itemsByPage*4);
            console.log(arrayWithItemsOnPage);
        }   
        setItemsInCurrentPage(arrayWithItemsOnPage);
        window.scrollTo(0, 0);
    }
      
    
    if (error) {
        return <div className={classes.marginTop}>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className={classes.marginTop}>Loading...</div>;
    } else {
        return(     
            <Container className={classes.marginTop}>
                <Grid container justifyContent="center">   
                    <Grid container xs={12} sm={11} md={10}>            
                        {itemsInCurrentPage.map(item => (                    
                            <Grid 
                                item xs={12} sm={6} md={4} lg={3} 
                                key={item.id}                                                 
                            >
                                <div className="cardProduct lightShadowCard">   
                                    <Link to={{ pathname: '/product', state: { product : item } }}>                                
                                        <img className="imageProduct" src="https://picsum.photos/200/300"/>
                                        <div className="nameProduct flexCenter">{item.name}</div>                                  
                                        <div className="priceProduct">{item.price},00 €</div> 
                                    </Link>                                  
                                </div>      
                            </Grid>                    
                        ))}    
                    </Grid>               
                </Grid>
                <Grid container justifyContent="center" className="mt-10">   
                    <Grid container justifyContent="center" xs={12} sm={11} md={10}>   
                        <div className="flex">
                            {numberOfPages.map(item => (                    
                                <div                             
                                    key={item}                                                 
                                >
                                    <Button  onClick={() => handleChangePage(item)}>{item}</Button> 
                                </div>                    
                            ))}  
                        </div>
                    </Grid>
                </Grid>

            </Container>
        )
    }
}