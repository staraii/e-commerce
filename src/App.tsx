import ReduxTest from "components/ReduxTest/ReduxTest";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home/Home";
import Products from "pages/Products/Products"
import Cart from "pages/Cart/Cart";
import Admin from "pages/Admin/Admin";
import './App.css'


function App() {

	return (
		<section>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/redux" element={<ReduxTest />}/>
				</Routes>
			</Router>
		</section>
	);
}

export default App
