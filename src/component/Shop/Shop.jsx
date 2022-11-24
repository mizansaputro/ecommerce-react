import React, {Fragment, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import BannerCategory from "./BannerCategory/BannerCategory";
import Filter from "./Filter/Filter";
import "./Shop.css";

const Shop = ({items}) => {
    const id = useParams().category;
    const [paramsCategory, setParamsCategory] = useState("");

    
    useEffect(()=>{
        if (id!==undefined){
            setParamsCategory(id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);
    
    
    
    
    return (
        <Fragment>
            <div className="shop-page">
                <BannerCategory paramsCategory={paramsCategory}/>
                <div className="shop-container">
                      <Filter items={items} paramsCategory={paramsCategory} setParamsCategory={setParamsCategory}/>
                </div>
            </div>
        </Fragment>
    )
}

export default Shop;