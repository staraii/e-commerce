
import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
	return (
		<div className={styles.card} >
			<img src={product.image} alt={product.title} className={styles.image}/>
			<div className={styles.info}>
				<h2 className={styles.title}>{product.title}</h2>
				<p className={styles.price}>${product.price} USD</p>
				<p className={styles.description}>{product.description}</p>
			</div>
		</div>
	)
}

export default ProductCard;



