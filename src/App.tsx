import ReduxTest from 'components/ReduxTest/ReduxTest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Products from 'pages/Products/Products';
import Cart from 'pages/Cart/Cart';
import Admin from 'pages/Admin/Admin';
import './App.css';
import Fotter from 'components/ReduxTest/fotter/fotter';
import NavBar from 'components/NavBar/NavBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
	return (
		<section>
			<QueryClientProvider client={queryClient}>
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
			</QueryClientProvider>
			<Fotter />
		</section>
	);
}

export default App;
