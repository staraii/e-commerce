import styles from "./admin.module.css"
import { Outlet } from "react-router-dom";
import AdminNavBar from "pages/Admin/components/AdminNavBar/AdminNavBar"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { setAdmin } from "slices/userSlice";




function Admin() {
	const isAdmin = useAppSelector((state) => state.user.isAdmin);
	const dispatch = useAppDispatch();
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(setAdmin(true));
		} else {
			dispatch(setAdmin(false));
		}
	})
	return (
		<section className={styles.section}>
			{isAdmin ? (<AdminNavBar />) : (null)}
			
			<Outlet />
		</section>
	);
}

export default Admin