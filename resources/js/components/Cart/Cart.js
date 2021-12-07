import { useState, useEffect } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { createTheme, withStyles, ThemeProvider, styled } from '@material-ui/core/styles'; import '../../css/Cart.css';
import { numberOfItemsInCart, shippingFees, allItemsInCart } from '../Shared/globalState'
import { useRecoilState, selector, atom } from 'recoil';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import { PlayCircleFilledOutlined } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';

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


const ColorButton = withStyles((theme) => ({
  root: {
    color: '#020202',
    backgroundColor: '#B7C1DA',
    borderRadius: 0,
    opacity: 0.9,
    '&:hover': {
      backgroundColor: '#ADB4D0',
    },
  },
}))(Button);
// const DisabledButton = withStyles((theme) => ({
//   root: {
//       color: '#020202',
//       backgroundColor: '#B7C1DA',
//       borderRadius: 0,
//       opacity: 0.9,

//   },
// }))(Button);


export default function Cart() {

  const classes = useStyles();


  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [numberInCart, setNumberInCart] = useRecoilState(numberOfItemsInCart);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [shippingFeesVar, setShippingFeesVar] = useRecoilState(shippingFees);
  const [localStorageLength, setLocalStorageLength] = useState(0);

  const [price, setPrice] = useState(0);
  // const globalPrice = selector({
  //   key: 'globalPrice',
  //   get: ({get}) => 
  // })

  var localLength = localStorage.length


  useEffect(() => {
    var myPrice = 0;
    var ourCart = JSON.parse(localStorage.getItem("cart_Paris_Fabrics"));
    if (ourCart !== null) {
      for (var i = 0; i < ourCart.length; i++) {
        myPrice += Number(Number(ourCart[i].quantity) * Number(ourCart[i].price));
      }
      setItemsInCart(ourCart);
      setPrice(myPrice);
      setLocalStorageLength(ourCart.length);
    }
    console.log(ourCart)
    setIsLoaded(true);
    scroll(0, 0);
  }, [])

  const addQuantityInCart = (product) => {
    var ourCart = JSON.parse(localStorage.getItem("cart_Paris_Fabrics"))
    var find = ourCart.find(element => element.name === product.name)
    find.quantity++;
    setPrice(Number(price) + Number(find.price));
    setItemsInCart(ourCart);
    setNumberInCart(numberInCart + 1);
    localStorage.setItem('cart_Paris_Fabrics', JSON.stringify(ourCart));

  }

  const substractQuantityInCart = (product) => {
    var ourCart = JSON.parse(localStorage.getItem("cart_Paris_Fabrics"))
    var find = ourCart.find(element => element.name === product.name)
    if (find === 1) {
      return;
    }
    find.quantity--;
    setPrice(Number(price) - Number(find.price));
    setItemsInCart(ourCart);
    setNumberInCart(numberInCart - 1);
    localStorage.setItem('cart_Paris_Fabrics', JSON.stringify(ourCart));
  }

  const removeProduct = (product) => {
    var ourCart = JSON.parse(localStorage.getItem("cart_Paris_Fabrics"));
    var find = ourCart.find(element => element.name === product.name);
    var quantity = find.quantity;
    var filteredCart = ourCart.filter(item => item.name !== find.name);
    localStorage.setItem('cart_Paris_Fabrics', JSON.stringify(filteredCart));
    setItemsInCart(filteredCart);
    setNumberInCart(numberInCart - quantity);
    setLocalStorageLength(localStorageLength - 1);
  }

  const clearCart = () => {
    localStorage.removeItem('cart_Paris_Fabrics');
    setItemsInCart([]);
    setNumberInCart(0);
    setLocalStorageLength(0);
    scroll(0, 0);
  }

  if (!isLoaded) {
    return <div className="pt-15">Loading...</div>;
  } else {
    return (
      <Container>
        <Grid className="pt-12" container justifyContent="center">
          <Grid item xs={12} sm={11} md={11} >
            <h2 className="flexCenter letterSpacing1 font5">My cart</h2>

            {localStorageLength === 0 &&
              <div>
                <div className="textAlignCenter font2">Your cart is empty</div>
                <Link to="/catalog" className=" flexCenter mt-3">
                  <ColorButton variant="contained" style={{ fontFamily: 'sans-serif', letterSpacing: '2px', fontWeight: '300', fontSize: '0.8em' }}  >
                    Back to shopping
                  </ColorButton>
                </Link>
                
              </div>
            }

            {localStorageLength > 0 &&
              <span className="flexCenter numberItemsCart">
                {localStorageLength}
                {localStorageLength < 2 && <span className="itemOrItems font5">item</span>}
                {localStorageLength > 1 && <span className="itemOrItems font5"> items</span>}
              </span>
            }
            <Grid container className="pt-5 pb-10" spacing={2}>
              <Grid item xs={12} md={8}>
                <div className="divPc">
                  {itemsInCart.map(product => (
                    <div
                      className="flex lightShadowCard2 bgBlue mb-4"
                      key={product.id}
                    >

                      <Link to={`/${product.name} `} className="bgWhite" ><img className="imgLineCart" src={window.location.origin + `/images/${product.image}`} /></Link>
                      <div className="flexBetween bgWhite productDetailsCart">
                        <div className="quantityNameCart font10 letterSpacing2 size3 opacity9 ml-5">
                          <Link to={`/${product.name} `} >{product.name}</Link>
                          <button className=" cursorPointer bgWhite" onClick={() => removeProduct(product)}><ClearIcon className="fontTrash" /></button>
                        </div>

                        <div className="widthQuantityPrice">
                          <div className="letterSpacing1 font5 bold600 grey8 mt-2">${(product.price/100).toFixed(2)}</div>
                          <div className="quantityProductCart flex mb-2 mt-8">
                            <ColorButton style={{ minWidth: '25px', maxWidth: '25px', minHeight: '25px', maxHeight: '25px' }} variant="contained" onClick={() => addQuantityInCart(product)} >+</ColorButton >
                            <div className="centerText productQuantityCart bgWhite">{product.quantity}</div>
                            {product.quantity > 1 && <ColorButton style={{ minWidth: '25px', maxWidth: '25px', minHeight: '25px', maxHeight: '25px' }} variant="contained" onClick={() => substractQuantityInCart(product)} >-</ColorButton >}
                            {product.quantity === 1 && <ColorButton style={{ minWidth: '25px', maxWidth: '25px', minHeight: '25px', maxHeight: '25px' }} variant="contained"  >-</ColorButton >}
                          </div>
                        </div>
                        <div>
                          <div className="productPriceQuantityInCart letterSpacing1 font5 bold600 grey8 size1 mr-8">
                            ${(Number(product.price/100) * Number(product.quantity)).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="divMobile">
                  {itemsInCart.map(product => (
                    <div
                      className="flex lightShadowCard2 bgBlue mb-4"
                      key={product.id}
                    >
                      <div className="bgWhite">
                        <Link to={`/${product.name} `}><img className="imageProductMobileCart cursorPointer" src={window.location.origin + `/images/${product.image}`} /></Link>
                        <Link to={`/${product.name} `} className="verticalAlign font10 letterSpacing2 size3 opacity9 mt-3">{product.name}</Link>
                        <div className="flexBetween mt-6">
                          <Link to={`/${product.name} `} className="ml-5">${(product.price/100).toFixed(2)}</Link>
                          <div className="flex mr-5">
                            <ColorButton style={{ minWidth: '25px', maxWidth: '25px', minHeight: '25px', maxHeight: '25px' }} variant="contained" onClick={() => addQuantityInCart(product)} >+</ColorButton >
                            <div className="centerText productQuantityCart bgWhite ">{product.quantity}</div>
                            {product.quantity > 1 && <ColorButton style={{ minWidth: '25px', maxWidth: '25px', minHeight: '25px', maxHeight: '25px' }} variant="contained" onClick={() => substractQuantityInCart(product)} >-</ColorButton >}
                            {product.quantity === 1 && <ColorButton style={{ minWidth: '25px', maxWidth: '25px', minHeight: '25px', maxHeight: '25px' }} variant="contained"  >-</ColorButton >}
                          </div>
                        </div>
                        <div className="flexBetween mt-5 mb-3">
                          <div className="ml-5 grey6 size08 underlined" onClick={() => removeProduct(product)}>remove</div>
                          {product.quantity > 1 && <div className="mr-9">${(Number(product.price/100) * Number(product.quantity)).toFixed(2)}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {localStorageLength > 0 &&
                  <div className="flex mb-1">
                    <Link to="/catalog" className="mr-2">
                      <ColorButton variant="contained" style={{ fontFamily: 'sans-serif', letterSpacing: '2px', fontWeight: '300', fontSize: '0.8em' }}  >
                        Back to shopping
                      </ColorButton>
                    </Link>
                    <ColorButton variant="contained" style={{ fontFamily: 'sans-serif', letterSpacing: '2px', fontWeight: '300', fontSize: '0.8em', marginLeft: '10px', }} onClick={clearCart} >
                      Clear cart
                    </ColorButton>

                  </div>
                }
              </Grid>
              <Grid xs={12} md={4} item>

                {localStorageLength > 0 &&



                  <div className=" bgWhite lightShadowCard2 font1 bold200  pl-1 pr-1 size1">
                    <div className="flexBetween ">
                      <div className="ml-2 mt-2 grey8 bold400 size2 letterSpacing1 height30">Product</div>
                      <div className="mr-2 mt-2 grey8 bold400 size2 letterSpacing1 height30">Subtotal</div>
                    </div>
                    {itemsInCart.map(product => (
                      <div
                        className="flex flexBetween mt-4 pl-2 pr-2 "
                        key={product.id}
                      >
                        <div className="font2 grey8">{product.name} <span className="bold500">x</span> {product.quantity}</div>
                        <div className="font3">${(Number(product.price/100) * Number(product.quantity)).toFixed(2)}</div>
                      </div>
                    ))}
                    <div className="flexBetween mt-4 pl-2 pr-2">
                      <div className="font2 grey8">Total</div>
                      <span className="greyLineCart"></span>
                      <div className="font3">${(price/100).toFixed(2)}</div>
                    </div>
                    <div className="flexBetween mt-4 pl-2 pr-2">
                      <div className="font2 grey8">Shipping fees</div>
                      <div className="alignRight font3">${shippingFeesVar}</div>
                    </div>
                    <div className="flexBetween pb-4 mt-4 pl-2 pr-2">
                      <div className="totalPlusShipping font2 grey8">Total + Shipping fees</div>
                      <div className="greyLineCart2"></div>
                      <div className="alignRight font3">${(Number(price/100) + Number(shippingFeesVar)).toFixed(2)}</div>
                    </div>
                    <div className="mt-4 ">
                      <Link to="/checkout"  >
                        <ColorButton
                          fullWidth
                          variant="contained"
                          margin="normal"
                          style={{ fontFamily: 'sans-serif', letterSpacing: '2px', fontWeight: '300', fontSize: '0.8em', }}
                        >
                          Go to checkout
                        </ColorButton>
                      </Link>
                    </div>
                  </div>

                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

    )
  }
}