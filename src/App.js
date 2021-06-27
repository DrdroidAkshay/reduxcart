import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { react } from "@babel/types";
import React from "react";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./components/store/cart-actions";

let isInitial = true;

function App() {
  const cartShown = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchCartData()), [fetchCartData]);
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartShown && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
