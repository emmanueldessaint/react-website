import { useState, useEffect  } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
// import Rating from '@material-ui/core/Rating';
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
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/reviews")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
              console.log(result);
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
            
                
                <img src={logo} alt="Logo" className={classes.imgFull}/>
            </div>
            <Container>
            <Grid container spacing={2} className="menuQuality">
                <Grid item xs={4} className={classes.alignTitle}>
                    <span className="flexCenter"><LocalShippingIcon /></span>
                    <h4 className="flexCenter">Respect du terroir</h4>
                    <h5 className="flexCenter">De l'environnement et des traditions</h5>
                </Grid>
                <Grid item xs={4} className={classes.alignTitle} className="greyLineBorders">
                    <span className="flexCenter"><LocalShippingIcon /></span>
                    <h4 className="flexCenter">Respect du terroir</h4>
                    <h5 className="flexCenter">De l'environnement et des traditions</h5>
                </Grid>
                <Grid item xs={4} className={classes.alignTitle}>
                    <span className="flexCenter"><LocalShippingIcon /></span>
                    <h4 className="flexCenter">Respect du terroir</h4>
                    <h5 className="flexCenter">De l'environnement et des traditions</h5>
                </Grid>
            </Grid>
            <div className="mt-10">
           
                <h3 className="flexCenter">Nos meilleurs ventes</h3>
                <h4 className="flexCenter">Découvrez les produits préférés de nos clients !</h4>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={3} className={classes.alignTitle}>
                    <Paper className="productCard" style={{backgroundColor: '#ebf1f5'}}/>
                </Grid>
                <Grid item xs={3} className={classes.alignTitle}  >
                    <Card className="productCard"style={{backgroundColor: '#ebf1f5'}} />
                </Grid>
                <Grid item xs={3} className={classes.alignTitle}>
                    <Paper className="productCard" style={{backgroundColor: '#ebf1f5'}} ></Paper>
                </Grid>
                <Grid item xs={3} className={classes.alignTitle}>
                    <Paper className="productCard" style={{backgroundColor: '#ebf1f5'}}/>
                </Grid>
            </Grid>
            <h2 className="flexCenter">Ils ont vécu l'expérience</h2>
            <Grid container spacing={2}>
                <Grid item xs={3} className={classes.alignTitle}>
                    <Item>truc</Item>
                </Grid>
                <Grid item xs={9} className={classes.alignTitle}  >
                    <Grid container justifyContent="center">               
                        {items.map(item => (                    
                            <Grid
                                item xs={3} 
                                key={item.id}
                            >
                                <div>
                                    <div>{item.note}</div>
                                    <div>{item.description.length < 100 ? item.description: item.description.substring(0, 70) + " . . ."}</div>
                                    <div>
                                        
                                    </div>
                                    <div>{item.title}</div>
                                
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

