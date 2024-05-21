import styles from './home.module.css';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { useEffect } from 'react';
import GetProducts, {
	Product,
} from 'components/HomePageProducts/HomePageProducts';

function Home() {
	useEffect(() => {
		// Funktion för att hämta produkter
		const fetchData = async () => {
			await GetProducts();
		};

		// Anropa funktionen
		fetchData();
	}, []);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<section className={styles.productSection}>
					<TypeAnimation
						sequence={[
							'Why dont you checkout our Jackets?',
							2000,
							'Why dont you checkout our Shoes?',
							2000,
							'Why dont you checkout our Pants?',
							2000,
							'Why dont you checkout our Shirts?',
							2000,
						]}
						speed={40}
						style={{ fontSize: '3rem', fontWeight: 'bold' }}
						repeat={Infinity}
					/>
					<section className={styles.productPics}>
						<Product />
						<Product />
						<Product />
					</section>
				</section>

				<aside className={styles.asideSection}>
					<h2 className={styles.categorySectionH2}>Katergorier</h2>
					<Link className={styles.asideLink} to='/cart'>
						Skor
					</Link>
					<Link className={styles.asideLink} to='/cart'>
						Tröjor
					</Link>
					<Link className={styles.asideLink} to='/cart'>
						Byxor
					</Link>
					<Link className={styles.asideLink} to='/cart'>
						Hattar
					</Link>
				</aside>
			</div>
		</section>
	);
}

export default Home;
