import styles from './home.module.css';
import { Link } from 'react-router-dom';
function Home() {
	return (
		<section className={styles.section}>
			<h2>Home</h2>
			<p>test</p>
			<Link to='/products'>Products</Link>
			<Link to='/cart'>Cart</Link>
		</section>
	);
}

export default Home;
