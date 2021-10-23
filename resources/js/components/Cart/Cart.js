import { useState, useEffect  } from 'react';
import * as React from 'react';
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
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
 
  import YouTubeIcon from '@material-ui/icons/YouTube';
  import '../../css/Cart.css';

// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";

  const useStyles = makeStyles(theme => ({
    marginTop: {
        marginTop: 200,
        
    }
    
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: 20,
    textAlign: 'center',
    color: theme.palette.text.secondary,

  }));

 



export default function Cart() { 

    const classes = useStyles();
    var myArray = [];
    const [itemsInCart, setItemsInCart] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // const textState = atom({
    //   key: 'textState', // unique ID (with respect to other atoms/selectors)
    //   default: '', // valeur par défaut (alias valeur initials)
    // });
    // const onChange = (event) => {
    //   setText(event.target.value);
    // };


    // for(var i=0; i < localStorage.length; i++) {
    //   var key = localStorage.key(i);
    //   var value = JSON.parse(localStorage[key]);
    //   myArray.push(value)
    //   count += (value.quantity * value.price)
    //   console.log(myArray)
    //   console.log(value)
      
    // }         

    useEffect(() => {
      for (var i = 0 ; i < localStorage.length ; i ++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage[key]);
        itemsInCart.push(value);
      }
      console.log("useeffect")
      setIsLoaded(true);      
    }, [])  
    
    const addQuantityInCart = (product) => {
      var thisArray = [...itemsInCart];
      var find = thisArray.find(element => element.name === product.name).quantity++;
      var findPlus = find + 1;
      var itemProperties = {
        id: `${product.id}`,
        name: `${product.name}`,
        price: `${product.price}`,
        quantity: findPlus,
     }
      setItemsInCart(thisArray);
      localStorage.setItem(`${product.name}`, JSON.stringify(itemProperties));
    }
    const substractQuantityInCart = (product) => {
      var thisArray = [...itemsInCart];
      var find = thisArray.find(element => element.name === product.name).quantity--;
      if (find > 1) {
        var findPlus = find - 1;
        var itemProperties = {
          id: `${product.id}`,
          name: `${product.name}`,
          price: `${product.price}`,
          quantity: findPlus,
        }
        setItemsInCart(thisArray);
        localStorage.setItem(`${product.name}`, JSON.stringify(itemProperties));
      }    
    }
    
    const clearCart = () => {
      localStorage.clear();
    }

    const handleClickTest = () => {
      // console.log(itemsInCart);
      for (var i = 0 ; i < localStorage.length ; i ++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage[key]);
        console.log(value);
      }
    }




     if (!isLoaded) {
      return <div className={classes.marginTop}>Loading...</div>;
  } else {
    return(
      <Container>
        <Grid className={classes.marginTop} container justifyContent="center">
          <Grid item xs={12} sm={11} md={9} >
            <h2 className="flexCenter">MY CART</h2>
            <span className="flexCenter"> {myArray.length} items</span>
            
            <Grid container spacing={5} className="pt-8 pb-10 flexCenter">
              
              <Grid item xs={11} sm={8}>
                {itemsInCart.map(product => (
                  <div
                    className="productLineCart lightShadowCard mt-6"
                    key={product.id}
                  >
                    
                    <img className="imgLineCart" src="https://picsum.photos/200/300"/>
                    <div className="quantityNameCart">{product.name}</div>
                    <div className="quantityPriceCart">{product.price}</div>
                    <div className="quantityProductCart mr-5">
                      <span>{product.quantity}</span>
                      <button onClick={() => addQuantityInCart(product)}>+</button>
                      <button onClick={() => substractQuantityInCart(product)}>-</button>
                    </div>
                  </div>
                ))}
                
              </Grid>
              
              <Grid item xs={11} sm={4}>
                <div className="RecapCart lightShadowCard">
                  <h3>The total amount of</h3>
                  {/* <div>{count}</div> */}
                  <button onClick={handleClickTest}>console log</button>
                  <div>{itemsInCart.name}</div>
                  <Button onClick={clearCart}>Clear</Button>
                  
                </div>
              </Grid>
              
            </Grid>         
          </Grid>

          
        </Grid> 
      </Container>   
        
    )
}
}