import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import '../../App.css';
import TextField from '@material-ui/core/TextField';


export default function Contact() {

    return (
        <div className="pt-13">
            <Grid container justifyContent="center" >
                <Grid item container xs={11} sm={10} md={9} lg={8} spacing={2}>
                    <div className="mt-7 centerText size5 letterSpacing2">Contact</div>
                    <div className="mt-7">Contact us with the form below or send us an e-mail to contact@amazing-sewing.com. We usually reply within 48h.</div>
                    <Grid item container xs={12} spacing={2}>
                        <Grid xs={6}>
                            <TextField
                                label="name"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={6}>
                            <TextField
                                label="email"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}