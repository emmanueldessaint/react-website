import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import { Helmet } from "react-helmet";

export default function Faq() {

    window.scrollTo(0, 0);

    return (
        <div className="pt-13">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Faq - Paris Fabrics</title>
            </Helmet>
            <Grid container justifyContent="center" >
                <Grid item container xs={11} sm={10} md={9} lg={8} spacing={2}>
                    <div className="mt-7 centerText size5 letterSpacing2">FAQ's</div>
                    <div>
                        <div className="mt-7 bold600 grey9 font2 size6">How can I contact ParisFabrics ?</div>
                        <div className="mt-3 grey7 size3">You can simply contact us here, our customer service team will be happy to help you with whatever you need!</div>

                        <div className="mt-7 bold600 grey9 font2 size6">How do I check the status of my order ?</div>
                        <div className="mt-3 grey7 size3">Upon placing your order, please allow up to 3 business days to have your order processed. Our fulfillment warehouses pack your ordered items and ship the packages out as soon as possible. Once you order has been shipped, you should receive an email containing your tracking number. If you did not receive the order tracking number or did not find any updates after 5 business days, please contact us and we will do all we can to investigate.</div>

                        <div className="mt-7 bold600 grey9 font2 size6">Why haven't I received a confirmation email ?</div>
                        <div className="mt-3 grey7 size3">If you have not received an automatically email after you placed your order, then that means you must've provided us the wrong email. Please contact us so that we can handle it.</div>

                        <div className="mt-7 bold600 grey9 font2 size6">Do your provide a quality guarantee for all products being sold ?</div>
                        <div className="mt-3 grey7 size3">Quality is guaranteed! If you do not like the product or find damages to the product, contact us immediately! We'll do our best to ensure the best shopping experience. You can simply contact us to get your problem adressed.</div>

                        <div className="mt-7 bold600 grey9 font2 size6">Do you ship internationally ?</div>
                        <div className="mt-3 grey7 size3">Yes! We ship worldwide to ensure that every customer will enjoy his or her shopping experience with us.</div>

                        <div className="mt-7 bold600 grey9 font2 size6">Where are we located ?</div>
                        <div className="mt-3 grey7 size3">We are currently located in France, in the city of Paris.</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}