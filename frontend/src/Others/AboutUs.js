import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import '../css/AboutUs.css';
import { Helmet } from "react-helmet";

export default function AboutUs() {
    
    window.scroll(0, 0);

    return (
        <div className="pt-13">
            <Helmet>
                <meta charSet="utf-8" />
                <title>About us - Paris Fabrics</title>
            </Helmet>
            <Grid container justifyContent="center" className="menuQuality">
                <Grid item container xs={12} md={10} spacing={2}>
                    <Grid xs={12} item>
                        <h2 className="centerText grey9 font9">RETROUVEZ TOUTE L’HISTOIRE D’AIMÉE DE MARS</h2>
                        <h3 className="centerText grey9 font9 mb-8">Une créatrice, un savoir-faire naturel, une éthique…</h3>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" className="menuQuality">
                <Grid item container xs={12} md={10} spacing={2}>
                    <Grid item xs={4}><img className="imageProduct" src="https://picsum.photos/200/300" alt="parisfabrics sewing quality"/></Grid>
                    <Grid item xs={4}><img className="imageProduct" src="https://picsum.photos/200/300" alt="parisfabrics sewing quality"/></Grid>
                    <Grid item xs={4}><img className="imageProduct" src="https://picsum.photos/200/300" alt="parisfabrics sewing quality"/></Grid>


                </Grid>
            </Grid>
            <Grid container justifyContent="center" className="menuQuality">
                <Grid item container xs={11} md={10} >

                    <h2 className="centerText grey9 font9">A GENUINE KNOW-HOW</h2>

                    <p className="justifyText size5 font2 grey6"><img className="imgAboutUsP1" src="https://picsum.photos/200/300" width="300" height="300" alt="parisfabrics sewing quality"/>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections <span className="importantWords">1.10.32 and 1.10.33 of "de Finibus Bonorum</span> et Malorum"<br /><br /> (The Extremes of Good and Evil) by Cicero, written in 45 BC.This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32Contrary to popular belief, <span className="importantWords">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor</span> at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections</p>

                    <h2 className="centerText grey9 font6">THE SEWING MADNESS ...</h2>
                    <p className="justifyText size5 grey6 font2">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,<img className="imgAboutUsP2" src="https://picsum.photos/200/300" width="300" height="300" alt="parisfabrics sewing quality"/> a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"<br /><br /> (The Extremes of Good and Evil) by Cicero, written in 45 BC.This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections</p>
                </Grid>
            </Grid>

        </div>
    )
}