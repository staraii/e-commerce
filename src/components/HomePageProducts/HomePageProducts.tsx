import { collection, getDocs } from 'firebase/firestore';
import { db } from 'services/firebase';
import { useQuery } from '@tanstack/react-query';
import styles from './HPP.module.css';

interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
	category: string;
	images: string;
	rating: {
		rate: string;
		count: string;
	};
}

const GetProducts = async (): Promise<Product[]> => {
	const querySnapshot = await getDocs(collection(db, 'products'));
	const products: Product[] = [];
	querySnapshot.forEach((doc) => {
		products.push({ id: doc.id, ...doc.data() } as Product);
	});
	return products;
};

const fetchProduct = async (): Promise<Product> => {
	const products = await GetProducts();
	return products[1]; // Returnera den första produkten för detta exempel
};

export const Product = () => {
	//TODO slupma fram en produkt
	//TODO Gör det 4 gånger
	const { data, error, isLoading } = useQuery<Product>({
		queryKey: ['product'],
		queryFn: fetchProduct,
	});

	if (isLoading) return <div className={styles.loadingMessage}>hacking...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!data) return <div>No product found</div>; // Lägg till en kontroll för undefined data

	return (
		<div className={styles.productContainer}>
			<img src={data.images} alt={data.name} />
			<h1>{data.name}</h1>
			<p>Price: ${data.price}</p>
		</div>
	);
};

export default GetProducts;
