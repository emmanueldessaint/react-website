import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import { Helmet } from "react-helmet";

export default function ShippingPolicy() {

    window.scrollTo(0, 0);

    return (
        <div className="pt-13">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Shipping Policy - Paris Fabrics</title>
            </Helmet>
            <Grid container justifyContent="center" >
                <Grid item container xs={11} sm={10} md={9} lg={8} spacing={2}>
                    <div className="mt-7 centerText size5 letterSpacing2">Shipping policy</div>
                    <div className="grey7 size2 font2">
                        <div className="mt-7">Our goal is to offer you the best shipping time and price, no matter where you live. Every day, we deliver to a lot of customers across the world, ensuring that we provide the very highest levels of responsiveness to you at all times.</div>
                        <div className="mt-4">Our shipping price will usually be $2, wherever you live! Sometimes we offer Free Shipping!</div>
                        <div className="mt-4">The time frame for order delivery is divided into two parts:</div>
                        <div className="mt-4">•	Processing time: Order verification, tailoring, quality check and packaging. All orders are sent to the manufacturer for dispatch within 48 hours after the order is placed.</div>
                        <div className="mt-4">•	US Shipping time: This refers to the time it takes for items to be shipped from our warehouse to the destination. US delivery usually takes about 7–21 business days. US orders are usually shipped by ePacket, which is a US Postal Service product.</div>
                        <div className="mt-4">•	Other international shipping time: International deliveries usually takes about 7–21 business days, but may take longer depending on the country and the manufacturer of the product.</div>
                        <div className="mt-4">Please note that we can experience some delays with holidays so items can take longer to arrive.</div>
                        <div className="mt-4">All orders will be dispatched from our warehouse within 3 business days. Paris Fabrics does not take responsibility for any untracked parcels that go missing. We are not responsible for delays, lost or damaged shipments or orders sent to incorrect, invalid addresses or correct addresses. Paris Fabrics will help as much as possible to trace a missing parcel, however if untracked shipping is selected, it is the customer’s responsibility to follow up with the carrier. Paris Fabrics is not responsible for refunds of shipping costs in the event of delayed shipping due to product availability.</div>
                        <div className="mt-4">If you still did not receive your order after 30 days, please contact us here.</div>
                        <div className="mt-4">Please direct any shipping related inquiries here.</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}