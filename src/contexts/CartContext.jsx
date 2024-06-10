import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setCartTime } from "../redux/cart/cartSlice";

const CartContext = createContext();

export function CartProvider({ children }) {
  const dispatch = useDispatch();

  const [cartCount, setCartCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("cartProducts");
    const storedCount = localStorage.getItem("cartCount");
    if (storedProducts) {
      setCartProducts(JSON.parse(storedProducts));
    }
    if (storedCount) {
      setCartCount(parseInt(storedCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    localStorage.setItem("cartCount", cartCount.toString());
  }, [cartProducts, cartCount]);

  const addToCart = (product) => {
    setCartCount(cartCount + 1);

    const now = new Date();
    localStorage.setItem("cartTime", JSON.stringify(now));
    dispatch(setCartTime(now));

    const existingProduct = cartProducts.find((p) => p.id === product.id);

    if (existingProduct) {
      const updatedCartProducts = cartProducts.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      });
      setCartProducts(updatedCartProducts);
    } else {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    }
  };

  const isOrderLimitExceeded = (productId) => {
    const product = cartProducts.find((p) => p.id === productId);
    return (
      product && product.orderLimit && product.quantity >= product.orderLimit
    );
  };

  const incrementById = (id) => {
    const now = new Date();
    localStorage.setItem("cartTime", JSON.stringify(now));
    dispatch(setCartTime(now));

    const updatedCartProducts = cartProducts.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    setCartProducts(updatedCartProducts);
    setCartCount(cartCount + 1);
  };

  const decrementById = (id) => {
    const now = new Date();
    localStorage.setItem("cartTime", JSON.stringify(now));
    dispatch(setCartTime(now));

    const updatedCartProducts = cartProducts
      .map((product) => {
        if (product.id === id) {
          const updatedQuantity = product.quantity - 1;
          if (updatedQuantity <= 0) {
            return null;
          } else {
            return { ...product, quantity: updatedQuantity };
          }
        }
        return product;
      })
      .filter((product) => product !== null);

    setCartProducts(updatedCartProducts);

    if (updatedCartProducts.length === 0) {
      setCartCount(0);
      localStorage.removeItem("cartTime");
      dispatch(setCartTime(null));
    }
  };

  const removeFromCart = (id) => {
    const updatedCartProducts = cartProducts.filter(
      (product) => product.id !== id
    );
    const newCartCount = updatedCartProducts.reduce(
      (total, product) => total + product.quantity,
      0
    );

    setCartCount(newCartCount);
    setCartProducts(updatedCartProducts);
  };

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, product) => {
      const { quantity, discounted_price, vat_onlinePrice } = product;
      return total + quantity * (discounted_price ?? vat_onlinePrice);
    }, 0);
  };

  const emptyCart = () => {
    setCartCount(0);
    setCartProducts([]);
    localStorage.removeItem("cartTime");
    dispatch(setCartTime(null));
    localStorage.removeItem("cartProducts");
    localStorage.removeItem("cartCount");
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartProducts,
        addToCart,
        incrementById,
        isOrderLimitExceeded,
        decrementById,
        removeFromCart,
        calculateTotalPrice,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}
