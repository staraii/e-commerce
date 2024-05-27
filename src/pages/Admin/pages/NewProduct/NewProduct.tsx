import styles from "./new-product.module.css";
import EditProduct from "../../components/Product/Product";

function NewProduct() {
	return (
		<section>
			<h4 className={styles.h4}>Add new product</h4>
			<EditProduct />
		</section>
	);
}

export default NewProduct