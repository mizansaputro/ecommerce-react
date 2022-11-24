import React, {Fragment, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./CartDetail.css";

const CartDetail = ({cart, setCart, order, setOrder}) => {
    const [subtotal, setSubtotal] = useState(0);
    const  [discountPrice, setDiscountPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    
    const removeItemOnDetailCart = index =>{
        let data = cart;
        let price = parseInt(data[index].price.substr(2));
        let disc =  parseInt(data[index].discount.substr(0,data[index].discount.length-1));
        
        setOrder(order-data[index].order);
        setSubtotal(subtotal-(price*data[index].order));
        setDiscountPrice(discountPrice - ((price*disc)/100)*data[index].order);
            
        data.splice(index,1);
        setCart(data);
        
        
    }
    const handlerInputQtyChange = (event) =>{
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
        
        
    }
    const handlerInputQtyChangeOnChange = (event, index) => {
        const re = /^[0-9\b]+$/;
        if (re.test(event.target.value) || parseInt(event.target.value)>0) {
            const data = cart;
            let price = parseInt(data[index].price.substr(2));
            let disc =  parseInt(data[index].discount.substr(0,data[index].discount.length-1));
        
            setOrder(parseInt(event.target.value));
            data[index].order = parseInt(event.target.value);
            setCart(data);
            setSubtotal(price*data[index].order);
            setDiscountPrice(((price*disc)/100)*data[index].order);
            
            
        }else if (parseInt(event.target.value)<=0){
            removeItemOnDetailCart(index)
        }
        
    }
    const handlerPlusButton = (event, index) => {
        const data = cart;
        let price = parseInt(data[index].price.substr(2));
        let disc =  parseInt(data[index].discount.substr(0,data[index].discount.length-1));
        
        setSubtotal(subtotal+price);
        setDiscountPrice(discountPrice+ ((price*disc)/100));
        
        setOrder(order+1);
        data[index].order = data[index].order+1;
        setCart(data);
        
        event.preventDefault();
    }
    const handlerMinusButton = (event, index) => {
        if (order-1>0){
            const data = cart;
            let price = parseInt(data[index].price.substr(2));
            let disc =  parseInt(data[index].discount.substr(0,data[index].discount.length-1));

            setOrder(order-1);
            data[index].order = data[index].order-1;
            
            setSubtotal(subtotal - price);
            setDiscountPrice(discountPrice - ((price*disc)/100));
            
            setCart(data);
            
        }else{
            removeItemOnDetailCart(index);
            event.preventDefault();
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getAllInfoPrice = () =>{
        // eslint-disable-next-line array-callback-return
        let subTotalTemp = 0;
        let discountPriceTemp= 0

        // eslint-disable-next-line array-callback-return
        cart?.map((item)=>{

            let price = parseInt(item.price.substr(2));
            let disc =  parseInt(item.discount.substr(0,item.discount.length-1));

            subTotalTemp+=price*item.order;
            discountPriceTemp+=((price*disc)/100)*item.order;
        })
        setSubtotal(subTotalTemp);
        setDiscountPrice(discountPriceTemp);
                                    
    }
    const handlerCheckout = (event) =>{
        const canOrder = event.target.getAttribute("class");
        if (canOrder==='text-btn-checkout-noactive'){
            alert("You Must Add To Chart An Item!")
        }else{
            navigate('/checkout')
        }
    }
    useEffect(()=>{
        setTotal(subtotal - discountPrice);
    }, [order, cart, subtotal, discountPrice, total]);
    useEffect(()=>{
        window.scrollTo(0, 0);
        getAllInfoPrice();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //console.log('ini render', subtotal, discountPrice, total);
    

    return (
        <Fragment>
            <div className="detail-cart-container">
                <div className="banner-cart-container">
                    Cart
                </div>
                <div className="cart-content-container">
                    <div className="cart-order-detail">
                        <div className="text-cart-order">
                            <p className="title-cart-detail product-detailcart">Product</p>
                            <p className="title-cart-detail qty-detailcart">Qty</p>
                            <p className="title-cart-detail price-detailcart">Price</p>
                        </div>
                        <div className="product-cart-order">
                            <div className="list-cart-order">
                                {
                                    cart?.map((item, index)=>{
                                        //setSubtotal(subtotal+parseInt(item.price.substr(2)));
                                        //setDiscountPrice(discountPrice+parseInt(item.discount));
                                        //setTotal(subtotal-discountPrice);
                                        if (parseInt(item.discount)!==0) {
                                            console.log(item)
                                            return (
                                                <div className="item-cart-detail">
                                                    <div className="item-cart-info">
                                                        <img className="item-img-cart" src={item.img} alt={`${item.name}.img`} />
                                                        <div className="item-title-cart">
                                                            <div>{item.name}</div> 
                                                            <div className="item-remove-cart" onClick={() => removeItemOnDetailCart(index)}>Remove</div>
                                                        </div>
                                                    </div>
                                                    <div className="item-cart-info">
                                                        <div className="btn-action-cartdetail">
                                                            <button className="item-minus-btn" onClick={(event) => handlerMinusButton(event, index) }>-</button>
                                                            <input className="item-input" type="text" value={item.order} onKeyPress={(event) => handlerInputQtyChange(event)} onChange={(event) => handlerInputQtyChangeOnChange(event, index)}/>
                                                            <button className="item-plus-btn" onClick={(event) => handlerPlusButton(event, index)} >+</button>
                                                        </div>   
                                                    </div>
                                                    <div className="item-cart-info">
                                                        <div className="price-container-cartdetail">
                                                            <div className="price-disc-detailitem">Rp {parseInt(item.price.substr(2))*item.order}</div>
                                                            <div className="price-final-detailitem">Rp {item.finalPrice*item.order}</div>
                                                        </div>                                               
                                                    </div>
                                                </div>
                                            );
                                        }else{
                                            return (
                                                <div className="item-cart-detail">
                                                    <div className="item-cart-info">
                                                        <img className="item-img-cart" src={item.img} alt={`${item.name}.img`} />
                                                        <div className="item-title-cart">
                                                            <div>{item.name}</div> 
                                                            <div className="item-remove-cart" onClick={() => removeItemOnDetailCart(index)}>Remove</div>
                                                        </div>
                                                    </div>
                                                    <div className="item-cart-info">
                                                        <div className="btn-action-cartdetail">
                                                            <button className="item-minus-btn" onClick={(event) => handlerMinusButton(event, index) }>-</button>
                                                            <input className="item-input" type="text" value={item.order} onKeyPress={(event) => handlerInputQtyChange(event)} onChange={(event) => handlerInputQtyChangeOnChange(event, index)}/>
                                                            <button className="item-plus-btn" onClick={(event) => handlerPlusButton(event, index)} >+</button>
                                                        </div>   
                                                    </div>
                                                    <div className="item-cart-info">
                                                        <div className="price-container-cartdetail">
                                                            <div className="price-final-detailitem">Rp {item.finalPrice*item.order}</div>
                                                        </div>                                               
                                                    </div>
                                                </div>
                                            );
                                        }

                                    })
                                }       
                            </div>
                        </div>
                    </div>
                    <div className="summary-order">
                        <div className="title-summary">Summary</div>
                        <div className="bottom-line"></div>
                        <div className="price-cartdetail">
                                <div className="price-cartdetail-info">
                                    <div className="price-title-detailinfo">Subtotal</div>
                                    <div className="price-body-detailinfo">Rp {subtotal}</div>
                                </div>
                                <div className="price-cartdetail-info discountprice">
                                    <div className="price-title-detailinfo">Discount</div>
                                    <div className="price-body-detailinfo discprice">- Rp {discountPrice}</div>
                                </div>
                                <div className="price-cartdetail-info totalorder-container">
                                    <div className="price-title-detailinfo totalorder-text">Total Order</div>
                                    <div className="price-body-detailinfo totalorder-text">Rp {total}</div>
                                </div>
                                <div className="button-continue-checkout">
                                    <div className="text-btn-checkout p">
                                        <p className={total!==0 ? 'text-btn-checkout':'text-btn-checkout-noactive'} onClick={(event) => handlerCheckout(event)}>CONTINUE TO CHECKOUT</p>
                                    </div> 
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default CartDetail;