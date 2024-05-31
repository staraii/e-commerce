import styles from "./admin-main.module.css"
import { useAppSelector } from "hooks/reduxHooks";
import { Navigate, NavLink } from "react-router-dom"



function AdminMain() {
	const isAdmin = useAppSelector((state) => state.user.isAdmin);
	if (!isAdmin) {
		return (<Navigate to="/admin/login" />)
	}
	return (
		<section>
			<h2 className={styles.h2}>
				Store admin section and content management system.
			</h2>
			<section className={styles.sec}>
				<article className={styles.sectionInfo}>
					<NavLink
						to="/admin/new-product"
						className={styles.sectionLinks}
					>
						<h4>New product</h4>
					</NavLink>
					<p>
						Use this section for adding new products to the store.
						Fill in all product data such as name, description,
						brand, category, gender, price, sizes and fill in the
						current stock quantity for each size. Here you add
						product images as well, sort the images in the order you
						want them to appear in the store. To save a new product
						to the store database all fields needs to be filled with
						the right product-data in the proper format.
					</p>
				</article>
				<article className={styles.sectionInfo}>
					<NavLink
						to="/admin/update-product"
						className={styles.sectionLinks}
					>
						<h4>Update product</h4>
					</NavLink>
					<p>
						Use this section to update an existing product in the
						store database. Here you can change all product-data,
						update stock quantity or delete, add or sort product
						images.
					</p>
				</article>
				<article className={styles.sectionInfo}>
					<NavLink to="/admin/orders" className={styles.sectionLinks}>
						<h4>Orders</h4>
					</NavLink>
					<p>
						In this section all orders are available and can easily
						be sorted by order date, status and customer.
						<br />
						<br />
						<i>This section is currently under development</i>
					</p>
				</article>
				<article className={styles.sectionInfo}>
					<NavLink
						to="/admin/edit-store"
						className={styles.sectionLinks}
					>
						<h4>Edit store</h4>
					</NavLink>
					<p>
						Use this section when you want to change store settings
						like styling, product categories, sizes and more.
						<br />
						<br />
						<i>This section is currently under development.</i>
					</p>
				</article>
			</section>
		</section>
	);
}

export default AdminMain