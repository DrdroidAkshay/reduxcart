import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { react } from "@babel/types";
import { uiActions } from "./components/store/ui-slice";
import React from "react";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const cartShown = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending..",
          message: "Sending Cart Data.",
        })
      );
      const response = await fetch(
        "https://redux-cart-5f0db-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending car data failed");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent Cart Data Successfully.",
        })
      );
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch((error) =>
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending Cart Data failed.",
        })
      )
    );
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
