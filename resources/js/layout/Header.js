import { useState, useEffect } from 'react';
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
import Connect from '../components/Connect/Connect';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import '../App.css';
import '../css/Header.css';
import { numberOfItemsInCart, items } from '../components/Shared/globalState';
import { currentPageProduct } from '../components/Shared/globalState';
import logoParis from "../../assets/img/logo-paris.png";
import InputAdornment from '@material-ui/core/InputAdornment';
import Hamburger from 'hamburger-react';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';



const useStyles = makeStyles(theme => ({



  alignTitle: {
    "display": "flex",
    "justify-content": "center",


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
    <Slide appear={false} direction="down" in={!trigger}>
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
  const [isOpen, setOpen] = useState(false)

  var quantityInCart = 0;
  for (var i = 0; i < localStorage.length; i++) {
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

  const closeHamburger = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar style={{ background: 'rgb(240, 240, 240)' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <div className="header960">
                <Grid container  >
                  <Grid item xs={3} className={classes.alignTitle} >
                    <Link to="/" onClick={resetPage} className="item" className={classes.routerDecoration}>
                      <h2 className="titleHeader grey9 font8 size3">Paris<span className="ml-1"></span>Fabrics</h2>
                    </Link>
                    {/* <img src={logoParis} alt="parisFabricsLogo" className="logoParis height70" /> */}
                  </Grid>
                  <Grid xs={6} spacing={2} item container justifyContent="center" className="menuHeader">
                    <Grid item xs={3} >
                      <Link to="/"  >
                        <span className="verticalAlign letterSpacing5 size9 mt-3 bold600 itemMenu  font9" onClick={resetPage}>Home</span>
                      </Link>
                    </Grid>
                    <Grid item xs={3} >
                      <Link to="/catalog"  >
                        <span className="verticalAlign letterSpacing5 size9 mt-3 bold600 itemMenu font9" onClick={resetPage}>Catalog</span>
                      </Link>
                    </Grid>
                    <Grid item xs={3} >
                      <Link to="/aboutus"  >
                        <span className="verticalAlign letterSpacing5 size9 mt-3 bold600 itemMenu font9" onClick={resetPage}>About us</span>
                      </Link>
                    </Grid>
                    <Grid item xs={3} >
                      <Link to="/aboutus"  >
                        <span className="verticalAlign letterSpacing5 size9 mt-3 bold600 itemMenu font9" onClick={resetPage}>Contact</span>
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid className="alignRight" item xs={3}>
                    <Link to="/cart" onClick={resetPage}  >
                      <StyledBadge className="mr-8" badgeContent={numberInCart} color="primary">
                        <ShoppingCartIcon className='iconHeader' />
                      </StyledBadge>
                    </Link>
                    <div className="mr-5 ml-5 mt-1">
                      <TextField
                        label="Search"
                        id="outlined-size-small"
                        size="small"
                        InputProps={{
                          endAdornment: <SearchIcon className={classes.icon} />,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="header959">
                <Grid container  >
                  <Grid item xs={3}>
                    <div className="mt-3">
                      <Hamburger color="#000000" size={25} toggled={isOpen} toggle={setOpen} />
                      {isOpen &&
                        <div className="grey8 mb-2 letterSpacing1">
                          <Link to="/" onClick={resetPage} onClick={closeHamburger}><span className="cursorPointer grey8 size3 letterSpacing2 font10 mt-2">Home</span></Link>
                          <Link to="/catalog" onClick={resetPage} onClick={closeHamburger}><div className="cursorPointer grey8 size3 letterSpacing2 font10 mt-2">Catalog</div></Link>
                          <Link to="/aboutus" onClick={resetPage} onClick={closeHamburger}><div className="cursorPointer grey8 size3 letterSpacing2 font10 mt-2">About Us</div></Link>
                          <Link to="/aboutus" onClick={resetPage} onClick={closeHamburger}><div className="cursorPointer grey8 size3 letterSpacing2 font10 mt-2">Contact</div></Link>
                        </div>
                      }
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Link to="/" onClick={resetPage}>
                      <h2 className="titleHeader grey9 font8 size3 flexCenter">Paris<span className="ml-1"></span>Fabrics</h2>
                    </Link>
                    {isOpen &&
                      <div className="verticalAlign mt-6">
                        <TextField
                          label="Search"
                          id="outlined-size-small"
                          size="small"
                          InputProps={{
                            endAdornment: <SearchIcon className={classes.icon} />,
                          }}
                        />
                      </div>
                    }
                  </Grid>
                  <Grid item xs={3} className="alignRight">
                    <Link to="/cart" onClick={resetPage}  >
                      <StyledBadge className="mr-4 mt-1" badgeContent={numberInCart} color="primary">
                        <ShoppingCartIcon className='iconHeader' />
                      </StyledBadge>
                    </Link>
                  </Grid>

                </Grid>
              </div>

            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}