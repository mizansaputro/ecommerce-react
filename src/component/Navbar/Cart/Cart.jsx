import React, {Fragment} from "react";
import { useNavigate } from "react-router-dom";


const Cart = ({cart, setCart, order, setOrder, isActiveCart, setIsActiveCart, handlerClickCart}) => {
    let subtotal = 0;
    const navigate = useNavigate();
    const handlerRemoveItem = id => {
        let cartCopy = cart;

        const indexItem = cartCopy.findIndex(object => {
            return object.id===id;
        })
        const orderByIndexItem = cartCopy[indexItem].order;

        cartCopy.splice(indexItem, 1);
        setCart(cartCopy);
        setOrder(order-orderByIndexItem);
    }
    const handlerViewCarClick = () => {
        setIsActiveCart(false);
        navigate('/cart-detail');

    }
    //console.log('halo')
    
    return (
        <Fragment>
            <div className={isActiveCart? "cart-container-hidennonactive":"cart-container-hidenactive"}>
                    <div className="cart-content-hiden">
                        <div className="flexbox-text">
                            <p className="title-cart-hiden">Your Cart</p>
                            <p className="title-cart-hiden X" onClick={handlerClickCart}>x</p>
                        </div>
                        <p className="body-cart-hiden">{`you have ${order} in your cart!`}</p>
                        <div className="cart-scroll-hiden">
                            {
                                cart?.map((item)=>{
                                    subtotal = subtotal + item.finalPrice*item.order;
                                    let disc = true;
                                    if (parseInt(item.price.substr(2))===item.finalPrice){
                                        disc = false;
                                    }
                                    return (
                                        <div>
                                            <div className="item-hidden-content">
                                                <img src={item.img} alt={`${item.name}.img`} className="item-hidden-image" />
                                                <div className="item-hidden-info">
                                                    <p className="item-hidden-title">{item.name}</p>
                                                    <p className="item-hidden-price">Rp {item.finalPrice}</p>
                                                    <p className="item-hidden-qty">qty: {item.order}</p>
                                                    <p className="item-hiden-remove" onClick={() => handlerRemoveItem(item.id)}>Remove</p>
                                                </div>
                                                <div className="item-hidden-subtotal">
                                                    <p className={disc? "item-hidden-noDiscPrice":"item-hidden-discPrice"}>Rp {parseInt(item.price.substr(2))*item.order}</p>
                                                    <p className={disc? "item-hidden-finalPrice":"item-hidden-finalPrice-no"}>Rp {item.finalPrice*item.order}</p>
                                                </div>
                                            </div>
                                            <div className="hr-peritem">
                                                
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <hr className="line"/> 
                        <div className="subtotal-page">
                            <div className="subtotal-text">Subtotal:</div>
                            <div className="subtotal-info">Rp {subtotal}</div>
                        </div>
                        <div >
                            <button className="button-info viewcart" onClick={handlerViewCarClick}>VIEW CART</button>
                        </div>
                        <div>
                            <button className="button-info proceed">PROCEED TO CHECKOUT</button>

                        </div>
                    </div>

                        
            </div>
                <div className={isActiveCart? "darker plus":"normal"}>
                

                </div>
        </Fragment>
    );
}
export default Cart;    