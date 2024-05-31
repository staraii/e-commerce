import { Navigate } from "react-router-dom";
import styles from "./admin-login.module.css";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
//import { auth } from "services/firebase";
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { setAdmin } from "slices/userSlice";
//import { User } from "firebase/auth";

function AdminLogin() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const isAdmin = useAppSelector((state) => state.user.isAdmin);
	const dispatch = useAppDispatch();
	const handleLogin = () => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(setAdmin(true));
				console.log(user.email, " is logged in");
			})
			.catch(console.error);
	}
	if (isAdmin) {
		return (
			<Navigate to="/admin/main" />
		)
	}

	return (
		<section className={styles.loginSection}>
			<div className={styles.container}>
				<h2 className={styles.h2}>Login</h2>
				<form className={styles.form}>
					<label htmlFor="email" className={styles.label}>
						<p className={styles.labelP}>Email:</p>
						<input type="email" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} />
					</label>
					<label htmlFor="password" className={styles.label}>
						<p className={styles.labelP}>Password:</p>
						<input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} />
					</label>
					<button type="button" className={styles.loginButton} onClick={handleLogin}>
						Login
					</button>
				</form>
			</div>
		</section>
	);
}

export default AdminLogin