import React from "react";
import products from "../../components/product/product";
import ProductCard from "../../components/productcard/ProductCard";
import styles from "./products.module.css";

const Products = () => {
	return (
		<section className={styles.section}>
			{products.map(product => (
				<ProductCard key={product.id} product={product} />
			))}
		</section>
	);
};

export default Products;