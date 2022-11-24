import React, {Fragment, useEffect, useState} from "react";
import "./DetailItem.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import axios from "axios";
import { useParams } from "react-router-dom";
import Suggested from "./Suggested/Suggested";
import DetailItemForm from "./DetailItemForm/DetailItemForm";

const DetailItem = ({items, cart, setCart, itemsDatabase, offers, order, setOrder}) => {
    const [item, setItem] = useState({
        id: null,
        name: "",
        description: "",
        price: "",
        discount: "",
        color: [],
        size: [],
        brand: "",
        category: "",
        date_post: "",
        buy: null,
        img1: null,
        img2: null,
        img3: null,
        img4: null 
    });
    const [finalPrice, setFinalPrice] = useState(0);
    const [itemDetailBeforeAddToCart, setItemDetailBeforeAddToCart] = useState({
        id: null,
        name: "",
        price: null,
        discount: null,
        finalPrice: null,
        color: "",
        size: "",
        img: null,
        order: null
    }); 
    const id = useParams().id;

    
    const getAnItemFromDatabase = () => {
        axios.get(`${itemsDatabase}/${id}`)
            .then(res => setItem({
                id: res.data.id,
                name: res.data.name,
                description: res.data.description,
                price: res.data.price,
                discount: res.data.discount,
                color: res.data.color,
                size: res.data.size,
                brand: res.data.brand,
                category: res.data.category,
                date_post: res.data.date_post,
                buy: res.data.buy,
                img1: res.data.img1,
                img2: res.data.img2,
                img3: res.data.img3,
                img4: res.data.img4
            }));
    }
    const getFinalItemPrice = (priceStr, discStr) => {
        let convertPriceToInt = parseInt(priceStr.substr(2));
        let convertDiscToInt = parseInt(discStr.substr(0, discStr.length-1));
        let finalPrice = convertPriceToInt - ((convertPriceToInt*convertDiscToInt)/100);

        return finalPrice; 
    }
     
    useEffect(()=> {
        getAnItemFromDatabase();
        setFinalPrice(getFinalItemPrice(item.price, item.discount));
        window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item.discount, item.price, id]);
    

    return (
        <Fragment>
             <div className="detail-item-container">
                <div className="detail-item-desc">
                    <div className="image-item-container">
                        <Carousel 
                            infiniteLoop={true}
                            showArrows={true}
                            showStatus={false}
                            showIndicators={true}
                            dynamicHeight={true}
                            thumbWidth={100}
                        >
                            <div>
                                <img src={item.img1} alt="img-1" />
                            </div>
                            <div>
                                <img src={item.img2} alt="img-2"/>
                            </div>
                            <div>
                                <img src={item.img3} alt="img-3"/>
                            </div>
                            <div>
                                <img src={item.img4} alt="img-4"/>
                            </div>
                        </Carousel>
                    </div>
                    <div className="detail-item-info">
                        <div className="detail-item-body">
                            <p className="detail-item-category">{item.category}</p>
                            <p className="detail-item-name">{item.name}</p>
                            {
                                finalPrice===parseInt(item.price.substring(2))? 
                                    <p className="detail-item-price" >Rp {finalPrice}</p>
                                    :   
                                    <div className="price-container">
                                        <p className="detail-item-price no-disc">Rp {parseInt(item.price.substring(2))}</p>
                                        <p className="detail-item-price disc">Rp {finalPrice}</p>
                                    </div>    
                                    
                            }
                            <p className="detail-item-description">{item.description}</p>
                        </div>
                        <DetailItemForm items={items} item={item} itemDetailBeforeAddToCart={itemDetailBeforeAddToCart} 
                            setItemDetailBeforeAddToCart={setItemDetailBeforeAddToCart} finalPrice={finalPrice}
                            offers={offers} cart={cart} setCart={setCart} order={order} setOrder={setOrder}/>
                    </div>
                </div>
            </div> 
            <Suggested items={items} item={item}  />
        </Fragment>
    );
}

export default DetailItem;
