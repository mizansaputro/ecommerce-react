import React, {Fragment, useState, useEffect} from "react";
import TopCollection from "./TopCollection/TopCollection";
import Promote from "./Promote/Promote";
import NewArrival from "./NewArrival/NewArrival";
import Category from "./Category/Category";
const _ = require("lodash");

const Content = ({items, getAnItem}) => {
    const [itemsSortedDescendingByDate, setItemsSortedDescendingByDate] = useState([]);
    const [itemsSortedDescendingByBuy, setItemsSortedDescendingByBuy] = useState([]);    
    
    const handleSortItemsDescendingByBuy = () => {
        return _.orderBy(items, ['buy'], ['desc']);
    }
    const handleSortItemsDescendingByDates = (items) => {
        return items.sort((a, b) => {
            a = a.date_post.split('/');
            b = b.date_post.split('/');
            return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
        })
    }
    
    useEffect(() => {
        setItemsSortedDescendingByDate(handleSortItemsDescendingByDates(items).slice(0).reverse().slice(0,8));
        setItemsSortedDescendingByBuy(handleSortItemsDescendingByBuy().slice(0,8));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    return (
        <Fragment>
            <div className="topCollection-container">
                <div className="topCollection-text">
                    <p className="topCollection-title">Top Collection</p>
                    <p className="topCollection-body">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                </div>
            </div>
            <TopCollection itemsSortedDescendingByBuy={itemsSortedDescendingByBuy} getAnItem={getAnItem}/>
            <Promote/>
            <NewArrival itemsSortedDescendingByDate={itemsSortedDescendingByDate} getAnItem={getAnItem}/>
            <Category items={items} />
        </Fragment>
    );
}


export default Content;
