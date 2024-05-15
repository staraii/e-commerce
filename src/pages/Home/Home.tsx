import styles from './home.module.css';
import { Link } from 'react-router-dom';
function Home() {
	return (
		<section className={styles.section}>
			<nav className={styles.navBar}>
				<Link to='/products'>Products</Link>
				<Link to='/cart'>Cart</Link>
			</nav>

			<div className={styles.container}>
				<section className={styles.productSection}>
					<h2>Köp något för att bli glad</h2>
					<h4>Men köp något då</h4>
					<section className={styles.productPics}>
						<div className={styles.product}>bild här</div>
						<div className={styles.product}>bild här</div>
						<div className={styles.product}>bild här</div>
						<div className={styles.product}>bild här</div>
						<div className={styles.product}>bild här</div>
					</section>
				</section>

				<section className={styles.categorySection}>
					<h2>Katergori</h2>
					<button className={styles.btn}>Byxor</button>
					<button className={styles.btn}>Byxor</button>
					<button className={styles.btn}>Byxor</button>
					<button className={styles.btn}>Byxor</button>
					<button className={styles.btn}>Byxor</button>
				</section>
			</div>
		</section>
	);
}

export default Home;
