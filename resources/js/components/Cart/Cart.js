import { useState, useEffect  } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';
import '../../css/Cart.css';
import { numberOfItemsInCart } from '../Shared/globalState'
import { useRecoilState } from 'recoil';
import DeleteIcon from '@material-ui/icons/Delete';

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
    const [numberInCart, setNumberInCart] = useRecoilState(numberOfItemsInCart);
    const [localStorageLength, setLocalStorageLength] = useState(0);
        
    var localLength = localStorage.length

    useEffect(() => {
      var array= [];
      for (var i = 0 ; i < localStorage.length ; i ++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage[key]);
        array.push(value);
      }
      setLocalStorageLength(array.length);
      setItemsInCart(array);
      setIsLoaded(true);    
    }, [localLength])  
    
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
      setNumberInCart(numberInCart + 1);
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
        setNumberInCart(numberInCart - 1);
        localStorage.setItem(`${product.name}`, JSON.stringify(itemProperties));
      }     
    }

    const removeProduct = (product) => {
      localStorage.removeItem(product.name)
      setNumberInCart(numberInCart - product.quantity);
    }

     if (!isLoaded) {
      return <div className={classes.marginTop}>Loading...</div>;
  } else {
    return(
      <Container>
        <Grid className={classes.marginTop} container justifyContent="center">
          <Grid item xs={12} sm={11} md={9} >
            <h2 className="flexCenter">MY CART</h2>

            {localStorageLength > 0 &&
              <span className="flexCenter"> 
                {localStorageLength} 
                {localStorageLength < 2 && <span className="itemOrItems">item</span>}
                {localStorageLength > 1 && <span className="itemOrItems"> items</span>}
              </span>
            }
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
                      {product.quantity > 1 &&<button onClick={() => substractQuantityInCart(product)}>-</button>}
                      {product.quantity === 1 &&<button disabled onClick={() => substractQuantityInCart(product)}>-</button>}
                    </div>
                    <button onClick={() => removeProduct(product)}><DeleteIcon className="fontTrash"/></button>
                  </div>
                ))}
                
              </Grid>
              
              <Grid item xs={11} sm={4}>
                <div className="RecapCart lightShadowCard">
                  <h3>The total amount of</h3>
                  
                  
                </div>
              </Grid>
              
            </Grid>         
          </Grid>

          
        </Grid> 
      </Container>   
        
    )
}
}