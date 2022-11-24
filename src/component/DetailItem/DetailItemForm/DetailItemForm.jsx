import React, {Fragment, useEffect, useState} from "react";

const DetailItemForm = ({item, itemDetailBeforeAddToCart, setItemDetailBeforeAddToCart, finalPrice, 
    offers, cart, setCart, order, setOrder}) => {
    const [quantity, setQuantity] = useState(1);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    
    const handlerInputQtyChange = (event) =>{
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
        
    }
    const handlerInputQtyChangeOnChange = (event) => {
        const re = /^[0-9\b]+$/;
        if (re.test(event.target.value) || parseInt(event.target.value)>0) {
            setQuantity(parseInt(event.target.value));
            
        }else{
            setQuantity(1);
        }
        if (event.target.value.length===0){
            setQuantity(1);
        }
    }
    const handlerPlusButton = (event) => {
        setQuantity(quantity+1);
        event.preventDefault();
    }
    const handlerMinusButton = (event) => {
        if (quantity-1>0){
            setQuantity(quantity-1);
        }
        event.preventDefault();
    }
    const handlerAddToCartButton =  (event) =>{
        event.preventDefault();

        let getIdColorLabel = document.getElementById("color");
        let getColorSelect = getIdColorLabel.value;
        let getIdSizeLabel = document.getElementById("size");
        let getSizeSelect = getIdSizeLabel.value;
        
        setItemDetailBeforeAddToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            discount: item.discount,
            finalPrice: finalPrice,
            color: getColorSelect,
            size: getSizeSelect,
            img: item.img1,
            order: quantity
        });
        
        
        setOrder(order+quantity);
        setIsAlertVisible(true);
        setQuantity(1);

        setTimeout(() => {
            setIsAlertVisible(false);
        }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const pushItemToCart = () =>{
        let cartTemp = cart;
        let isInCart = false;
        // eslint-disable-next-line array-callback-return
        cartTemp?.map((item) => {
            if (item.id===itemDetailBeforeAddToCart.id && item.color===itemDetailBeforeAddToCart.color && item.size===itemDetailBeforeAddToCart.size){
                item.order = item.order+itemDetailBeforeAddToCart.order;
                isInCart = true;
            }
        })
        if (!isInCart && itemDetailBeforeAddToCart.id!==null){
            cartTemp.push(itemDetailBeforeAddToCart);
        }
        setCart(cartTemp);
    }

    
    useEffect(()=>{
        pushItemToCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemDetailBeforeAddToCart, cart])
    console.log('cart',cart);

    
    return (
        <Fragment>
            <div className="detail-item-form">
                <form action="" className="form-container">
                    <div className="form-input">
                        <label htmlFor="color"><p className="text-input">Color</p></label>
                            <select className="dropdown-menu" name="color" id="color">
                                {
                                    item.color.map((color) => {
                                        return (
                                            <option value={color} key={color}>{color}</option>
                                        );
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-input">
                        <label htmlFor="size"><p className="text-input">Size</p></label>
                            <select className="dropdown-menu" name="size" id="size">
                                {
                                    item.size.map((size) => {
                                        return (
                                            <option value={size} key={size}>{size}</option>
                                        );
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-input">
                        <label htmlFor="quantity"><p className="quantity">Quantity</p></label>
                        <div className="input-values-container">
                            <input type="text" value={quantity} onKeyPress={(event) => handlerInputQtyChange(event)} className="input-values" onChange={handlerInputQtyChangeOnChange}/>
                        </div>
                            <div className="btn-value-container">
                                <div className="plus-container">
                                    <button className="plus-btn" onClick={(event) => handlerPlusButton(event)}><i className="arrow up"></i></button>
                                </div>
                                <div className="min-container">
                                    <button className="min-btn" onClick={(event) => handlerMinusButton(event)}><i className="arrow down"></i></button>
                                </div>
                            </div>
                        <div>
                            <button className="add-to-cart-btn"  onClick={(event) => handlerAddToCartButton(event)}>ADD TO CART</button>
                            {isAlertVisible && <div className='alert-container'>
                                                    <div className='alert-inner'>Yeay! Product succesfully added to cart!</div>
                                                </div>
                            }

                        </div>
                    </div>
                    <div className="form-input">

                        {
                            offers.map(offer => {
                                for (let i=0;i<offer.items.length;i++){
                                    if (offer.category==="percentage"){
                                        if (offer.items[i]===item.name){
                                            return (
                                                <div className="bundle-container">
                                                    <div className="offer-header">
                                                        <p className="text-input">Bundle Deals</p>
                                                        <div className="offer-text">
                                                            <p className="text-input title-offer">{offer.title} {offer.discount}%.</p>
                                                        <div className="offer-body">
                                                            <p className="text-input title-body">{offer.description}</p>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                    /*else if (offer.category==="bundle"){
                                        const idx_item = isItemABundleDiscount(offer.items)
                                        if (idx_item!==-1){
                                            //findItemInItemsDatabase(offer.items[idx_item][0], offer.items[idx_item][1]);


                                        }
                                    }*/
                                }
                                return null;
                            })
                        }


                    </div>
                </form>
            </div>
        </Fragment>
    );
}
export default DetailItemForm;