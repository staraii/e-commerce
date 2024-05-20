import React from "react";
import styles from "./fotter.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-links"]}>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
        <a href="/shipping">Shipping Information</a>
        <a href="/returns">Return Policy</a>
        <a href="/faq">FAQs</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
      <div className={styles["contact-info"]}>
        <p>123 Main Street, City, Country</p>
        <p>Phone: 123-456-7890</p>
        <p>Email: info@example.com</p>
      </div>
      <div className={styles["social-media"]}>
        <a href="https://www.facebook.com/example">Facebook</a>
        <a href="https://twitter.com/example">Twitter</a>
        <a href="https://www.instagram.com/example">Instagram</a>
      </div>
      <div className={styles.newsletter}>
        <h3>Subscribe to our Newsletter</h3>
        <form action="/subscribe" method="post">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2024 E-commerce Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
