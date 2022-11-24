import React, {Fragment, useEffect, useState} from "react";
import Carousel from 'react-grid-carousel'
import { useNavigate } from "react-router-dom";

const Category = ({items}) => {
    const [activeCategoryBtn, setActiveCategoryBtn] = useState("Kameja");
    const [uniqueCategory, setUniqueCategory] = useState([]);
    const navigate = useNavigate();    

    const getUniqueCategory = (items) => {
        let allCategory = [];
        for (let i=0;i<items.length;i++){
            allCategory.push(items[i].category);
        }
        return [...new Set(allCategory)];
    }
    
    const handlerClickBtnCategory = (event) => {
        setActiveCategoryBtn(event.target.name);
    }
    const handlerClickItem = (id) => {
        navigate(`/detail-item/${id}`);
    }
    useEffect(()=> {
        setUniqueCategory(getUniqueCategory(items))
    }, [items])
    
    return (
        <Fragment>
            <div className="category-container">
                <div className="category-card-container">
                    <div className="category-card-1">
                        <p className="category-card-text">Men</p>
                    </div>
                    <div className="category-card-2">
                        <p className="category-card-text dif-2">Women</p> 
                    </div>
                    <div className="category-card-3">
                        <p className="category-card-text">Kids</p> 
                    </div>
                </div>
                <div className="slider-container">
                    <div className="slider-bg-img">
                        <div className="slider-bg-text">
                            <p className="slider-bg-title">Men</p>
                            <p className="slider-bg-body">Add our products to your weekly lineup</p>
                            <button className="btn-img">Discover More</button>
                        </div>
                    </div>
                    <div className="category-slider">
                        <div className="category-btn-container">
                            {
                                uniqueCategory.map((category,index) => {
                                    return (
                                        <button className="category-btn" name={category} key={index} 
                                            onClick={handlerClickBtnCategory} style={{
                                                borderColor: category===activeCategoryBtn? 'black':'#CCCCCC',
                                                color: category===activeCategoryBtn? 'black':'#CCCCCC'
                                                }}>
                                            {category}
                                        </button>
                                    );
                                })
                            }
                        </div>
                        <div className="items-category-slider">
                        <Carousel className="items-category-slider-carousel" cols={4} rows={1} gap={10} loop>
                                    {items.map((item, index) => {
                                            if (item.category===activeCategoryBtn){
                                                return (
                                                    <Carousel.Item key={index}>
                                                        <button className="item-category-btn" onClick={() => handlerClickItem(item.id)}>
                                                            <div className="container-cat">
                                                                <img className="item-category-img" src={item.img1} alt={item.id} />
                                                                <div className="middle-cat">
                                                                    <div className="text-cat">
                                                                        See Detail
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="caption-item-category">
                                                                <p className="name-item">{item.name}</p>
                                                                <p className="price-item">{item.price}</p>
                                                            </div>
                                                        </button>
                                                    </Carousel.Item>
                                            
                                                );
                                            }
                                            return null;
                                    })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Category;