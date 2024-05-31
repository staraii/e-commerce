import { useAppSelector } from "hooks/reduxHooks";
import { Navigate } from "react-router-dom";

function EditStore() {
	const isAdmin = useAppSelector((state) => state.user.isAdmin);
	if (!isAdmin) {
		return <Navigate to="/admin/login" />;
	}
	return <section>Edit Store</section>;
}

export default EditStore;
