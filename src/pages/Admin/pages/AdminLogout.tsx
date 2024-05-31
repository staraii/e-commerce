import { getAuth, signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "hooks/reduxHooks";
import { setAdmin } from "slices/userSlice";

const AdminLogout = () => {
	const isAdmin = useAppSelector((state) => state.user.isAdmin);
	const dispatch = useAppDispatch();
	const auth = getAuth();
	signOut(auth).then(() => {
		console.log("Signed out");
		dispatch(setAdmin(false));
	}).catch((error) => {
		console.error(error);
	})
	if (isAdmin) {
		return (<p>Signing out...</p>)
	} else if (!isAdmin) {
		return (<Navigate to="/admin/login" />);
	}
	
};

export default AdminLogout;
