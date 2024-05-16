import styles from './home.module.css';
import { Link } from 'react-router-dom';
function Home() {
	return (
		<section className={styles.section}>
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

				<aside className={styles.asideSection}>
					<h2 className={styles.asideSectionH2}>Katergorier</h2>
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
