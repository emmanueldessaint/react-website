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
                        <h2 className="centerText grey6 size20 bold200 font12">Our Story...</h2>
                        {/* <h3 className="centerText grey6 size20 bold200 font12 mb-8">Une créatrice, un savoir-faire naturel, une éthique…</h3> */}
                    </Grid>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" className="menuQuality">
                <Grid item container xs={12} md={10} spacing={2}>
                    <Grid item xs={12} sm={4}><img className="imageProduct" src="https://fabric-store.imgix.net/blog/DIYs/2021/Table-Setting/DIY-Table-Setting-Detail.jpg?auto=format&fp-x=0.5&fp-y=0.5&ixlib=php-2.1.1&q=85&w=900" alt="parisfabrics sewing quality"/></Grid>
                    <Grid item xs={12} sm={4}><img className="imageProduct" src="https://i.shgcdn.com/462b5a50-2a99-490d-8c2d-da1175573e81/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="parisfabrics sewing quality"/></Grid>
                    <Grid item xs={12} sm={4}><img className="imageProduct" src="https://i.shgcdn.com/9c21b692-7d8c-431c-a64b-2ba4f1c47121/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="parisfabrics sewing quality"/></Grid>


                </Grid>
            </Grid>
            <Grid container justifyContent="center" className="menuQuality">
                <Grid item container xs={11} md={10} >

                    <h2 className="centerText grey6 size20 bold200 font12">A Genuine Know-How</h2>

                    <p className="justifyText size4 grey6 font2"><img className="imgAboutUsP1" src="https://i.shgcdn.com/4bdc3ac6-fa9c-4a91-9f85-440d2c740059/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="parisfabrics sewing quality"/> After a successful launch online, we expanded and opened one store in Paris. We have our <span className="importantWords">own designers.</span> We produce small ranges of exclusive boxes and sewing accessories. We’re careful not to produce or hold excessive amounts of inventory and we have selected manufacturers that follow and <span className="importantWords">meet international standards in key areas of environmental and social impact.</span> We believe that there are already far too many mass manufactured, ethically questionable fabrics and garments in existence. We made a conscious decision early on to rework the traditional tools supply model of purchasing entirely new or custom materials, allowing us to avoid the damaging and contradictory cycle of waste that it creates. We believe that it is important to us to run our business mindfully with thought and concern for <span className="importantWords">the future of our world and environment.</span><br /><br />
                    
                    At the Paris Fabrics we are simply lovers of sewing. We are a destination point for the sewing and creative community, offering a curated range of unique boxes and mill overruns coupled with an  <span className="importantWords">exceptional in-store experience and dedicated, passionate service.</span> We aim to provide an alternative option within a fast-fashion society where fine craft and high quality sewing tools or accessories are often undervalued. We are huge supporters of home sewing and the #memade movement and appreciate the time and care that goes into creating garments by hand. We believe that creative endeavors like <span className="importantWords">home sewing and crafts can also have a profound impact on our well-being.</span></p>

                    <h2 className="centerText grey6 size20 bold200 font12">Knowledge and Experience</h2>
                    <p className="justifyText size4 grey6 font2">Our company sells a wide variety of high quality brand name sewing boxes and tools. Buy online or stop by a store and let our staff help you find the right box for your sewing needs. You can also contact us if you need more information on a specific product. We have everything you need to make your sewing experience convenient and comfortable.<img className="imgAboutUsP2" src="https://i.shgcdn.com/221330c6-030a-4ba8-be78-444d955ae183/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="parisfabrics sewing quality"/><span className="importantWords"> Moreover, we are proud to be actively engaged within our local communities through charitable donations to a wide variety of causes. </span> We’ve established these channels as an ideal means to mitigate fabric wastage by sorting and <span className="importantWords">donating offcuts and even our smallest scraps to a diverse range of community</span> groups including <span className="importantWords">animal rescue operations, kindergartens and many non-profit groups</span> such as those sewing for children’s hospitals. If you are located close to one of our stores and are involved in a community group that may have need or use for fabric offcuts or scraps please get in touch with us here to enquire.
                    <br /><br /> We encourage you to join our mailing list to receive regular updates on our exciting new arrivals and exclusive VIP offers, as well as new pattern reviews, DIY projects and staff creations posted on our blog.</p>


                    {/* <h2 className="centerText grey9 font6">THE SEWING MADNESS ...</h2>
                    <p className="justifyText size5 grey6 font2">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,<img className="imgAboutUsP2" src="https://picsum.photos/200/300" width="300" height="300" alt="parisfabrics sewing quality"/> a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"<br /><br /> (The Extremes of Good and Evil) by Cicero, written in 45 BC.This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections</p> */}
                </Grid>
            </Grid>

        </div>
    )
}