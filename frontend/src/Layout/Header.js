import { useState, useEffect } from "react";
import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Slide from "@material-ui/core/Slide";
import Badge from "@material-ui/core/Badge";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { styled } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import "../App.css";
import "../css/Header.css";
import {
  numberOfItemsInCart,
  itemsProduct,
  changingPage,
  mobileMenuOn,
  currentPageProduct,
} from "../Shared/globalState";
import Hamburger from "hamburger-react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useRecoilState } from "recoil";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  alignTitle: {
    display: "flex",
    "justify-content": "center",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 33,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const DisconectButton = withStyles((theme) => ({
  root: {
      color: '#020202',
      backgroundColor: '#dbb013',
      borderRadius: 4,
      opacity: 0.9,
      wordSpacing: 3,
      letterSpacing: 1,
      fontWeight: 800,
      '&:hover': {
          opacity: 1,
          backgroundColor: '#dbb013',
      },
  },
}))(Button);

function HideOnScroll(props) {
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
  const [isOpen, setOpen] = useRecoilState(mobileMenuOn);
  const [searchTerm, setSearchTerm] = useState("");
  const [allItems, setAllItems] = useRecoilState(itemsProduct);
  const [isLoaded, setIsLoaded] = useState(false);
  const [changePage, setChangePage] = useRecoilState(changingPage);
  const [menuMobileOpen, setMenuMobileOpen] = useState(true);
  const [searchMobileOpen, setSearchMobileOpen] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);

  useEffect(() => {
    var ourCart = JSON.parse(localStorage.getItem("cart_Paris_Fabrics"));
    var quantityInCart = 0;
    if (ourCart === null) {
    } else {
      for (var i = 0; i < ourCart.length; i++) {
        quantityInCart += ourCart[i].quantity;
      }
    }
    setNumberInCart(quantityInCart);
  }, []);

  const resetPage = () => {
    setActuelPage(1);
    setOpen(false);
  };

  useEffect(() => {
    if (allItems.length !== 0) {
      setIsLoaded(true);
    }
  }, [allItems]);

  const closeSearch = () => {
    setSearchTerm("");
    setChangePage(true);
    setOpen(false);
  };

  const resetMenuMobile = () => {
    setMenuMobileOpen(true);
    setSearchMobileOpen(false);
  };

  const changeMenuMobile = () => {
    setSearchTerm("");
    setMenuMobileOpen(!menuMobileOpen);
    setSearchMobileOpen(!searchMobileOpen);
  };

  const closeDialogLogout = () => {
    setLogoutDialog(false);
  }

  const disconnect = () => {
    setLogoutDialog(false);
    localStorage.removeItem("loggin_Paris_Fabrics");
  }

  useEffect(() => {
    if (isLoaded === true && searchTerm.length > 1) {
      window.addEventListener("click", function (e) {
        if (document.getElementById("clickbox").contains(e.target)) {
          // Clicked in box
        } else {
          // Clicked outside the box
          setSearchTerm("");
        }
      });
    }
  });


  return (
    <div>
      <div className="headerPc">
        <React.Fragment>
          <CssBaseline />
          <HideOnScroll {...props}>
            <div>
              <AppBar>
                <Toolbar className="bgBlue">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                      <Grid item xs={3} className={classes.alignTitle}>
                        <Link
                          to="/"
                          onClick={resetPage}
                          className="item textDecorationNone"
                        >
                          <h2 className="titleHeader grey9 font8 size3">
                            Paris<span className="ml-1"></span>Fabrics
                          </h2>
                        </Link>
                        {/* <img src={logoParis} alt="parisFabricsLogo" className="logoParis height70" /> */}
                      </Grid>
                      <Grid
                        xs={6}
                        spacing={2}
                        item
                        container
                        justifyContent="center"
                        className="menuHeader"
                      >
                        <Grid item xs={3}>
                          <Link
                            id="demotext"
                            to="/"
                            className="textDecorationNone"
                          >
                            <span
                              className="verticalAlign grey7 letterSpacing2 size6 mt-4 itemMenu font12"
                              onClick={resetPage}
                            >
                              Home
                            </span>
                          </Link>
                        </Grid>
                        <Grid item xs={3}>
                          <Link to="/catalog" className="textDecorationNone">
                            <span
                              className="verticalAlign grey7 letterSpacing2 size6 mt-4 itemMenu font12"
                              onClick={resetPage}
                            >
                              Catalog
                            </span>
                          </Link>
                        </Grid>
                        <Grid item xs={3}>
                          <Link to="/aboutus" className="textDecorationNone">
                            <div
                              className="textCenter  grey7  letterSpacing2 size6 mt-4 itemMenu font12"
                              onClick={resetPage}
                            >
                              Our Story
                            </div>
                          </Link>
                        </Grid>
                        <Grid item xs={3}>
                          <Link to="/contact" className="textDecorationNone">
                            <span
                              className="verticalAlign  grey7  letterSpacing2 size6 mt-4 itemMenu font12"
                              onClick={resetPage}
                            >
                              Contact
                            </span>
                          </Link>
                        </Grid>
                      </Grid>
                      <Grid className="alignRight" item xs={3}>
                        <Link
                          to="/cart"
                          onClick={resetPage}
                          className="textDecorationNone"
                        >
                          <StyledBadge
                            className="mr-4 cartHeader"
                            badgeContent={numberInCart}
                            color="primary"
                          >
                            <ShoppingCartIcon className="iconHeader cartHeader" />
                          </StyledBadge>
                        </Link>
                        {JSON.parse(localStorage.getItem("loggin_Paris_Fabrics")) !== null
                          ? <div
                            className="mr-2 textDecorationNone cursorPointer"
                            onClick={() => setLogoutDialog(true)}
                          >
                            <ExitToAppIcon className="iconHeader cartHeader" />
                          </div>
                          : <Link
                            className="mr-2 textDecorationNone"
                            to="/Connect"
                            onClick={resetPage}
                          >
                            <PersonAddIcon className="iconHeader cartHeader" />
                          </Link>
                        }
                        <Dialog
                          open={logoutDialog}
                          onClose={closeDialogLogout}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogActions className="mb--3  mr-2">
                            <ClearIcon
                              onClick={closeDialogLogout}
                              className=" cursorPointer"
                            />
                          </DialogActions>
                          <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to disconnect ?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              <div
                                className="textDecorationNone flexCenter"
                              >
                                <DisconectButton  variant="contained" onClick={disconnect}>
                                  Disconect
                                </DisconectButton>
                              </div>
                            </DialogContentText>
                          </DialogContent>
                        </Dialog>

                        <div className="mr-3 ml-5 mt-1">
                          <TextField
                            label="Search"
                            id="outlined-size-small"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                              endAdornment: (
                                <SearchIcon className={classes.icon} />
                              ),
                            }}
                          />
                        </div>
                        {isLoaded === true && searchTerm.length > 1 && (
                          <div className="dataSearch" id="clickbox">
                            {allItems
                              .filter((element) =>
                                element.name.toLowerCase().includes(searchTerm)
                              )
                              .map((filteredName) => (
                                <div key={filteredName.id}>
                                  <Link
                                    to={`/${filteredName.name}`}
                                    onClick={closeSearch}
                                    className="m-1 flex pt-1 pb-1 productHoverSearch textDecorationNone grey6"
                                  >
                                    <img
                                      className="imgProductSearch ml-1"
                                      src={
                                        window.location.origin +
                                        `/images/${filteredName.images[0].url}`
                                      }
                                    />
                                    <div className="font10 letterSpacing2 size3 verticalItem pl-3">
                                      {filteredName.name}
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            {allItems.filter((element) =>
                              element.name.toLowerCase().includes(searchTerm)
                            ).length === 0 && (
                                <div className="verticalAlign font10 grey6 letterSpacing2 size3 height70">
                                  No result for your search
                                </div>
                              )}
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Toolbar>
              </AppBar>
            </div>
          </HideOnScroll>
        </React.Fragment>
      </div>
      <div className="headerMobile" id="clickbox">
        <Grid container>
          <Grid item xs={3}>
            <div className="mt-3 marginLeftHamburger">
              <div onClick={resetMenuMobile}>
                <Hamburger
                  color="#000000"
                  size={25}
                  toggled={isOpen}
                  toggle={setOpen}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Link to="/" onClick={resetPage} className="textDecorationNone">
              <h2 className="titleHeader grey9 font8 size3 flexCenter">
                Paris<span className="ml-1"></span>Fabrics
              </h2>
            </Link>
          </Grid>
          <Grid item xs={3} className="alignRight">
            <Link to="/cart" onClick={resetPage}>
              <StyledBadge
                className="cartHeaderMobile mt-1"
                badgeContent={numberInCart}
                color="primary"
              >
                <ShoppingCartIcon className="iconHeader" />
              </StyledBadge>
            </Link>
          </Grid>
          <Grid item xs={12}>
            {isOpen && menuMobileOpen && (
              <div className="grey7  letterSpacing2 font12 menuMobile">
                <Link to="/" onClick={resetPage} className="textDecorationNone">
                  <div className="cursorPointer menuMobileItem  size6  pl-2 pt-2 pb-2 grey9">
                    Home
                  </div>
                </Link>
                <Link
                  to="/catalog"
                  onClick={resetPage}
                  className="textDecorationNone"
                >
                  <div className="cursorPointer menuMobileItem  size6 pl-2  pt-2 pb-2 grey9">
                    Catalog
                  </div>
                </Link>
                <Link
                  to="/aboutus"
                  onClick={resetPage}
                  className="textDecorationNone"
                >
                  <div className="cursorPointer menuMobileItem  size6 pl-2 pt-2 pb-2 grey9">
                    Our Story
                  </div>
                </Link>
                <Link
                  to="/aboutus"
                  onClick={resetPage}
                  className="textDecorationNone"
                >
                  <div className="cursorPointer menuMobileItem  size6 pl-2  pt-2 pb-2 grey9">
                    Contact
                  </div>
                </Link>
                <Grid container>
                  <Grid item sm={3} xs={4} className="verticalAlign">
                    {JSON.parse(localStorage.getItem("loggin_Paris_Fabrics")) !== null
                      ? <Link to="/Account" onClick={resetPage}>
                        <ExitToAppIcon className=" scale3 grey9" />
                      </Link>
                      : <Link to="/Connect" onClick={resetPage}>
                        <AccountCircleIcon className=" scale3 grey9" />
                      </Link>
                    }
                  </Grid>
                  <Grid item s={6} xs={7}>
                    <div className="verticalAlign mt-5 mb-5">
                      <button
                        onClick={changeMenuMobile}
                        className="buttonSearchMobile cursorPointer lightShadowCard letterSpacing2 font2 size2 grey7"
                      >
                        Search articles
                        <SearchIcon className="ml-2" />
                      </button>
                    </div>
                  </Grid>
                  <Grid item sm={3} xs={1}></Grid>
                </Grid>
              </div>
            )}
            {isOpen && searchMobileOpen && (
              <div>
                <div className="verticalAlign mt-4 mb-6">
                  <TextField
                    variant="outlined"
                    label="Search"
                    id="outlined-size-small"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      endAdornment: <SearchIcon className={classes.icon} />,
                    }}
                  />
                </div>
                <div className="flexBetween grey8 underlined mb-1">
                  <div className="ml-3" onClick={changeMenuMobile}>
                    Close the search
                  </div>
                  <Link to="/catalog" onClick={resetPage} className="mr-3">
                    See our catalog
                  </Link>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
        {isLoaded === true && searchTerm.length > 0 && (
          <div className="dataSearchMobile ">
            {allItems
              .filter((element) =>
                element.name.toLowerCase().includes(searchTerm)
              )
              .map((filteredName) => (
                <div key={filteredName.id}>
                  <Link
                    to={`/${filteredName.name}`}
                    onClick={closeSearch}
                    className="m-1 flex pt-1 pb-1 productHoverSearch textDecorationNone grey6"
                  >
                    <img
                      className="imgProductSearch ml-1"
                      src={
                        window.location.origin +
                        `/images/${filteredName.images[0].url}`
                      }
                    />
                    <div className="font10 grey6 letterSpacing2 size3 verticalItem pl-3">
                      {filteredName.name}
                    </div>
                  </Link>
                </div>
              ))}
            {allItems.filter((element) =>
              element.name.toLowerCase().includes(searchTerm)
            ).length === 0 && (
                <div className="verticalAlign font10 grey6 letterSpacing2 size3 height70">
                  No result for your search
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
