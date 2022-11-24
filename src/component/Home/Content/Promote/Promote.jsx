import React, {Fragment} from "react";
import imgBag from "./img-src/bag-img.png";

const Promote = () => {
    return(
        <Fragment>
            <div className="promote-container">
                <div className="promote-text">
                    <p className="promote-title">Deal of the Week</p>
                    <p className="promote-body">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <button className="promote-btn">Shop Now</button>
                </div>
                <div className="img-promote-container">
                    <img src={imgBag} alt="img-bag" />
                </div>

            </div>
        </Fragment>
    );
}
export default Promote;