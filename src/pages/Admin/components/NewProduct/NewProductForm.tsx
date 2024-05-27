import styles from "./new-product.module.css";
import { ProductInput, Touched, Errors } from "types/productTypes.ts";

interface NewProductFormProps {
	product: ProductInput;
	setProduct: React.Dispatch<React.SetStateAction<ProductInput>>;
	touched: Touched;
	setTouched: React.Dispatch<React.SetStateAction<Touched>>;
	errors: Errors;
}


function NewProductForm({product, setProduct, touched, setTouched, errors}: NewProductFormProps) {
	const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		setProduct({...product, [name]: value });
	};
	const handleTouched = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name } = event.target;
		setTouched({...touched, [name]: true})
	}
	return (
		<form className={styles.form} autoComplete="off">
			<label htmlFor="name" className={styles.inputLabel}>
				<p className={styles.pLabel}>Produktnamn: </p>
				<input
					type="text"
					id="name"
					name="name"
					value={product.name}
					onChange={handleFormChange}
					onBlur={handleTouched}
					className={styles.textInput}
				/>
				{touched.name && errors.name && (
					<p className={styles.pError}>{errors.name}</p>
				)}
			</label>
			<label htmlFor="description" className={styles.inputLabel}>
				<p className={styles.pLabel}>Produktbeskrivning:</p>
				<input
					type="text"
					id="description"
					name="description"
					value={product.description}
					onChange={handleFormChange}
					onBlur={handleTouched}
					className={styles.textInput}
				/>
				{touched.description && errors.description && (
					<p className={styles.pError}>{errors.description}</p>
				)}
			</label>
			<label htmlFor="price" className={styles.inputLabel}>
				<p className={styles.pLabel}>Pris: </p>
				<input
					type="number"
					id="price"
					name="price"
					value={product.price}
					onChange={handleFormChange}
					onBlur={handleTouched}
					className={styles.numberInput}
					min="1"
					step="0.01"
				/>
				{touched.price && errors.price && (
					<p className={styles.pError}>{errors.price}</p>
				)}
			</label>
			<label htmlFor="category" className={styles.inputLabel}>
				<p className={styles.pLabel}>Kategori: </p>
				<select
					className={styles.select}
					value={product.category}
					onChange={handleFormChange}
					// onBlur={handleTouched}
					name="category"
					id="category"
				>
					<option value="Tröjor">Tröjor</option>
					<option value="Byxor">Byxor</option>
					<option value="Hattar">Hattar</option>
					<option value="Skor">Skor</option>
				</select>
				{touched.category && errors.category && (
					<p className={styles.pError}>{errors.category}</p>
				)}
			</label>
			<section className={styles.stockQuantitySection}>
				<label htmlFor="xs">
					<p className={styles.pSize}>XS:</p>
					<input
						type="number"
						id="xs"
						name="xs"
						value={product.xs}
						onChange={handleFormChange}
						// onBlur={handleTouched}
						min="0"
						step="1"
					/>
					{errors.xs && (
						<p className={styles.pError}>{errors.xs}</p>
					)}
				</label>
				<label htmlFor="s">
					<p className={styles.pSize}>S:</p>
					<input
						type="number"
						id="s"
						name="s"
						value={product.s}
						onChange={handleFormChange}
						// onBlur={handleTouched}
						min="0"
						step="1"
					/>
					{errors.s && (
						<p className={styles.pError}>{errors.s}</p>
					)}
				</label>
				<label htmlFor="m">
					<p className={styles.pSize}>M:</p>
					<input
						type="number"
						id="m"
						name="m"
						value={product.m}
						onChange={handleFormChange}
						// onBlur={handleTouched}
						min="0"
						step="1"
					/>
					{errors.m && (
						<p className={styles.pError}>{errors.m}</p>
					)}
				</label>
				<label htmlFor="l">
					<p className={styles.pSize}>L:</p>
					<input
						type="number"
						id="l"
						name="l"
						value={product.l}
						onChange={handleFormChange}
						// onBlur={handleTouched}
						min="0"
						step="1"
					/>
					{errors.l && (
						<p className={styles.pError}>{errors.l}</p>
					)}
				</label>
				<label htmlFor="xl">
					<p className={styles.pSize}>XL:</p>
					<input
						type="number"
						id="xl"
						name="xl"
						value={product.xl}
						onChange={handleFormChange}
						// onBlur={handleTouched}
						min="0"
						step="1"
					/>
					{errors.xl && (
						<p className={styles.pError}>{errors.xl}</p>
					)}
				</label>
				<label htmlFor="xxl">
					<p className={styles.pSize}>XXL:</p>
					<input
						type="number"
						id="xxl"
						name="xxl"
						value={product.xxl}
						onChange={handleFormChange}
						// onBlur={handleTouched}
						min="0"
						step="1"
					/>
					{errors.xxl && (
						<p className={styles.pError}>{errors.xxl}</p>
					)}
				</label>
				<label htmlFor="oneSize">
					<p className={styles.pSize}>One Size:</p>
					<input
						type="number"
						id="oneSize"
						name="oneSize"
						value={product.oneSize}
						onChange={handleFormChange}
						// onBlur={handleTouched}
						min="0"
						step="1"
					/>
					{errors.oneSize && (
						<p className={styles.pError}>{errors.oneSize}</p>
					)}
				</label>
			</section>
		</form>
	);
}

export default NewProductForm