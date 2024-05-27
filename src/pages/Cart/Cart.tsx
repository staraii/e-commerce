// src/pages/Cart/Cart.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCheckout = () => {
    openModal();
  };

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

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <div className={styles.bg_Welcome}>
        <h1 className={styles.H_One}>Welcome to Cart!</h1>
        <p className={styles.cartQuantity}>
          <p className={styles.totalAmount}>
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
          <p className={styles.totalQuantity}>
            Total Quantity: {totalQuantity} items
          </p>
        </p>
      </div>
      <section className={styles.section}>
        {cartItems.map((item: CartItem) => (
          <div className={styles.item} key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Size: {item.size}</p>
            <p>Quantity: {item.quantity}</p>
            <button
              className={styles.CartBtn}
              onClick={() => handleIncrement(item.id)}
            >
              +
            </button>
            <button
              className={styles.CartBtn}
              onClick={() => handleDecrement(item.id)}
            >
              -
            </button>
            <button
              className={styles.CartBtn}
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </section>
      <section className={styles.purchaseSection}>
        <p className={styles.paragraph}>
          Click the button below to proceed to checkout.
        </p>
        <button className={styles.CheckoutBtn} onClick={() => handleCheckout()}>
          Checkout
        </button>
        <button
          className={styles.CartClearBtn}
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </button>

        {modalIsOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2>Your order has been received</h2>
              <p>We look forward to serving you again soon!</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
