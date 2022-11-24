import React, {Fragment, useEffect} from "react";
import "./Checkout.css";

const Checkout = () =>{

    useEffect(()=>{
        window.scrollTo(0,0);
    })
    return(
        <Fragment>
            <div className="image-container-checkout">
                <img src="https://img.freepik.com/premium-vector/3d-isometric-concept-stores-closing-businesses-bankrupt_109064-593.jpg?w=2000" alt="gambar" />
                <div className="title">Oops! We're not open yet.</div>
                <div className="body">But it won't be too long! Please come back again later.</div>
                <div className="btn-checkout">
                    
                    <div className="btn-checkout-text">Can’t wait? Contact Seller Now!</div>
                </div>
            </div>
        </Fragment>
    );
}
export default Checkout;