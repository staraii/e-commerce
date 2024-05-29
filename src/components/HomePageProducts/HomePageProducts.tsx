import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from 'services/firebase';
import { useQuery } from '@tanstack/react-query';
import styles from './HPP.module.css';
import ProductCard from 'components/productcard/ProductCard';

export interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
	category: string;
	images: string;
}

//Hämtar de 3 första produkterna från db
const GetProducts = async (limitNumber: number): Promise<Product[]> => {
	const productQuery = query(collection(db, 'products'), limit(limitNumber));
	const querySnapshot = await getDocs(productQuery);
	const products: Product[] = [];
	querySnapshot.forEach((doc) => {
		products.push({ id: doc.id, ...doc.data() } as Product);
	});
	return products;
};

//Hämtar produkterna
const fetchProduct = async (): Promise<Product[]> => {
	const product = await GetProducts(4);
	return product;
};

export const Product = () => {
	const { data, error, isLoading } = useQuery<Product[]>({
		queryKey: ['product'],
		queryFn: fetchProduct,
	});

	if (isLoading) return <div className={styles.loadingMessage}>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!data) return <div>No product found</div>;

	return (
		<div className={styles.wraper}>
			{data.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export default GetProducts;
