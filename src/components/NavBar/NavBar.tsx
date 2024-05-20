import styles from './navBar.module.css';
import { Link } from 'react-router-dom';

function NavBar() {
	return (
		<>
			<nav className={styles.NavBar}>
				<p>Bild på loga här?</p>
				<div>
					<Link className={styles.link} to='/'>
						Home
					</Link>
					<Link className={styles.link} to='/products'>
						Products
					</Link>
					<Link className={styles.link} to='/cart'>
						Cart
					</Link>
				</div>
			</nav>
		</>
	);
}

export default NavBar;
