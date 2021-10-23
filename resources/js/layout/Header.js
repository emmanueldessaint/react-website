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
import Connect from '../components/Connect/Connect'
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import '../App.css';
import '../css/Header.css'
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
      
    
      return (
        <React.Fragment>
          <CssBaseline />
          <HideOnScroll {...props}>
            <AppBar style={{ background: '#ffffff' }}>
              <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={10} >
                    <Grid item xs={3} className={classes.alignTitle} >
                        
                        <Link to="/" className="item" className={classes.routerDecoration}>
                          <h2 className="titleHeader">AmazingSewing</h2>
                        </Link>                             
                      
                    </Grid>
                    <Grid item xs={6} >
                      <Grid className="pt-2">
                        <TextField 
                          fullWidth
                          id="standard-basic" 
                          placeholder="search a product ..."
                          variant="standard" 
                        />
                      </Grid>
                    </Grid>
                    <Grid className={classes.gridRight} item xs={3}>                    
                       
                        <Link to="/connect" className="item" className={classes.routerDecoration}>
                          <PersonIcon  className={classes.icon} />
                        </Link>                             
                      
                      
                        <Link to="/cart" className="item" className={classes.routerDecoration}>

                          <StyledBadge badgeContent={4} color="secondary">
                            <ShoppingCartIcon className={classes.icon}/>
                          </StyledBadge>
                          
                        </Link>  

                                             
                    </Grid>                  
                  </Grid>
                  <Grid container spacing={2} justifyContent="center" className={classes.routerDecoration}>
                    <Grid item xs={2} >
                      <Link to="/"  >
                        <h4>Home</h4>
                      </Link>
                    </Grid>
                    
                    <Grid item xs={2} >
                      <Link to="/products"  >
                        <h4>Catalog</h4>
                      </Link>
                    </Grid>

                    <Grid item xs={2} >
                      <Link to="/products"  >
                        <h4>About us</h4>
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