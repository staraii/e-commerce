import { useState } from "react";
import NewProductForm from "./NewProductForm";
import ImageUpload from "./ImageUpload";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "services/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import styles from "./new-product.module.css"
import { useValidateProduct } from "hooks/useValidateProduct";
import { SelectedFiles, ProductInput, Touched } from "types/productTypes";




function NewProduct() {
	const [uploadedFiles, setUploadedFiles] = useState<SelectedFiles>([]);
	const [product, setProduct] = useState<ProductInput>({
		name: "",
		description: "",
		price: 0,
		category: "Tröjor",
		xs: 0,
		s: 0,
		m: 0,
		l: 0,
		xl: 0,
		xxl: 0,
		oneSize: 0,
	});
	const [touched, setTouched] = useState<Touched>({});
	const { errors, isValid } = useValidateProduct(product, touched);
		async function uploadToStorage() {
			// Kontrollerar om det finns valda filer
			if (uploadedFiles.length === 0) {
				return null;
			}
			// Tom array att lagra bildernas url:er i
			const urls = [];
			try {
				// Itererar igenom listan av valda filer
				for (const file of uploadedFiles) {
					// Skapar en referens till varje fil
					const fileRef = ref(storage, `productImgs/${file.name}`);
					// Sparar fil till storage
					await uploadBytesResumable(fileRef, file);
					// Hämtar url till filen
					const downloadURL = await getDownloadURL(fileRef);
					// pushar url:en till lista
					urls.push(downloadURL);
				}
				// returnerar lista med url:er
				return urls;
			} catch (error) {
				console.error("Error uploading to storage", error);
				return null;
			}
		}
	async function handleSubmit() {
		// Sparar bilder till storage och returnerar lista med url:er
		const imageUrls = await uploadToStorage();
		// Kontrollerar att bilderna sparats
		if (!imageUrls) {
			return;
		}
		// Skapar en referens till "products" kollektionen i firestore
		const productsCollectionRef = collection(db, "products");
		// Nytt produkt objekt
		const newProduct = {
			name: product.name,
			description: product.description,
			price: product.price,
			category: product.category,
			xs: product.xs,
			s: product.s,
			m: product.m,
			l: product.l,
			xl: product.xl,
			xxl: product.xxl,
			oneSize: product.oneSize,
			images: [...imageUrls],
			productAdded: Timestamp.fromDate(new Date()),
		};
		// Sparar produkt till firestore
		await addDoc(productsCollectionRef, newProduct);
		// Nollställer state
		setProduct({
			name: "",
			description: "",
			price: 0,
			category: "Tröjor",
			xs: 0,
			s: 0,
			m: 0,
			l: 0,
			xl: 0,
			xxl: 0,
			oneSize: 0,
		});
		setUploadedFiles([]);
	}
	console.log(uploadedFiles.length)
	return (
		<section>
			<p>New product</p>
			<NewProductForm
				product={product}
				setProduct={setProduct}
				touched={touched}
				setTouched={setTouched}
				errors={errors}
			/>
			<ImageUpload
				uploadedFiles={uploadedFiles}
				setUploadedFiles={setUploadedFiles}
			/>
			<button
				type="button"
				disabled={!isValid || uploadedFiles.length === 0}
				onClick={() => handleSubmit()}
				className={styles.submitButton}
			>
				Ladda upp
			</button>
		</section>
	);
}

export default NewProduct