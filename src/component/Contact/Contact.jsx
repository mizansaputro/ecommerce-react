import React, {Fragment} from "react";
import "./Contact.css";
import phoneImg from "./img-src/phone-img.png";
import mailImg from "./img-src/mail.png";
import locationImg from "./img-src/location.png";

const Contact = () => {
    return (
        <Fragment>
            <div className="contact-container">
                <div className="contact-info-container">
                    <div className="contact-info">
                        <p className="contact-info-title">fashion</p>
                        <p className="contact-info-body">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </p>
                    </div>
                    <div className="contact-info-2">
                        <p className="contact-info-title-2">Menus</p>
                        <p className="contact-info-body-2">Shop</p>
                        <p className="contact-info-body-2">Best Seller</p>
                        <p className="contact-info-body-2">Collection</p>
                        <p className="contact-info-body-2">Blog</p>
                        <p className="contact-info-body-2">Contact</p>
                        
                    </div>
                    <div className="contact-info-2 contact">
                        <p className="contact-info-title-2">Contact Us</p>
                        <div className="contact-info-contact">
                            <img src={phoneImg} alt="" className="contact-info-img"/>
                            <p className="contact-info-body-2">(+62) 89 6750 69841</p>
                        </div>
                        <div className="contact-info-contact">
                            <img src={mailImg} alt="" className="contact-info-img"/>
                            <p className="contact-info-body-2">mail@fashion.com</p>
                        </div>
                        <div className="contact-info-contact">
                            <img src={locationImg} alt="" className="contact-info-img"/>
                            <p className="contact-info-body-2">489, Hog Camp Road, Illinois</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="template-container">
                <p className="contact-info-body-2">© Copyright 2020 AVANA. All rights reserved.</p>
            </div>
        </Fragment>
    );
}

export default Contact;