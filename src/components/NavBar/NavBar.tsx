import { useState } from 'react';
import styles from './navBar.module.css';
import { Link } from 'react-router-dom';

function NavBar() {
	const [dropDownVisible, setDropDownVisible] = useState(false);

	return (
		<>
			<nav className={styles.NavBar}>
				<div className={styles.wraper}>
					<Link className={styles.link} to='/'>
						Home
					</Link>
					<Link className={styles.link} to='/products'>
						Products
					</Link>
					<Link className={styles.link} to='/cart'>
						Cart
					</Link>

					<div
						className={styles.linkCategories}
						onMouseEnter={() => setDropDownVisible(true)}
						onMouseLeave={() => setDropDownVisible(false)}
					>
						<Link className={styles.link} to='/categories'>
							Categories
						</Link>
						{dropDownVisible && (
							<div className={styles.navDropdown}>
								<Link className={styles.linkDropdown} to='/cart'>
									Shoes
								</Link>
								<Link className={styles.linkDropdown} to='/cart'>
									Shirts
								</Link>
								<Link className={styles.linkDropdown} to='/cart'>
									Pants
								</Link>
								<Link className={styles.linkDropdown} to='/cart'>
									Headwear
								</Link>
							</div>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}

export default NavBar;
