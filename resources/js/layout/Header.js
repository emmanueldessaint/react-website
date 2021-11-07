import { useState, useEffect  } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
// import { AppBar } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { styled } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import Connect from '../components/Connect/Connect'
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import '../App.css';
import '../css/Header.css'
import { numberOfItemsInCart } from '../components/Shared/globalState'
import { currentPageProduct } from '../components/Shared/globalState'

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';



const useStyles = makeStyles(theme => ({

    routerDecoration: {
      "text-decoration":"none",
      "color":"black",
    },
   
    gridRight: {
        "display":"flex",
        "justify-content":"flex-start"
    },
    icon: {
        marginTop: '20px',
        "margin-left":"30px",
        "transform":"scale(1.3)",
        "opacity":"0.8",
        
    },
    alignTitle:{
        "display":"flex",
        "justify-content":"flex-end",
        
       
    }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 33,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function HideOnScroll(props) {

    const classes = useStyles();

    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });
    
    return (
        <Slide  appear={false} direction="down" in={!trigger}>
        {children}
        </Slide>
    );
}
      
HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

    export default function Header(props) {
    
      const classes = useStyles();

      const [numberInCart, setNumberInCart] = useRecoilState(numberOfItemsInCart);
      const [actuelPage, setActuelPage] = useRecoilState(currentPageProduct);
      
      var quantityInCart = 0;
      for (var i = 0 ; i < localStorage.length ; i ++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage[key]);
        quantityInCart += value.quantity;
      }
      

      useEffect(() => {
        
        setNumberInCart(quantityInCart)
      }, [quantityInCart])
      
      const resetPage = () => {
        setActuelPage(1);
      }


      return (
        <React.Fragment>
          <CssBaseline />
          <HideOnScroll {...props}>
            <AppBar style={{ background: '#ffffff' }}>
              <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container  >
                    <Grid item xs={3} className={classes.alignTitle} >
                        
                        <Link to="/" onClick={resetPage} className="item" className={classes.routerDecoration}>
                          <h2 className="titleHeader opacity8 font8">Paris<span className="ml-1"></span>Fabrics</h2>
                        </Link>                             
                      
                    </Grid>
                    <Grid xs={6} spacing={2} item container justifyContent="center" className={classes.routerDecoration}>
                      <Grid  item xs={3} >
                        <Link to="/"  >
                          <h4 className="opacity6 size2 itemMenu font5" onClick={resetPage}>Home</h4>
                        </Link>
                      </Grid>
                    
                      <Grid item xs={3} >
                        <Link to="/products"  >
                          <h4 className="opacity6 size2 itemMenu font5" onClick={resetPage}>Catalog</h4>
                        </Link>
                      </Grid>

                      <Grid item xs={3} >
                        <Link to="/aboutus"  >
                          <h4 className="opacity6 size2 itemMenu font5" onClick={resetPage}>About us</h4>
                        </Link>
                      </Grid>
                    
                    </Grid>
                    
                    <Grid className={classes.gridRight} item xs={3}>                    
                       
                        <Link to="/connect" onClick={resetPage} className="item" className={classes.routerDecoration}>
                          <SearchIcon  className={classes.icon} />
                        </Link>                             
                                            
                        <Link to="/cart" onClick={resetPage} className="item" className={classes.routerDecoration}>
                          <StyledBadge badgeContent={numberInCart} color="secondary">
                            <ShoppingCartIcon className={classes.icon}/>
                          </StyledBadge>                         
                        </Link>  

                                             
                    </Grid>                  
                  </Grid>
                  
                  
                </Box>
              </Toolbar>
            </AppBar>
          </HideOnScroll>      
        </React.Fragment>
      );
    }