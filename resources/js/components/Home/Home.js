import { useState, useEffect  } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Rating from '@mui/material/Rating';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from "@material-ui/icons/StarBorder";
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
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import logo from "../../../assets/img/sewing1.jpg";
  import '../../App.css';
  import '../../css/Home.css';

  const useStyles = makeStyles(theme => ({
    marginTopBanner: {
        "margin-top":"100px;",
    },
    greyLine: {
        "border-left":"1px solid black;"
    },
    testProduit: {
        backgroundColor: 'black',
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
          marginTop: 10,
        },
      },
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
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )                   
    }, [])   
    
   
    return (
        <div className={classes.marginTopBanner}>  
            <div>
                <img src={logo} alt="Logo" className="imgIntro"/>
            </div>
            <Container>
                <Grid container justifyContent="center" className="menuQuality">
                    <Grid item container xs={12} md={10}>
                        
                        <Grid item xs={12} sm={4} className={classes.alignTitle}>
                        {/* <Button onClick={onChange}>update panier</Button> */}
                            <div className="mt-6">
                                <span className="flexCenter"><LocalShippingIcon /></span>
                                <span className="flexCenter mt-2">Respect for the land</span>
                                <span className="flexCenter mt-2">Environment and traditions</span>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.alignTitle} className="greyLineBorders">
                            <div className="mt-6">
                                <span className="flexCenter"><LocalShippingIcon /></span>
                                <span className="flexCenter mt-2">Tracking delivery</span>
                                <span className="flexCenter mt-2">All around the world</span>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.alignTitle}>
                            <div className="mt-6">
                                <span className="flexCenter"><LocalShippingIcon /></span>
                                <span className="flexCenter mt-2">Respect du terroir</span>
                                <span className="flexCenter mt-2">De l'environnement et des traditions</span>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            <div className="mt-10">
                <h3 className="flexCenter">Our best sellers</h3>
                <h4 className="flexCenter">Discover our customers' favorite products !</h4>
            </div>
            {isLoaded && <div>
            <Grid container justifyContent="center">
                <Grid item container xs={12} md={11} lg={10}>
                    
                    {bestSellers.map(item => (
                        <Grid 
                            item xs={12} sm={6} md={3} lg={3} 
                            key={item.id}                                                 
                        >
                            <div className="cardProduct lightShadowCard">   
                                <Link to={{ pathname: '/product', state: { product : item } }}>                                
                                    <img className="imageProduct" src="https://picsum.photos/200/300"/>
                                    <div className="nameProduct centerText">{item.name}</div>                                  
                                    <div className="priceProduct mt-4 ml-3 pb-1">${item.price}.00</div> 
                                </Link>                                  
                            </div>                                
                        </Grid>
                    ))}    
                    
                </Grid>          
            </Grid>
            </div>
                    } 
            <h2 className="flexCenter mt-10">They lived the experience</h2>
            <Grid className="pt-7" container justifyContent="center">
                <Grid container item xs={11} md={11} spacing={4}>
                    <Grid item md={3} xs={12} className=" verticalAlign">
                        <Grid >
                            <div className="textAlignCenter">
                                <div>{avgNote}/5</div>
                                <h4 className="flexCenter">Based on purchases on AmazingSewing</h4>
                                <div>
                                    <Rating
                                        precision={0.5}
                                        readOnly
                                        
                                        name="simple-controlled"
                                        value={avgNote}  
                                        emptyIcon={
                                            <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                        }                                     
                                    /> 
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item md={9} sm={12}  className={classes.alignTitle}  >
                        <Grid container justifyContent="center" spacing={6}>             
                            {userReviews.map(item => (                    
                                <Grid
                                    item xs={12} sm={6} lg={3}
                                    key={item.id}
                                >
                                    <div>
                                        <Rating
                                            precision={0.5}
                                            readOnly
                                            className="stars"
                                            name="simple-controlled"
                                            value={item.note} 
                                            emptyIcon={
                                                <StarBorderIcon fontSize="inherit" className="emptyStar" />
                                              }                                      
                                        />                                 
                                        <div className="mt-5 ">{item.description.length < 60 ? item.description: item.description.substring(0, 70) + " . . ."}</div>
                                        <div className="mt-5">{item.title}</div>
                                    
                                    </div>
                                    
                                </Grid>                  
                            ))}                   
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Container>

        </div>
    )
}


