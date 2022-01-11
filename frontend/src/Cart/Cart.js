import { useState, useEffect } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import '../css/Cart.css';
import { numberOfItemsInCart, shippingFees } from '../Shared/globalState';
import { useRecoilState } from 'recoil';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import imgCart from "../assets/img/sewingCart4.png";

const ColorButton = withStyles((theme) => ({
  root: {
    color: '#020202',
    backgroundColor: '#cbd0de',
    borderRadius: 0,
    opacity: 0.9,
    '&:hover': {
      backgroundColor: '#cbd0de',
      opacity: 1
    },
  },
}))(Button);

export default function Cart() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [numberInCart, setNumberInCart] = useRecoilState(numberOfItemsInCart);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [shippingFeesVar] = useRecoilState(shippingFees);
  const [localStorageLength, setLocalStorageLength] = useState(0);

  const [price, setPrice] = useState(0);

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
    setIsLoaded(true);
    window.scroll(0, 0);
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
    setPrice(Number(price) - (Number(find.quantity) * Number(find.price)))
    setLocalStorageLength(localStorageLength - 1);
    console.log(find)
  }

  const clearCart = () => {
    localStorage.removeItem('cart_Paris_Fabrics');
    setItemsInCart([]);
    setNumberInCart(0);
    setLocalStorageLength(0);
    window.scroll(0, 0);
  }

  if (!isLoaded) {
    return <div className="pt-15">Loading...</div>;
  } else {
    return (
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Your cart - Paris Fabrics</title>
        </Helmet>
        <Grid className="pt-12" container justifyContent="center">
          <Grid item xs={12} sm={11} md={11} >
            {/* <div className="flexCenter letterSpacing1 font5 grey7 mb-4 mt-2 size4">Here is your cart ...</div> */}
            {localStorageLength === 0 &&
              <div>
                <div className="textAlignCenter font2 mt-7">Your cart is empty</div>
                <Link to="/catalog" className=" flexCenter mt-3 textDecorationNone">
                  <ColorButton variant="contained" style={{ fontFamily: 'sans-serif', letterSpacing: '2px', fontWeight: '300', fontSize: '0.8em' }}  >
                    Back to shopping
                  </ColorButton>
                </Link>
              </div>
            }
            {localStorageLength > 0 &&
              <span className="flexCenter numberItemsCart mt-7 mb-3">
                {localStorageLength < 2 && <div className="itemOrItems font5 grey5 size4 bold200"> Your cart contains {localStorageLength} product</div>}
                {localStorageLength > 1 && <div className="itemOrItems font8 grey5 size4 bold200"> Your cart contains {localStorageLength} products</div>}
              </span>
            }
            <Grid container className="pt-5 pb-10" spacing={2}>
              <Grid item xs={12} md={8}>
                <div className="divPc">
                  {itemsInCart.map(product => (
                    <div
                      className="flex  mb-4"
                      key={product.id}
                    >
                      <Link to={`/${product.name} `} className="bgWhite containerImgCart" >
                        <img className="imgLineCart" src={window.location.origin + `/images/${product.image}`} alt="cart product sewing" />
                      </Link>
                      <div className="flexBetween bgWhite productDetailsCart radiusCartPc">
                        <div className="quantityNameCart font10 letterSpacing2 size3 opacity9 ml-5 flexColumn">
                          <Link to={`/${product.name} `} className="textDecorationNone grey9 ">{product.name}</Link>
                          <button className=" cursorPointer bgWhite borderNone underlined size07 mt-3 width50" onClick={() => removeProduct(product)}>remove</button>
                        </div>

                        <div className="widthQuantityPrice">
                          {product.quantity > 1 ? <div className="letterSpacing1 font5 bold600 grey8 mt-2">${(product.price / 100).toFixed(2)} each</div> : <div className="height30"></div>}
                          <div className="quantityProductCart flex mb-2 mt-6 ">
                            <ColorButton style={{ minWidth: '25px', maxWidth: '25px', minHeight: '23px', maxHeight: '23px' }} variant="contained" onClick={() => addQuantityInCart(product)} >+</ColorButton >
                            <div className="centerText productQuantityCart bgWhite">{product.quantity}</div>
                            {product.quantity > 1 && <ColorButton style={{ minWidth: '25px', maxWidth: '25px', minHeight: '23px', maxHeight: '23px' }} variant="contained" onClick={() => substractQuantityInCart(product)} >-</ColorButton >}
                            {product.quantity === 1 && <ColorButton style={{ minWidth: '25px', maxWidth: '25px', minHeight: '23px', maxHeight: '23px' }} variant="contained"  >-</ColorButton >}
                          </div>
                        </div>
                        <div>
                          <div className="productPriceQuantityInCart letterSpacing1 font5 bold600 grey8 size1 mr-8">
                            ${(Number(product.price / 100) * Number(product.quantity)).toFixed(2)}
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
                        <Link to={`/${product.name} `}><img className="imageProductMobileCart cursorPointer" src={window.location.origin + `/images/${product.image}`} alt="img article sewing" /></Link>
                        <Link to={`/${product.name} `} className="verticalAlign font10 letterSpacing2 size3 opacity9 mt-3 textDecorationNone grey7">{product.name}</Link>
                        <div className="flexBetween mt-6">
                          <Link to={`/${product.name} `} className="ml-5 textDecorationNone grey7 size2">${(Number(product.price / 100) * Number(product.quantity)).toFixed(2)}</Link>
                          <div className="flex mr-5">
                            <ColorButton style={{ minWidth: '35px', maxWidth: '35px', minHeight: '25px', maxHeight: '25px' }} variant="contained" onClick={() => addQuantityInCart(product)} >+</ColorButton >
                            <div className="centerText productQuantityCart bgWhite ">{product.quantity}</div>
                            {product.quantity > 1 && <ColorButton style={{ minWidth: '35px', maxWidth: '35px', minHeight: '25px', maxHeight: '25px' }} variant="contained" onClick={() => substractQuantityInCart(product)} >-</ColorButton >}
                            {product.quantity === 1 && <ColorButton style={{ minWidth: '35px', maxWidth: '35px', minHeight: '25px', maxHeight: '25px' }} variant="contained"  >-</ColorButton >}
                          </div>
                        </div>
                        <div className="flexBetween mt-5 mb-3">
                          <div className="ml-5 grey6 size09 underlined" onClick={() => removeProduct(product)}>remove</div>
                          {product.quantity > 1 && <div className="mr-7 size1">${(product.price / 100).toFixed(2)} each</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {localStorageLength > 0 &&
                  <div className="flex mb-3">
                    <Link to="/catalog" className="mr-2 textDecorationNone">
                      <ColorButton variant="contained" style={{ fontFamily: 'sans-serif', letterSpacing: '2px', fontWeight: '300', fontSize: '0.8em', backgroundColor: '#5ea6b4', borderRadius: '3px', }}  >
                        Back to shopping
                      </ColorButton>
                    </Link>
                    <ColorButton variant="contained" style={{ fontFamily: 'sans-serif', letterSpacing: '2px', fontWeight: '300', fontSize: '0.8em', marginLeft: '10px', backgroundColor: 'rgb(250 132 0 / 83%)', borderRadius: '3px', }} onClick={clearCart} >
                      Clear cart
                    </ColorButton>
                  </div>
                }
              </Grid>
              <Grid xs={12} md={4} item>
                {localStorageLength > 0 &&
                  <div>
                    <div className="cartBackground grey8 lightShadowCard2 font1 bold200 size1 " style={{ backgroundImage: `url(${imgCart})` }}>
                      <div className="flexBetween  font12 grey7 ProductSubtotal">
                        <span><ShoppingBasketIcon className="cartIcon ml-2 mt-1" /></span>
                        <div className="ml-2 mt-1 bold400 size2 letterSpacing1 height30">Your cart</div>
                        <span><ShoppingBasketIcon className="cartIcon mr-2 mt-1" /></span>
                      </div>
                      {itemsInCart.map(product => (
                        <div
                          className="flex flexBetween mt-1 mb-1 pl-2 pr-2 "
                          key={product.id}
                        >
                          <div className="font12  bold600">{product.name} x <span className="size5">{product.quantity}</span></div>
                          <div className="font12 size2 mt-1 bold600">${(Number(product.price / 100) * Number(product.quantity)).toFixed(2)}</div>
                        </div>
                      ))}
                      <div className="flexBetween pt-1 mt-2 pb-1 pl-2 pr-2  ">
                        <div className="font12  bold600">Subtotal</div>
                        <span className="greyLineCart"></span>
                        <div className="font12 size2  bold600">${(price / 100).toFixed(2)}</div>
                      </div>
                      <div className="flexBetween mt-2 pl-2 pr-2">
                        <div className="font12  bold600">Shipping fees</div>
                        {(Number(price / 100) + Number(shippingFeesVar)).toFixed(2) <= 65
                          ? <div className="alignRight size2 font12  bold600">${(shippingFeesVar * 1).toFixed(2)}</div>
                          : <div className="alignRight size2 font12  bold600">$0</div>
                        }

                      </div>
                      <div className="flexBetween totalAndShipping pb-3 mt-2 pt-1 pl-2 pr-2">
                        <div className="font12  bold600">Total</div>
                        <span className="greyLineCart"></span>
                        <div className="font12 size2 bold600">${(Number(price / 100) + Number(shippingFeesVar)).toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="mt-4 ">
                      <Link to="/checkout" className="textDecorationNone" >
                        <ColorButton
                          fullWidth
                          variant="contained"
                          margin="normal"
                          style={{ height: '40px', borderRadius: '30px', fontFamily: 'sans-serif', letterSpacing: '2px', fontWeight: '600', fontSize: '0.9em', backgroundColor: 'rgb(250 132 0 / 83%)', }}
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