import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import {
    Link
} from "react-router-dom";
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from "recoil";
import { previousUrl, account, idUser } from "../Shared/globalState";
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState, useEffect } from "react";


const useStyles = makeStyles(theme => ({


}));

export default function Account(props) {

    window.scroll(0, 0);

    let history = useHistory();
    const classes = useStyles();
    const { pathname } = useLocation();
    const [name, setName] = useState(JSON.parse(localStorage.getItem("loggin_Paris_Fabrics"))[0].name);

    return (
        <div className="pt-15">
            <Container>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Account - Paris Fabrics</title>
                </Helmet>
                <Grid container justifyContent="center">
                    <Grid container justifyContent="center" spacing={8} item xs={11} sm={12} md={11}>
                        <div>Account informations</div>
                        <div>{name}he
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

// if (JSON.parse(localStorage.getItem("loggin_Paris_Fabrics")) !== null) {

//     console.log(product.reviews)
//     console.log(JSON.parse(localStorage.getItem("loggin_Paris_Fabrics"))[0].name)

//     console.log(product.reviews.findIndex(element => element.title === JSON.parse(localStorage.getItem("loggin_Paris_Fabrics"))[0].name))

//     if (product.reviews.findIndex(element => element.title === JSON.parse(localStorage.getItem("loggin_Paris_Fabrics"))[0].name) == -1) {
//       setWriteReviews(!writeReviews);
//     } else {
//       setAlreadyCommented(true);
//     }
//   } else if (JSON.parse(localStorage.getItem("loggin_Paris_Fabrics")) === null) {
//     setOpen(true);
//   }