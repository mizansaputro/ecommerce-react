import React, {Fragment, useState} from "react";
import "./Navbar.css";
import cartIcon from "./img-src/cart.png";
import searchIcon from "./img-src/search.png";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart/Cart";

const Navbar = ({uniqueCategory, cart, setCart, order, setOrder}) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [isActiveCart, setIsActiveCart] = useState(false);

    const handlerHomeClick = () => {
        setIsActive(false);
        setIsActiveCart(false);
        navigate('/');
    }

    const handlerShopClick = () => {
        setIsActive(false);
        setIsActiveCart(false);
        navigate('/shop/');
    }
    const handlerClickCart = () => {
        setIsActive(false);
        setIsActiveCart(!isActiveCart);
    }

    const handlerCollectionClick = (category) =>{
        setIsActive(!isActive);
        navigate(`/shop/${category}`);
    }
    const handlerCollectionClickMenu = () =>{
        setIsActiveCart(false);
        setIsActive(!isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log('ini navbar')
    

    return (
        <Fragment>
                <div className={isActiveCart? "nav-container nav-active":"nav-container"}>
                    <div className="logo-container">
                        <p className="logo-text">fashionista</p>
                        <p className="dot-text">.</p>
                    </div>
                    <div className="menu-container">
                        <p className="menu-text" onClick={handlerHomeClick}>HOME</p>
                        <p className="menu-text" onClick={handlerShopClick}>SHOP</p>
                        <p className="menu-text">BEST SELLERS</p>
                        <div className="collection-container">
                            <p className="menu-text" onClick={handlerCollectionClickMenu} >COLLECTION</p>
                        </div>
                        
                        <p className="menu-text">CONTACT US</p>
                    </div>
                    <div className="cart-search-container">
                        <div className="cart-container">
                            <img src={cartIcon} alt="cart-icon" className="cart-icon" onClick={handlerClickCart}/>
                                {
                                    order===0? (
                                        <div className="order-value-cart no-value">
                                            {order}
                                        </div>) : (
                                        <div className="order-value-cart" >
                                                    {order}
                                        </div>)                
                                }
                            
                        </div>
                        <div className="search-icon-container">
                            <img src={searchIcon} alt="search-icon" className="search-icon" />
                        </div>
                    </div>
                </div>
                <div className={isActive? "collection-hide-menu-nonactive":"collection-hide-menu-active"}>
                    <div className="hide-menu-container">
                        <div className="collection-grid">
                            {
                                uniqueCategory?.map((category,index) => {
                                    return (
                                        <div className="collection-grid-text" name={category} key={index} onClick={() => handlerCollectionClick(category)}>
                                            {category}
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="img-container-hide">
                            <div>
                                <img className="img-banner-hide" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-banner-template-design-9db9afa9dc48742dd1f63f4b3e970eb1_screen.jpg?ts=1605628683" alt="banner.img" />
                            </div>
                            
                            <p className="text-banner">Exclusive New Outer Collection 2020</p>
                        </div>
                    </div>
                </div>
                <Cart cart={cart} setCart={setCart} order={order} setOrder={setOrder} isActiveCart={isActiveCart} setIsActiveCart={setIsActiveCart} handlerClickCart={handlerClickCart}/>
                <div className={isActive? "darker":"normal"}>
                

                </div>
        </Fragment>
    );
}

export default Navbar;