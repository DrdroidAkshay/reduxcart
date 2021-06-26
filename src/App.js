import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
  const cartShown = useSelector((state) => state.ui.cartIsVisible);
  return (
    <Layout>
      {cartShown && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
