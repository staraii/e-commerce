<<<<<<< HEAD
import ReduxTest from "components/ReduxTest/ReduxTest";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home/Home";
import Products from "pages/Products/Products";
import Cart from "pages/Cart/Cart";
import Admin from "pages/Admin/Admin";
import "./App.css";
import Fotter from "components/ReduxTest/fotter/fotter";

function App() {
  return (
    <section>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/redux" element={<ReduxTest />} />
        </Routes>
      </Router>
      <Fotter />
    </section>
  );
=======
import ReduxTest from 'components/ReduxTest/ReduxTest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Products from 'pages/Products/Products';
import Cart from 'pages/Cart/Cart';
import Admin from 'pages/Admin/Admin';
import NavBar from 'components/NavBar/NavBar';
import './App.css';

function App() {
	return (
		<section>
			<Router>
				<NavBar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/products' element={<Products />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/admin' element={<Admin />} />
					<Route path='/redux' element={<ReduxTest />} />
				</Routes>
			</Router>
		</section>
	);
>>>>>>> d27f6453c14652838a384e43c53e6ba61e80e2b5
}

export default App;
