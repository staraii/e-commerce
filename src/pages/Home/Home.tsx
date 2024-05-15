import styles from './home.module.css';
import { Link } from 'react-router-dom';
function Home() {
	return (
		<section className={styles.section}>
			<nav className={styles.navBar}>
				<Link className={styles.link} to='/products'>
					Products
				</Link>
				<Link className={styles.link} to='/cart'>
					Cart
				</Link>
			</nav>

			<div className={styles.container}>
				<section className={styles.productSection}>
					<h2>Köp något för att bli glad</h2>
					<h4>Men köp något då</h4>
					<section className={styles.productPics}>
						<Link className={styles.product} to='/cart'>
							Bild på produkt
						</Link>
						<Link className={styles.product} to='/cart'>
							Bild på produkt
						</Link>
						<Link className={styles.product} to='/cart'>
							Bild på produkt
						</Link>
						<Link className={styles.product} to='/cart'>
							Bild på produkt
						</Link>
						<Link className={styles.product} to='/cart'>
							Bild på produkt
						</Link>
					</section>
				</section>

				<section className={styles.categorySection}>
					<h2>Katergori</h2>
					<Link className={styles.categoryLink} to='/cart'>
						Skor
					</Link>
					<Link className={styles.categoryLink} to='/cart'>
						Tröjor
					</Link>
					<Link className={styles.categoryLink} to='/cart'>
						Byxor
					</Link>
					<Link className={styles.categoryLink} to='/cart'>
						Hattar
					</Link>
				</section>
			</div>
		</section>
	);
}

export default Home;
