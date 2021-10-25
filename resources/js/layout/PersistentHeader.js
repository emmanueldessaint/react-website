// import { useState, useEffect  } from 'react';
// import * as React from 'react';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import ListItem from '@material-ui/core/ListItem';
// import Paper from '@material-ui/core/Paper';
// import TextField from '@material-ui/core/TextField';
// import PropTypes from 'prop-types';
// import Slide from '@material-ui/core/Slide';
// import Badge from '@material-ui/core/Badge';
// import Toolbar from '@material-ui/core/Toolbar';
// import AppBar from '@material-ui/core/AppBar';
// // import { AppBar } from '@mui/material';
// import { makeStyles } from '@material-ui/styles';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// import { styled } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import PersonIcon from '@material-ui/icons/Person';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import Connect from '../components/Connect/Connect'
// import { Link } from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom';
// import '../App.css';
// import '../css/Header.css'
// import { numberOfItemsInCart } from '../components/Shared/globalState'
// import { currentPageProduct } from '../components/Shared/globalState'

// import {
//   RecoilRoot,
//   atom,
//   selector,
//   useRecoilState,
//   useRecoilValue,
// } from 'recoil';

// const useStyles = makeStyles(theme => ({

//     routerDecoration: {
//       "text-decoration":"none",
//       "color":"black",
//     },
   
//     gridRight: {
//         "display":"flex",
//         "justify-content":"flex-start"
//     },
//     icon: {
//         marginTop: '20px',
//         "margin-left":"30px",
//         "transform":"scale(1.3)",
        
//     },
//     alignTitle:{
//         "display":"flex",
//         "justify-content":"flex-end",
        
       
//     }
// }));

// export default function PersistentHeader() {

//     const classes = useStyles();
//     const [actuelPage, setActuelPage] = useRecoilState(currentPageProduct);

//     const resetPage = () => {
//         setActuelPage(1);
//       }

//     return (
//         <div className="mt-15">
//             <Grid container spacing={2} justifyContent="center" className={classes.routerDecoration}>
//                     <Grid item xs={2} >
//                       <Link to="/"  >
//                         <h4 onClick={resetPage}>Home</h4>
//                       </Link>
//                     </Grid>
                    
//                     <Grid item xs={2} >
//                       <Link to="/products"  >
//                         <h4 onClick={resetPage}>Catalog</h4>
//                       </Link>
//                     </Grid>

//                     <Grid item xs={2} >
//                       <Link to="/products"  >
//                         <h4 onClick={resetPage}>About us</h4>
//                       </Link>
//                     </Grid>
                    
//                   </Grid>
//         </div>
//     )
// }