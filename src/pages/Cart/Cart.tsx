import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  removeItem,
  incrementItem,
  decrementItem,
} from "../../slices/cartSlice";
import styles from "./cart.module.css";
import { Link } from "react-router-dom";

interface CartItem {
  productName: string;
  productId: ProductId;
  price: number;
  quantity: number;
}

type ProductId = string;

const Cart: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrement = (productId: ProductId) => {
    dispatch(incrementItem(productId));
  };

  const handleDecrement = (productId: ProductId) => {
    dispatch(decrementItem(productId));
  };

  const handleRemove = (productId: ProductId) => {
    dispatch(removeItem(productId));
  };

  return (
    <>
      <div className={styles.bg_Welcome}>
        <h1 className={styles.H_One}>Welcome to Cart!</h1>
        <p>
          <p className={styles.cartQuantity}>{cartItems.length} pcs</p>
        </p>
      </div>{" "}
      <section className={styles.section}>
        {cartItems.map((item: CartItem) => (
          <div className={styles.item} key={item.productId}>
            <h3>{item.productName}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleIncrement(item.productId)}>+</button>
            <button onClick={() => handleDecrement(item.productId)}>-</button>
            <button onClick={() => handleRemove(item.productId)}>Remove</button>
          </div>
        ))}
      </section>
      <section className={styles.purchaseSection}>
        <p className={styles.paragraph}>
          Click the button below to proceed to checkout.
        </p>
        <button className={styles.CheckoutBtn}>Checkout</button>
      </section>
      <section className={styles.backSection}>
        <Link to="/">Back to Homepage</Link>
      </section>
    </>
  );
};

export default Cart;
