import React, {Fragment, useEffect, useState} from "react";

const BannerCategory = ({paramsCategory}) => {

    const [isCategory, setIsCategory] = useState([
        {
            isCategory: false,
            category: ''
        }
    ])
    useEffect(()=>{
        if (paramsCategory.length!==0){
            setIsCategory([{
                isCategory: true,
                category: paramsCategory
            }]);
        }
    }, [paramsCategory])
   
    return (
        <Fragment>
            <div className="banner-category">
                {
                    isCategory.map(category => {
                        if (!category.isCategory){
                            return <img className="img-banner-category" src="https://img.freepik.com/free-psd/sale-banner-template_24972-824.jpg?w=2000" alt="banner-category" />
                        }else{
                            return (
                                <div className="banner-category-text">{category.category}</div>
                            );
                        }
                    })
                }
            </div>
        </Fragment>
    );
}
export default BannerCategory;