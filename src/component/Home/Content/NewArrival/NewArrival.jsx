import React, {Fragment} from "react";
import { useNavigate } from "react-router-dom";

const NewArrival = ({itemsSortedDescendingByDate}) => {
    const navigate = useNavigate() ;
    
    const handlerClickItem = (id) => {
        navigate(`/detail-item/${id}`);
    }
    
    return(
        <Fragment>
            <div className="newArrival-container">
                <div className="newArrival-text">
                    <p className="newArrival-title">New Arrival</p>
                    <p className="newArrival-body">Add our products to your weekly lineup</p>
                </div>
                <div className="newArrival-items">
                    {itemsSortedDescendingByDate?.map((item,index) => {
                            return (
                                <div className="newArrival-item" key={item.id}> 
                                    <button className="item-img-arv" onClick={() => handlerClickItem(item.id)}>
                                        <img className="img-arv" src={item.img1} alt=""/>
                                        <div className="middle-arv">
                                            <div className="text-arv">
                                                <p>See Detail</p> 
                                            </div>
                                        </div>
                                        <div className="item-text-arv">
                                            <p className="item-title-arv">{item.name}</p>
                                            <p className="item-price-arv">{item.price}</p>
                                    </div>
                                    </button> 
                                </div>
                            );
                        
                    })}
                </div>
            </div>
        </Fragment>
    );
}
export default NewArrival;