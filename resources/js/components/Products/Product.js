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
  

  const useStyles = makeStyles(theme => ({
    marginTop: {
        marginTop: 200,
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

export default function Product(props) {

    const classes = useStyles();

    // console.log(this.props.location.state)

    
    let data = useLocation();
    let product = data.state.product;
    console.log(product);

   
     
    // justifyContent="center"
    return(     
        <Container className={classes.marginTop}>
            <Grid container justifyContent="center" spacing={4}>               
                    <Grid item xs={12} sm={6} >
                        <Paper className="productImgDescription"></Paper>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <h2>{product.name}</h2>
                        <div className="flexBetween mt-9">
                            <span>{product.price} €</span>
                            <span>average note</span>
                            <span>lire les avis</span>
                        </div>
                        <div className="flexBetween mt-9">
                            <span className="width40">
                                <span>1</span>
                                <span className="m-3"></span>
                                <Button variant="outlined">+</Button>
                                <Button variant="outlined">-</Button>
                            </span>
                            <span className="width60"><Button fullWidth variant="outlined">Add to cart</Button></span>
                        </div>
                        <div>
                            <div className="width90 greyLineProduct m-4"></div>
                        </div>
                    </Grid>
                            
            </Grid>
        </Container>
    )
}
