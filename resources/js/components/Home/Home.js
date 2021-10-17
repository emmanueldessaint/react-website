import { useState, useEffect  } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Rating from '@mui/material/Rating';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { styled } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { LoadData } from '../../Constants.js'
import axios from 'axios';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import logo from "../../../assets/img/logo1.png";
  import '../../App.css';
  import '../../css/Home.css';

  const useStyles = makeStyles(theme => ({
    marginTopBanner: {
        "margin-top":"100px;",
    },
    imgFull: {
        "width":"100%;",
    },
    greyLine: {
        "border-left":"1px solid black;"
    },
    testProduit: {
        backgroundColor: 'black',
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#ebf1f5',
  }));

export default function Home() {

    const classes = useStyles();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [bestSellers, setBestSellers] = useState([]);
    const [avgNote, setAvgNote] = useState('');
    const [userReviews, setUserReviews] = useState([]);
    const [items, setItems] = useState([]);
 
    useEffect(() => {
        fetch("http://localhost:8000/api/reviews")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setBestSellers(result.bestSellers);
              setAvgNote(result.reviewsAverage);
              setUserReviews(result.allReviews);
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
   
    if (error) {
        return <div className={classes.marginTop}>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className={classes.marginTop}>Loading...</div>;
    } else {
        return (
            <div className={classes.marginTopBanner}>  
                <div>
                    <img src={logo} alt="Logo" className={classes.imgFull}/>
                </div>
                <Container>
                <Grid container spacing={2} className="menuQuality">
                    <Grid item xs={4} className={classes.alignTitle}>
                        <span className="flexCenter"><LocalShippingIcon /></span>
                        <h4 className="flexCenter">Respect for the land</h4>
                        <h5 className="flexCenter">Environment and traditions</h5>
                    </Grid>
                    <Grid item xs={4} className={classes.alignTitle} className="greyLineBorders">
                        <span className="flexCenter"><LocalShippingIcon /></span>
                        <h4 className="flexCenter">Tracking delivery</h4>
                        <h5 className="flexCenter">All around the world</h5>
                    </Grid>
                    <Grid item xs={4} className={classes.alignTitle}>
                        <span className="flexCenter"><LocalShippingIcon /></span>
                        <h4 className="flexCenter">Respect du terroir</h4>
                        <h5 className="flexCenter">De l'environnement et des traditions</h5>
                    </Grid>
                </Grid>
                <div className="mt-10">
                    <h3 className="flexCenter">Our best sellers</h3>
                    <h4 className="flexCenter">Discover our customers' favorite products !</h4>
                </div>
                <Grid container justifyContent="center">
                    {bestSellers.map(item => (
                        <Grid 
                            item xs={6} sm={3} md={3} lg={3} 
                            key={item.id}                                                 
                        >
                            <Link to={{ pathname: '/product', state: { product : item } }}>
                                <div className="cardProduct">                                   
                                    <img className="imageProduct" src="https://picsum.photos/200/300"/>
                                    <div className="nameProduct">{item.name}</div>                                  
                                    <div>{item.price}</div>                                   
                                </div>
                            </Link>
                        </Grid>
                    ))}                
                </Grid>
                <h2 className="flexCenter">Ils ont vécu l'expérience</h2>
                <Grid className="pt-10" container spacing={6}>
                    <Grid item xs={3} className={classes.alignTitle}>
                        <Grid container justifyContent="center">
                            <div className="flexCenter"><span>{avgNote}</span>/5</div>
                            <div className="flexCenter mt-5"><h4 className="flexCenter">Based on purchases on AmazingSewing</h4></div>
                            <Rating
                                readOnly
                                className="mt-5"
                                name="simple-controlled"
                                value={avgNote}                                     
                            /> 
                        </Grid>
                    </Grid>
                    <Grid item xs={9} className={classes.alignTitle}  >
                        <Grid container spacing={6} justifyContent="center">               
                            {userReviews.map(item => (                    
                                <Grid
                                    item xs={3} 
                                    key={item.id}
                                >
                                    <div>
                                        <Rating
                                            readOnly
                                            className="stars"
                                            name="simple-controlled"
                                            value={item.note}                                      
                                        />                                 
                                        <div className="mt-5">{item.description.length < 100 ? item.description: item.description.substring(0, 70) + " . . ."}</div>
                                        <div className="mt-5">{item.title}</div>
                                    
                                    </div>
                                    
                                </Grid>                  
                            ))}                   
                        </Grid>
                    </Grid>
                    
                </Grid>
                </Container>

            </div>
        )
    }
}

