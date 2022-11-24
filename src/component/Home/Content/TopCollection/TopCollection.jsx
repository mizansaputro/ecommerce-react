import React, {Fragment} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from 'react-grid-carousel'
import { useNavigate } from "react-router-dom";

const TopCollection = ({itemsSortedDescendingByBuy}) => {
    let navigate = useNavigate();
    
    
    const handlerClickItem = (id) => {
        navigate(`/detail-item/${id}` );
    }
    return(
        <Fragment>
            <div className="items-topCollection-slider" >
                <Carousel containerClassName="items-topCollection-slider-carousel" cols={4} rows={1} gap={10} loop>
                    {itemsSortedDescendingByBuy?.map((item) => {
                        return (
                            <Carousel.Item key={item.id} >
                                <button  className="item-container-btn"  onClick={() => handlerClickItem(item.id)}>
                                    <div className="img-container">
                                        <img src={item.img1} alt={item.id} className="image-comp" />
                                        <div className="middle">
                                            <div className="text">
                                                See Detail 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="caption-item">
                                        <p className="name-item">{item.name}</p>
                                        <p className="price-item">{item.price}</p>
                                    </div>
                                </button>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </div>
        </Fragment>
    );
}
export default TopCollection;