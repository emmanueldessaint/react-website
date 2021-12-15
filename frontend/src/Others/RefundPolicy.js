import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import { Helmet } from "react-helmet";

export default function RefundPolicy() {

    window.scrollTo(0, 0);

    return (
        <div className="pt-13">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Refund Policy - Paris Fabrics</title>
            </Helmet>
            <Grid container justifyContent="center" >
                <Grid item container xs={11} sm={10} md={9} lg={8} spacing={2}>
                    <div className="mt-7 centerText size5 letterSpacing2">Refund policy</div>
                    <div className="grey7 font2 size2 mt-7">
                        <div className="">Returns</div>
                        <div className="mt-1">Our policy lasts 60 days. If 60 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.</div>
                        <div className="mt-4">To be eligible for a return, your item must be in the same condition that you received it. It must also be in the original packaging.</div>
                        <div className="mt-4">To complete your return, we require a receipt or proof of purchase.</div>
                        <div className="mt-4">Please do not send your purchase back to the manufacturer.</div>
                        <div className="mt-4">There are certain situations where only partial refunds are granted (if applicable)
                            Any item not in its original condition, which is damaged or missing parts will not be refunded.
                            Any item that is returned more than 30 days after delivery will not be refunded..</div>
                        <div className="mt-4">Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
                            If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</div>
                        <div className="mt-4">Late or missing refunds (if applicable)
                            If you haven’t received a refund yet, first check your bank account again.
                            Then contact your credit card company, it may take some time before your refund is officially posted.
                            Next contact your bank. There is often some processing time before a refund is posted.
                            If you’ve done all of this and you still have not received your refund yet, please contact us here.</div>
                        <div className="mt-4">Exchanges (if applicable)</div>
                        <div className="mt-4">We only replace items if they are defective or damaged. If you need to exchange it for the same item, contact us here.</div>
                        <div className="mt-4">Shipping</div>
                        <div className="mt-4">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</div>
                        <div className="mt-4">Depending on where you live, the time it may take for your exchanged product to reach you, may vary.</div>
                        <div className="mt-4">If you are shipping an item over $75, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}