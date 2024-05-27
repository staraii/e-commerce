import styles from "./product-form.module.css";
import { Touched, Category, Gender, InitialProductState, Errors } from "types/productTypes.ts";
import "../Product/product.css";


interface ProductFormProps {
	product: InitialProductState;
	setProduct: React.Dispatch<React.SetStateAction<InitialProductState>>;
	touched: Touched;
	setTouched: React.Dispatch<React.SetStateAction<Touched>>;
	errors: Errors;
	categories: React.ReactNode[];
	genders: React.ReactNode[];
	getSizes: (a: string, b: string) => string[];
}

function ProductForm({ product, setProduct, touched, setTouched, errors, categories, genders, getSizes }: ProductFormProps) {
	const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		setProduct((prevProd) => { return { ...prevProd, [name]: value } });
	};
	const handleTouched = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name } = event.target;
		setTouched({...touched, [name]: true})
	}
	const handleSizeChange = (category: Category, gender: Gender) => {
		const sizes = getSizes(category, gender);
		console.log(sizes)
		setProduct((prevProduct) => {
			return {
				...prevProduct,
				category,
				gender,
				sizes,
				stock: sizes.reduce((acc, size) => ({ ...acc, [size]: 0 }), {}),
			};
		});
	};
		const handleStockChange = (size: string, value: string) => {
			setProduct((prevProduct) => {
				return {
					...prevProduct,
					stock: { ...product.stock, [size]: value },
				}
			});
	};
	return (
		<form className={styles.form} autoComplete="off">
			<label htmlFor="name" className={styles.inputLabel}>
				<p className={styles.pLabel}>Name of product</p>
				<input
					type="text"
					id="name"
					name="name"
					value={product.name}
					onChange={handleFormChange}
					onBlur={handleTouched}
					className={`${
						errors.name && touched.name
							? "textInput invalidInput"
							: "textInput"
					}`}
				/>
				{touched.name && errors.name && (
					<p className={styles.pError}>{errors.name}</p>
				)}
			</label>
			<label htmlFor="description" className={styles.inputLabel}>
				<p className={styles.pLabel}>Product description</p>
				<input
					type="text"
					id="description"
					name="description"
					value={product.description}
					onChange={handleFormChange}
					onBlur={handleTouched}
					className={`${
						errors.description && touched.description
							? "textInput invalidInput"
							: "textInput"
					}`}
				/>
				{touched.description && errors.description && (
					<p className={styles.pError}>{errors.description}</p>
				)}
			</label>
			<label htmlFor="brand" className={styles.inputLabel}>
				<p className={styles.pLabel}>Brand</p>
				<input
					type="text"
					id="brand"
					name="brand"
					value={product.brand}
					onChange={handleFormChange}
					onBlur={handleTouched}
					className={`${
						errors.brand && touched.brand
							? "textInput invalidInput"
							: "textInput"
					}`}
				/>
				{touched.brand && errors.brand && (
					<p className={styles.pError}>{errors.brand}</p>
				)}
			</label>
			<label htmlFor="price" className={styles.inputLabel}>
				<p className={styles.pLabel}>Price</p>
				<input
					type="number"
					id="price"
					name="price"
					value={product.price}
					onChange={handleFormChange}
					onBlur={handleTouched}
					className={`${
						errors.price && touched.price
							? "textInput invalidInput"
							: "textInput"
					}`}
					min="1"
					step="0.01"
				/>
				{touched.price && errors.price && (
					<p className={styles.pError}>{errors.price}</p>
				)}
			</label>
			{/* Category */}
			<label htmlFor="category" className={styles.inputLabel}>
				<p className={styles.pLabel}>Category</p>
				<select
					value={product.category}
					className={styles.select}
					onChange={(e) =>
						handleSizeChange(
							e.target.value as Category,
							product.gender
						)
					}
					name="category"
				>
					{categories}
				</select>
				{touched.category && errors.category && (
					<p className={styles.pError}>{errors.category}</p>
				)}
			</label>
			{/* Gender */}
			<label htmlFor="gender" className={styles.inputLabel}>
				<p className={styles.pLabel}>Gender</p>
				<select
					value={product.gender}
					className={styles.select}
					onChange={(e) =>
						handleSizeChange(
							product.category,
							e.target.value as Gender
						)
					}
					name="gender"
				>
					{genders}
				</select>
				{touched.gender && errors.gender && (
					<p className={styles.pError}>{errors.gender}</p>
				)}
			</label>
			<h4 className={styles.h4}>Sizes in stock</h4>
			<p className={styles.pSizeError}>{errors.sizes && errors.sizes}</p>
			<section className={styles.stockQuantitySection}>
				{product.stock &&
					product.sizes.map((size) => (
						<label
							htmlFor={size}
							key={size}
							className={styles.sizeLabels}
						>
							<p className={styles.pSize}>{size}</p>
							<input
								className={`${
									errors[size]
										? "sizeInput invalidSizeInput"
										: "sizeInput"
								}`}
								name={size}
								type="number"
								value={product.stock[size]}
								min="0"
								step="1"
								onChange={(e) =>
									handleStockChange(size, e.target.value)
								}
								onBlur={handleTouched}
							/>
						</label>
					))}
			</section>
		</form>
	);
}

export default ProductForm