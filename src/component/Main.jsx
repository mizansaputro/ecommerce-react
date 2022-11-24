import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartDetail from "./CartDetail/CartDetail";
import Checkout from "./Checkout/Checkout";
import Contact from "./Contact/Contact";
import DetailItem from "./DetailItem/Detailitem";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import Shop from "./Shop/Shop";
//import Shop from "./Shop/Shop";

const Main = () => {
  const [items, setItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const [cart, setCart] = useState([]);
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [order, setOrder] = useState(0);
  const [sortBy, setSortBy] = useState("Best Sellers");

  const itemsDatabase = "http://localhost:3004/items";
  const offersDatabase = "http://localhost:3004/offers";

  const getItemsDataFromAPi = () => {
    axios.get(itemsDatabase).then((res) => setItems(res.data));
  };
  const getOffersDataFromAPi = () => {
    axios.get(offersDatabase).then((res) => setOffers(res.data));
  };
  const getUniqueCategoryFromItems = useCallback(() => {
    let categoryData = [];

    // eslint-disable-next-line array-callback-return
    items?.map((item) => {
      if (!categoryData.includes(item.category)) {
        categoryData.push(item.category);
      }
    });
    setUniqueCategory(categoryData);
  }, [items]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    items.length === 0 && getItemsDataFromAPi();
    offers.length === 0 && getOffersDataFromAPi();
  }, [items.length, offers.length]);

  useEffect(() => {
    getUniqueCategoryFromItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, order]);
  console.log("inimain", order);

  return (
    <Router>
      <Fragment>
        {
          <Navbar
            uniqueCategory={uniqueCategory}
            cart={cart}
            setCart={setCart}
            order={order}
            setOrder={setOrder}
          />
        }
        <Routes>
          <Route path="/" element={<Home items={items} />} />
          <Route path="/shop/:category" element={<Shop items={items} sortBy={sortBy} setSortBy={setSortBy} />} />
          <Route path="/shop" element={<Shop items={items} sortBy={sortBy} setSortBy={setSortBy} />} />
          <Route
            path="/detail-item/:id"
            element={
              <DetailItem
                items={items}
                cart={cart}
                setCart={setCart}
                itemsDatabase={itemsDatabase}
                offers={offers}
                uniqueCategory={uniqueCategory}
                order={order}
                setOrder={setOrder}
              />
            }
          />
          <Route
            path="/cart-detail"
            element={
              <CartDetail
                cart={cart}
                setCart={setCart}
                order={order}
                setOrder={setOrder}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Contact />
      </Fragment>
    </Router>
  );
};
export default Main;
