import React, {Fragment, useEffect} from "react";
import "./Pagination.css";

const Pagination = (props) => {
    let pages = [];
    
    for (let i=1; i<= Math.ceil(props.totalPosts/props.postsPerPages);i++){
        pages.push(i);
    }
    useEffect(()=> {
        window.scrollTo(0, 350)

    },[props.currentPage])
    return (
        <Fragment>
            <div className="pagination">
                {
                    pages.map((page, index) => {
                        return (
                            <button key={index} onClick={() => props.setCurrentPage(page)} className=
                            {page===props.currentPage? "active" : ""}>
                                {page}
                            </button>
                        )
                    })
                }
            </div>
        </Fragment>
    );
}
export default Pagination;