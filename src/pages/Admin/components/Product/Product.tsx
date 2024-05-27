import { useState, useMemo } from "react";
import ProductForm from "../ProductForm/ProductForm";
import ImageUpload from "../ImageUpload/ImageUpload";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "services/firebase";
import { collection, Timestamp, doc, setDoc } from "firebase/firestore";
import styles from "./product.module.css"
import { useValidateProduct } from "hooks/useValidateProduct";
import { SelectedFiles, InitialProductState, Category, Gender, Touched, StringObject, NumberObject } from "types/productTypes";
import { toast } from "react-toastify";
import { useAppSelector } from "hooks/reduxHooks";
import { RootState } from "store/store";
import {stringsArrToNumbersArr} from "utils/conversion"
import { DocumentReference } from "@firebase/firestore-types";



function EditProduct() {
	const memoCategories = useMemo(
		() => (state: RootState) => state.utils.categories,
		[]
	);
	const memoGenders = useMemo(
		() => (state: RootState) => state.utils.genders,
		[]
	);
	const memoSizes = useMemo(
		() => (state: RootState) => state.utils.sizes,
		[]
	);
	const categories = useAppSelector(memoCategories);
	const genders = useAppSelector(memoGenders);
	const allSizes = useAppSelector(memoSizes);
	const getSizes = (category: Category, gender: Gender): string[] => {
		// Returnerar rätt storlekar beroende på kategori och kön
		if (category === "Hats" || category === "Bags") {
			return allSizes.Accessories[category];
		} else if (category === "Shoes") {
			return allSizes.Shoes[gender];
		}
		return allSizes.Clothes[category];
	};
	// Nollställt state
	const createInitialState = () => {
		const sizes = getSizes(categories[0], genders[0]);
		const stock = sizes.reduce((acc, size) => ({ ...acc, [size]: 0 }), {});
		const newState = {
			name: "",
			description: "",
			brand: "",
			price: "",
			gender: genders[0],
			category: categories[0],
			sizes: sizes,
			stock: stock,
		};
		return newState;
	};
	const [product, setProduct] = useState<InitialProductState>(createInitialState()); // All produktdata som matas in 
	const [uploadedFiles, setUploadedFiles] = useState<SelectedFiles>([]); // Uppladdade bilder
	const [touched, setTouched] = useState<Touched>({}); // Följer vilka fält som användare interagerat med
	const { errors, isValid } = useValidateProduct(
		product,
		categories,
		genders
	); // Validerar datan
	// Kategorialternativ
	const categoriesOptions: React.ReactNode[] = categories.map(
		(cat: Category) => {
			return (
				<option key={cat} value={cat}>
					{cat}
				</option>
			);
		}
	);
	// Könsalternativ
	const genderOptions: React.ReactNode[] = genders.map((gen: Gender) => {
		return (
			<option value={gen} key={gen}>
				{gen}
			</option>
		);
	});
	// Laddar upp bilder till storage
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
		const productsCollectionRef = doc(collection(db, "products"));
		// Skapar en array från record
		const stringArr: StringObject[] = [product.stock];
		// Itererar över arrayen och omvandlar värden från string till number
		const stock: NumberObject[] = stringsArrToNumbersArr(stringArr)
		// Nytt produkt objekt
		const newProduct = {
			id: productsCollectionRef.id,
			name: product.name,
			description: product.description,
			brand: product.brand,
			price: product.price,
			gender: product.gender,
			category: product.category,
			stock: stock,
			images: [...imageUrls],
			productAdded: Timestamp.fromDate(new Date()),
		};
		// Sparar produkt till firestore
		await toast.promise(setDoc(productsCollectionRef, newProduct), {
			pending: "Saving new product to database",
			success: "Product saved",
			error: "Error saving product",
		});
		setProduct(createInitialState);
		setTouched({});
		setUploadedFiles([]);
	}
	const resetProduct = () => {
		setTouched({});
		setUploadedFiles([]);
		setProduct(createInitialState());
	}
	return (
		<section className={styles.productSection}>
			{/* <h4 className={styles.h4}>Add new product</h4> */}
			<section className={styles.inputSection}>
				<ProductForm
					product={product}
					setProduct={setProduct}
					touched={touched}
					setTouched={setTouched}
					errors={errors}
					categories={categoriesOptions}
					genders={genderOptions}
					getSizes={getSizes}
				/>
				<ImageUpload
					uploadedFiles={uploadedFiles}
					setUploadedFiles={setUploadedFiles}
				/>
			</section>
			<button
				type="button"
				disabled={!isValid || uploadedFiles.length === 0}
				onClick={() => handleSubmit()}
				className={styles.submitButton}
			>
				Save Product
			</button>
			<button type="button" className={styles.submitButton} onClick={() => resetProduct()}>Reset</button>
		</section>
	);
}

export default EditProduct