import React, {Fragment, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
const _ = require("lodash"); 

const Filter = ({items, paramsCategory, setParamsCategory}) => {
    const [itemsFilter, setItemsFilter] = useState([]);
    const [uniqueCategory, setUniqueCategory] = useState([]);
    const [uniqueBrands, setUniqueBrands] = useState([]);
    const [filter,setFilter] = useState({
        category: "",
        brands: [],
        colors: []
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPages, setPostsPerPage] = useState(6);
    //const [sortBy, setSortBy] = useState("Best Sellers");

    const navigate = useNavigate();

    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setCategory= (category) => {
        setFilter({
            category: category,
            brands: filter.brands,
            colors: filter.colors
        });
        setParamsCategory(category);
        navigate(`/shop/${paramsCategory}`)
        
    }

    
    const getUniqueCategory = (items) => {
        let allCategory = ["All"];
        for (let i=0;i<items.length;i++){
            allCategory.push(items[i].category);
        }
        return [...new Set(allCategory)];
    }
    const getUniqueBrands = (items) => {
        let allBrand = [];
        for (let i=0;i<items.length;i++){
            allBrand.push(items[i].brand);
        }
        return [...new Set(allBrand)];
    }
    const handlerBrandInputCheckbox = (event) => {
        const brand = event.target.name;
        let filterDataBrands = [...filter.brands];
        let idx_brand = filterDataBrands.indexOf(brand);
        
        if (idx_brand===-1){
            filterDataBrands.push(brand);
        }else{
            filterDataBrands.splice(idx_brand,1);
        }
        setFilter({
            category: filter.category,
            brands: filterDataBrands,
            colors: filter.colors
        })
        
    }
    const handlerCategoryFilterClick = (event) => {
        const categoryName = event.target.getAttribute('name');
        setFilter({
            category: categoryName,
            brands: filter.brands,
            colors: filter.colors
        })
        setParamsCategory(categoryName);
        
    }
    const getIsBrandsIncludeInFilter = (item) => {
        if (filter.brands.length===0){
            return true;
        }else{
            for (let i=0; i<filter.brands.length;i++){
                if (filter.brands[i]===item.brand){
                    return true;
                }
            }
        }
        return false;
    }
    const getIsColorsIncludeInFilter = (item) => {
        if (filter.colors.length===0){
            return true;
        }else{
            if (filter.colors.length!==0){
                // eslint-disable-next-line array-callback-return
                item.color.map(color => {
                    for (let i=0;i<filter.colors[i];i++){
                        if (color===filter.colors[i]){
                            return true;
                        }
                    }
                })
            }
        }
        return false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getItemsWithFilter = () => {
        //console.log('jalan');
        let newData = [];
        // eslint-disable-next-line array-callback-return
        items.map((item) => {
            if (filter.category.length!==0 && filter.category!=="All"){
                if (item.category===filter.category && getIsBrandsIncludeInFilter(item) && getIsColorsIncludeInFilter(item)){
                    newData.push(item)
                }
            }else{
                if (getIsBrandsIncludeInFilter(item) && getIsColorsIncludeInFilter(item)){
                    newData.push(item)
                }
            }
            
        })
        setItemsFilter(newData);
        if (filter.category.length===0 && filter.brands.length===0 && filter.colors.length===0){
            setItemsFilter(items);
        }
            
    }
    const handlerLimitPage = (event) =>{
        setPostsPerPage(event.target.value);
        
        setCurrentPage(1);
    }
    const handlerItemClick = (id) =>{
        navigate(`/detail-item/${id}`)
    }
    /*const sortedItemsBy = (condition) =>{
        let dataItems = itemsFilter;
        let dataFilter;
        if (condition==="Best Sellers"){
            dataFilter = _.sortBy(dataItems, ['buy'], ['desc']);
        }else {
            if(condition==="Lowest Price"){
                _.orderBy(dataItems, (o) => {
                    return parseInt(o.price.substr(2), 10);
                }, ['asc']);
            }else if(condition==="Highest Price"){
                dataFilter = _.orderBy(dataItems, ['price'], ['desc']);
            }
        }
        console.log(dataFilter);
        setItemsFilter(dataItems);
    }
    const handlerSortBy = (event) => {
        setSortBy(event.target.value);
        sortedItemsBy(sortBy);

    }*/
    useEffect(() => {
        if (paramsCategory.length>1){
            setCategory(paramsCategory);
        }
        setUniqueCategory(getUniqueCategory(items));
        setUniqueBrands(getUniqueBrands(items));
        getItemsWithFilter();
        setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, filter.category, filter.brands, paramsCategory]);
    
    
    
    const lastPostIndex = currentPage*postsPerPages;
    const firstPostIndex = lastPostIndex-postsPerPages;
    let currentPost = itemsFilter.slice(firstPostIndex,lastPostIndex);
    
    
    
    return (
        <Fragment>
            <div className="categories-filter-container">
                <div className="title-filter">CATEGORIES</div>
                <div className="body-filter-container">
                {
                    uniqueCategory.map((category) => {
                        return (
                            <div className={category===filter.category? "body-filter active-category":"body-filter"} name={category} key={category} onClick={(event) => handlerCategoryFilterClick(event)}>
                                {category}
                            </div>
                        );
                    })    
                }
                </div>
                <div className="title-filter">BRANDS</div>
                <div className="body-filter-container">
                {
                    uniqueBrands.map((brand) => {
                        return (
                            <div className="body-filter" key={brand}>
                                <input className="checkbox-filter" type="checkbox" id={brand} name={brand} value={brand} 
                                    key={brand} onClick={(event) => handlerBrandInputCheckbox(event)}/>
                                <label className="body-filter checkbox-text" htmlFor={brand}>{brand}</label>
                            </div>
                        );
                    })    
                }
                </div>      
            </div>
            <div className="items-page">
                <div className="filter-menu-container">
                    <div className="text-info-limit">Show {firstPostIndex+1} - {lastPostIndex} of {itemsFilter.length}</div>
                    <div className="drop-down-limitpage">
                    <label htmlFor="limitpage"></label>
                        <select  className="limitpage-container" name="limitpage" id="limitpage" onChange={event => handlerLimitPage(event)}>
                            <option value={6} selected>Show 6 Products</option>
                            <option value={12} >Show 12 Products</option>
                        </select>
                    </div>
                    <div className="drop-down-sortby">
                    <label htmlFor="sortby"></label>
                        <select  className="sortby-container" name="sortby" id="sortby">
                            <option value={"Best Sellers"} selected>Best Sellers</option>
                            <option value={"Lowest Price"} >Lowest Price</option>
                            <option value={"Highest Price"} >Highest Price</option>
                        </select>
                    </div>
                    
                </div> 
                <div className="items-container">
                    {
                        currentPost.map((item) => {
                            let price = parseInt(item.price.substr(2));
                            let discount = parseInt(item.discount.substr(0,item.discount.length-1));
                            let finalPrice = price - ((price*discount)/100);
                            
                            if (discount!==0){
                                return (
                                    <div className="item-grid"  onClick={() => handlerItemClick(item.id)} >
                                        <div className="sale-item">SALE</div>
                                        <img className="img-grid-item" src={item.img1} alt={`${item.name}.img`}/>
                                        <div className="middle-text-item">
                                            <div className="text-grid">See Detail</div>
                                        </div>
                                        <div className="text-filter-title">{item.name}</div>
                                            <div className="price-container">
                                                <div className="price no-disc">Rp {price}</div>
                                                <div className="price disc">Rp {finalPrice}</div>
                                            </div>
                                    </div>
                                );
                            }
                                return (
                                    <div className="item-grid">
                                        <img className="img-grid-item" src={item.img1} alt={`${item.name}.img`}/>
                                        <div className="middle-text-item">
                                            <div className="text-grid">See Detail</div>
                                        </div>
                                        <div className="text-filter-title">{item.name}</div>
                                        <div className="price-container">
                                            <div className="price">Rp {finalPrice}</div>
                                        </div>
                                    </div>
                                )
                            
                        })
                    } 

                </div>
                <Pagination totalPosts={itemsFilter.length===0? items.length : itemsFilter.length} postsPerPages={postsPerPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
        </Fragment>
    );
}
export default Filter;