import styles from "./admin.module.css"
import NewProduct from "./components/NewProduct/NewProduct";
//import { db } from "services/firebase";
//import { collection, query, where, getDocs, Query } from "firebase/firestore";



function Admin() {
	// const shirtsQuery: Query = query(collection(db, "products"), where("category", "==", "Tröjor"));
	// const pantsQuery: Query = query(
	// 	collection(db, "products"),
	// 	where("category", "==", "Byxor")
	// );
	// const getProducts = async (q: Query) => {
	// 	const querySnapshot = await getDocs(q);
	// 	querySnapshot.forEach((doc) => {
	// 		console.log(doc.id, "=>", doc.data())
	// 	})
	// }

	return (
		<section className={styles.section}>

				{/* <button onClick={() => getProducts(shirtsQuery)}>Tröjor</button>
				<button onClick={() => getProducts(pantsQuery)}>Byxor</button> */}
				<NewProduct />
			
		</section>
	);
}

export default Admin