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

  export default function BestSellers() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/bestsellers")
          .then(res => res.json())
          .then(
            (result) => {
                console.log
              setIsLoaded(true);
              setItems(result.products);
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

    return (
        <div>

        </div>
    )
  }