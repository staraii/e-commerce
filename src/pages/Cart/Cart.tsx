// src/pages/Cart/Cart.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  removeItem,
  incrementItem,
  decrementItem,
  clearCart,
} from "../../slices/cartSlice";
import styles from "./cart.module.css";
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrement = (id: string) => {
    dispatch(incrementItem(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(decrementItem(id));
  };

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <>
      <div className={styles.bg_Welcome}>
        <h1 className={styles.H_One}>Welcome to Cart!</h1>
        <p className={styles.cartQuantity}>{cartItems.length} pcs</p>
      </div>
      <section className={styles.section}>
        {cartItems.map((item: CartItem) => (
          <div className={styles.item} key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Size: {item.size}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleIncrement(item.id)}>+</button>
            <button onClick={() => handleDecrement(item.id)}>-</button>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))}
      </section>
      <section className={styles.purchaseSection}>
        <p className={styles.paragraph}>
          Click the button below to proceed to checkout.
        </p>
        <button className={styles.CheckoutBtn}>Checkout</button>
        <button onClick={() => dispatch(clearCart())}>Clear cart</button>
      </section>
    </>
  );
};

export default Cart;
