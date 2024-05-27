//import { db } from "services/firebase";
//import { collection, query, where, getDocs, Query, Timestamp, DocumentReference} from "firebase/firestore";
//import { useState, useEffect, useMemo } from "react";
//import { Product } from "src/types/productTypes";
//import { useAppSelector } from "hooks/reduxHooks";
//import { RootState } from "store/store";
import EditProduct from "../../components/Product";


// interface Document {
// 	id: DocumentReference;
// 	name: string;
// 	description: string;
// 	brand: string;
// 	price: string;
// 	gender: string;
// 	category: string;
// 	stock: { [key: string]: number };
// 	images: string[];
// 	productAdded: Timestamp;
// }

//const ref = collection(db, "products");
function UpdateProduct() {
	// const memoCategories = useMemo(
	// 	() => (state: RootState) => state.utils.categories,
	// 	[]
	// );

	// const categories = useAppSelector(memoCategories);
	// const [allProducts, setAllProducts] = useState<Document[]>([]);
	// const [productsList, setProductsList] = useState<React.ReactNode[]>([]);
	// const [selectedProduct, setSelectedProduct] = useState<number | string>("Select Product");
	// const [product, setProduct] = useState<Document | null>(null);
	// const getProducts = async () => {
	// 	const querySnapshot = await getDocs(collection(db, "products"));
	// 	const data: Document[] = [];
	// 	querySnapshot.forEach((doc) => {
	// 		const productItem = doc.data() as Document;
	// 		data.push(productItem)
	// 	});
	// 	setAllProducts(() => data);
	// };
	// const handleSelectedProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	setSelectedProduct(e.target.value);
	// 	if (e.target.value === "" || e.target.value === "Select Product") {	
	// 		return;
	// 	}
	// 	const index: number = Number(e.target.value);
	// 	const doc = allProducts[index];
	// 	const product: Product = {
	// 		name: doc.name,
	// 		description: doc.description,
	// 		brand: doc.brand,
	// 		price: doc.price,
	// 		gender: doc.gender,
	// 		category: doc.category,
	// 		stock: {...doc.stock},
	// 	}
	// 	const images: string[] = [...doc.images];
	// 	const id: DocumentReference = doc.id;
	// 	const productAdded: Timestamp = doc.productAdded;
	// 	setProduct({product, id, images, productAdded});
	// }

	// useEffect(() => {
	// 	const sortedProductsList: React.ReactNode[] = [];
	// 	categories.forEach((cat) => {
	// 		sortedProductsList.push(<option key={cat} value="">---&nbsp;{cat}&nbsp;---</option>);	
	// 		const catItems = allProducts.map((item, index) => {
	// 			if (item.category == cat) {
	// 				return (<option key={item.name} value={index}>{item.name}</option>);
	// 			}
	// 		})
	// 		sortedProductsList.push(catItems);
	// 	})
	// 	setProductsList(sortedProductsList)
	// }, [allProducts, categories])
	// useEffect(() => {
	// 	getProducts();
	// }, [])

	return (
		<section>
			<h4>Update Product</h4>
			{/* {productsList.length > 0 && (
				<select
					value={selectedProduct}
					onChange={(e) => handleSelectedProduct(e)}
				>
					<option value="Select Product">Select Product</option>
					{productsList.length > 0 && productsList}
				</select>
			)}
			{product && (<EditProduct updateProduct={product} />)} */}
		</section>
	);
}

export default UpdateProduct;
