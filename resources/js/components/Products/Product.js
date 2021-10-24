import React, { useState, useEffect  } from 'react';
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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ProductQuality from "../../../assets/img/qualityProduct.png";

import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    BrowserRouter as Router,
    ReactDom,
    Switch,
    Route,
    Link,
    useLocation,
  } from "react-router-dom";
  import '../../App.css';
  import '../../css/Products.css';
  import YouTubeIcon from '@material-ui/icons/YouTube';
  import { numberOfItemsInCart } from '../Shared/globalState'
  import { useRecoilState } from 'recoil';
  

  const useStyles = makeStyles(theme => ({
    marginTop: {
        marginTop: 200,
    },
    productImgDescription: {
        height:500,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    descriptionImgDescription: {
        height:200,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    menuDescriptionProduct: {
        marginTop: "100px",
    }
    
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    height:300,
    "margin":"20px",
    textAlign: 'center',
    color: theme.palette.text.secondary,

  }));

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function Product(props) {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const [quantityProduct, setQuantityProduct] = useState(1);
    const [numberInCart, setNumberInCart] = useRecoilState(numberOfItemsInCart);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addQuantity = () => {
        setQuantityProduct(quantityProduct + 1);
    }
    const substractQuantity = () => {
        if (quantityProduct < 2) {
            return;
        }
        setQuantityProduct(quantityProduct - 1);
    }

    const addToLocalStorage = () => {
        let itemProperties = {
            id:`${product.id}`,
            name:`${product.name}`,
            price:`${product.price}`,
            quantity:0
        }
        if (localStorage.getItem(`${product.name}`) === null) {
            itemProperties.quantity = quantityProduct;
        } else {
            let itemAlreadyInCart = JSON.parse(localStorage.getItem(`${product.name}`));
            itemProperties.quantity = quantityProduct + itemAlreadyInCart.quantity;           
        }   
        localStorage.setItem(`${product.name}`, JSON.stringify(itemProperties)); 
        setQuantityProduct(1);
        setNumberInCart(numberInCart + quantityProduct);    
    }

    let data = useLocation();
    let product = data.state.product;

    const clearCart = () => {
        localStorage.clear();
      }
     
    return(     
        <Container className={classes.marginTop}>
            <Grid container justifyContent="center" spacing={4}>               
                <Grid item xs={12} sm={6} >
                    <Paper className={classes.productImgDescription}></Paper>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <h2>{product.name}</h2>
                    <div className="flexBetween mt-13">
                        <span>{product.price} €</span>
                        <span>average note</span>
                        <span>lire les avis</span>
                    </div>
                    <div className="flexBetween mt-9">
                        <span className="width40 addSubstractCart">
                            <button disabled className=" quantityProduct">{quantityProduct}</button>
                            
                            <button onClick={addQuantity} className="greyButton buttonAdd">+</button>
                            <button onClick={substractQuantity} className="greyButton buttonSubstract">-</button>
                        </span>
                        <span className="width60">
                            <button onClick={addToLocalStorage} className="greyButton buttonAddToCart"> Add to cart</button>
                        </span>
                    </div>
                    <div>
                        <div className="width90 greyLineProduct m-4"></div>
                        <Button onClick={clearCart}>Clear</Button>
                    </div>
                </Grid>                          
            </Grid>
           
            <Box className="mt-13" sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs  
                        value={value} 
                        onChange={handleChange} 
                        aria-label="basic tabs example" 
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Description" {...a11yProps(0)} />
                        <Tab label="Fiche produit" {...a11yProps(1)} />
                        <Tab label="Details" {...a11yProps(2)} />
                    </Tabs>
                    <div className=" greyLineProduct "></div>
                </Box>
                <TabPanel className="mt-3" value={value} index={0}>
                    <Grid container spacing={4}>
                        <Grid item xs={8} className="alignCenter"><span >unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></Grid>
                        <Grid item xs={4}><img src={ProductQuality} alt="ProductQuality" className={classes.imgFull}/></Grid>
                    </Grid>
                    
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                    
                </TabPanel>
            </Box>
        </Container>
    )
}
