import React, {} from "react";
import { useNavigate} from "react-router-dom";

const Suggested = ({items, item}) => {
    const navigate = useNavigate();

    let i = 0;
    const handlerItemClick = id => {
        navigate(`/detail-item/${id}`);
        
    }
    
    return (
            <div className="sug-container">
                <p className="text-sug">Suggested For You</p>
                <div className="sug-items-grid">
                    {items.map((anItem) => {
                        if (anItem.category===item.category && anItem.name!==item.name ){
                            if (i<5){
                            
                                let price = parseInt(item.price.substr(2));
                                let discount = parseInt(item.discount.substr(0,item.discount.length-1));
                                let finalPrice = price - (price*discount/100);
                                if (discount!==0){
                                    return (
                                        <button className="sug-grid-item disc-img" key={anItem.id} onClick={() => handlerItemClick(anItem.id)}>
                                            <div className="sale-container">
                                                SALE
                                            </div>
                                            <img className="img-grid" src={anItem.img1} alt={`${anItem.name}.img`} />
                                            <div className="middle-grid">
                                                <div className="text-grid">See Detail</div>
                                            </div>
                                            <div className="item-info">
                                                <p className="text-name">{anItem.name}</p>
                                                <p className="no-disc-sug">Rp {price}</p>
                                                <p className="text-price">Rp {finalPrice}</p>
                                            </div>
                                        </button>
                                    );
                                }else{
                                    return (
                                        <button className="sug-grid-item" key={anItem.id} onClick={() => handlerItemClick(anItem.id)}>
                                            <img className="img-grid" src={anItem.img1} alt={`${anItem.name}.img`} />
                                            <div className="middle-grid">
                                                <div className="text-grid">See Detail</div>
                                            </div>
                                            <div className="item-info">
                                                <p className="text-name">{anItem.name}</p>
                                                <p className="text-price">Rp {finalPrice}</p>
                                            </div>
                                        </button>
    
                                    );
                                }
                            }
                        }
                            
                        
                        return null;
                    })}
                </div>
            </div>
    );
}
export default Suggested;