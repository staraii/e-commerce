import styles from "./new-product.module.css";
import EditProduct from "../../components/EditProduct/EditProduct";
import { useAppSelector } from "hooks/reduxHooks";
import { Navigate } from "react-router-dom";

function NewProduct() {
	const isAdmin = useAppSelector((state) => state.user.isAdmin);
	if (!isAdmin) {
		return <Navigate to="/admin/login" />;
	}
	return (
		<section>
			<h4 className={styles.h4}>Add new product</h4>
			<EditProduct />
		</section>
	);
}

export default NewProduct;
