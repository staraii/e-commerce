import React from "react";
import styles from "./cart.module.css";

import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  return (
    <>
      <div className={styles.bg_Welcome}>
        <h1 className={styles.H_One}>Welcome to Cart!</h1>
      </div>{" "}
      <section className={styles.section}>
        <div className={styles.item}>
          {<h3>En Product</h3>}
          <button className={styles.deleteItem}>Remove</button>
        </div>
        <div className={styles.item}>
          {<h3>En Product</h3>}
          <button className={styles.deleteItem}>Remove</button>
        </div>
        <div className={styles.item}>
          {<h3>En Product</h3>}
          <button className={styles.deleteItem}>Remove</button>
        </div>
        <div className={styles.item}>
          {<h3>En Product</h3>}
          <button className={styles.deleteItem}>Remove</button>
        </div>
        <div className={styles.item}>
          {<h3>En Product</h3>}
          <button className={styles.deleteItem}>Remove</button>
        </div>
        <div className={styles.item}>
          {<h3>En Product</h3>}
          <button className={styles.deleteItem}>Remove</button>
        </div>
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
