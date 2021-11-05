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
import Rating from '@mui/material/Rating';
import StarBorderIcon from "@material-ui/icons/StarBorder";
 
  

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
                let averageNote = 0;                
                let newArray= [];               
                newArray = result.products.slice(itemsByPage*(actuelPage-1),itemsByPage*(actuelPage));
                setItems(result.products);       
                for (var i = 0; i < result.products.length/itemsByPage; i++) {
                    emptyArray.push(increment)
                    increment++
                }   
                for (let j = 0; j < newArray.length; j ++) {
                    let totalNotes = 0;
                    for (let k = 0; k < newArray[j].reviews.length; k++) {
                        totalNotes += newArray[j].reviews[k].note;                                             
                    }                    
                    averageNote = totalNotes/newArray[j].reviews.length;
                    newArray[j].updated_at = averageNote;                   
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

    const handleTest = () => {
        console.log(actuelPage)
    }

    const averageNote = (item) => {
        console.log(item)
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
                <Grid container justifyContent="center" className="mt-10">   
                    <Grid container item  xs={12} sm={11} md={10}>   
                        <div className="flex ml-3 mb-5 lightShadowCard">
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
                                                    <div className="grey1">({item.reviews.length})</div> 
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