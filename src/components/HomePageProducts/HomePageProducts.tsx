import { collection, getDocs, limit, query } from 'firebase/firestore';
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
	const product = await GetProducts(3);
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
				<div key={product.id} className={styles.productContainer}>
					<h1>{product.name}</h1>
					<img src={product.images} alt={product.name} />
					<p>Price: ${product.price}</p>
				</div>
			))}
		</div>
	);
};

export default GetProducts;
