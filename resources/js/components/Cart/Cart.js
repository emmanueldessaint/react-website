import { useState, useEffect } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';
import '../../css/Cart.css';
import { numberOfItemsInCart, shippingFees } from '../Shared/globalState'
import { useRecoilState } from 'recoil';
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





export default function Cart() {

  const classes = useStyles();
  var myArray = [];
  const [itemsInCart, setItemsInCart] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [numberInCart, setNumberInCart] = useRecoilState(numberOfItemsInCart);
  const [shippingFeesVar, setShippingFeesVar] = useRecoilState(shippingFees);
  const [localStorageLength, setLocalStorageLength] = useState(0);
  const [price, setPrice] = useState(0);

  var localLength = localStorage.length
  scroll(0, 0);
  
  useEffect(() => {
    
    var myPrice = 0;
    var array = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = JSON.parse(localStorage[key]);
      array.push(value);
      myPrice += (value.price * value.quantity);
    }
    setPrice(myPrice);
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
      image: `${product.image}`,
      quantity: findPlus,
    }
    setPrice(price + parseInt(itemProperties.price));
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
        image: `${product.image}`,
        quantity: findPlus,
      }
      setPrice(price - parseInt(itemProperties.price));
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
    return <div className="pt-15">Loading...</div>;
  } else {
    return (
      <Container>
        <Grid className="pt-12" container justifyContent="center">
          <Grid item xs={12} sm={11} md={10} >
            <h2 className="flexCenter letterSpacing1 font5">My cart</h2>

            {localStorageLength === 0 &&
              <div className="textAlignCenter font2">Your cart is empty</div>
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
                      className="productLineCart lightShadowCard2 bgBlue mb-5"
                      key={product.id}
                    >

                      <Link to={`/product/${product.name} `} ><img className="imgLineCart" src={window.location.origin + `/images/${product.image}`} /></Link>
                      <div className="flexBetween bgWhite productDetailsCart">
                        <div className="quantityNameCart font10 letterSpacing2 size3 opacity9 ml-8">
                          <Link to={`/product/${product.name} `} >{product.name}</Link>
                          <button className=" cursorPointer bgWhite" onClick={() => removeProduct(product)}><ClearIcon className="fontTrash" /></button>
                        </div>

                        <div className="widthQuantityPrice">
                          <div className="letterSpacing1 font5 bold600 grey8 mt-2">${product.price}</div>
                          <div className="quantityProductCart flex mb-2 mt-8">
                            <button className="buttonAddQuantityCart buttonModifyQuantity cursorPointer size1" onClick={() => addQuantityInCart(product)}>+</button>
                            <div className="centerText productQuantityCart bgWhite">{product.quantity}</div>
                            {product.quantity > 1 && <button className="buttonSubstractQuantityCart buttonModifyQuantity size1" onClick={() => substractQuantityInCart(product)}>-</button>}
                            {product.quantity === 1 && <button className="buttonModifyQuantity buttonSubstractQuantityCart size1">-</button>}
                          </div>
                        </div>
                        <div>
                          <div className="productPriceQuantityInCart letterSpacing1 font5 bold600 grey8 size1 mr-8">
                            ${product.price * product.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="divMobile">
                  {itemsInCart.map(product => (
                    <div
                      className="productLineCart lightShadowCard2 bgBlue mb-5"
                      key={product.id}
                    >
                      <div>
                        <div className="flex productMobile productMobileCatalog mb-3 mt-3">
                          <img className="imageProductMobile cursorPointer" src={window.location.origin + `/images/${product.image}`} />
                          <div className="pl-2 width100">
                            <div className="mt-1 font10 letterSpacing2 grey7 cursorPointer">{product.name}</div>
                            
                            <div className="flexBetween ">
                              <div className="mt-4 cursorPointer">${product.price}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="greyBarProductMobile"></div>
                      {/* <Link to={`/product/${product.name} `} ><img className="imgCartMobile" src={window.location.origin + `/images/${product.image}`} /></Link>
                      <div className=" bgWhite productDetailsCart">
                        <div className="quantityNameCart font10 letterSpacing2 size3 opacity9 ml-8">
                          <Link to={`/product/${product.name} `} >{product.name}</Link>
                          <button className=" cursorPointer bgWhite" onClick={() => removeProduct(product)}><ClearIcon className="fontTrash" /></button>
                        </div>

                        <div className="widthQuantityPrice">
                          <div className="letterSpacing1 font5 bold600 grey8 mt-2">${product.price}</div>
                          <div className="quantityProductCart flex mb-2 mt-8">
                            <button className="buttonAddQuantityCart buttonModifyQuantity cursorPointer size1" onClick={() => addQuantityInCart(product)}>+</button>
                            <div className="centerText productQuantityCart bgWhite">{product.quantity}</div>
                            {product.quantity > 1 && <button className="buttonSubstractQuantityCart buttonModifyQuantity size1" onClick={() => substractQuantityInCart(product)}>-</button>}
                            {product.quantity === 1 && <button className="buttonModifyQuantity buttonSubstractQuantityCart size1">-</button>}
                          </div>
                        </div>
                        <div>
                          <div className="productPriceQuantityInCart letterSpacing1 font5 bold600 grey8 size1 mr-8">
                            ${product.price * product.quantity}
                          </div>
                        </div>
                      </div> */}
                    </div>
                  ))}
                </div>
                {localStorageLength > 0 &&
                  <Button variant="contained" className=" height30 width30 cursorPointer ">
                    Hello
                  </Button>
                }
              </Grid>

              {localStorageLength > 0 &&
                <Grid container xs={12} md={4} item>
                  <div className="yourOrder bgWhite lightShadowCard2 font1 bold200  pl-1 pr-1 letterSpacing1">
                    <div className=" flexBetween">
                      <span className="ml-2 mt-2">Product</span>
                      <span className="mr-2 mt-2">Subtotal</span>
                    </div>
                    {itemsInCart.map(product => (
                      <div
                        className="productLineCart flexBetween mt-4 pl-2 pr-2"
                        key={product.id}
                      >
                        <div>{product.name} x {product.quantity}</div>
                        <div>${product.price * product.quantity}</div>
                      </div>
                    ))}
                    <div className="flexBetween mt-4 pl-2 pr-2">
                      <span>Total</span>
                      <span className="greyLineCart"></span>
                      <span>${price}</span>
                    </div>
                    <div className="flexBetween mt-4 pl-2 pr-2">
                      <span>Shipping fees</span>
                      <span className="alignRight">${shippingFeesVar}</span>
                    </div>
                    <div className="flexBetween pb-4 mt-4 pl-2 pr-2">
                      <div className="totalPlusShipping">Total + Shipping fees</div>
                      <div className="greyLineCart2"></div>
                      <div className="alignRight">${price + shippingFeesVar}</div>
                    </div>

                  </div>
                  <div className="mt-5 width100">
                    <Link to="/checkout"  >
                      <Button
                        fullWidth
                        variant="contained"
                        margin="normal"
                      >
                        Go to checkout
                      </Button>
                    </Link>
                  </div>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </Container>

    )
  }
}