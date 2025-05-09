
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Cart from './pages/Cart';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/Notfound';
import './App.css';

function App() {
	return (
	  <div className="app-container">
		<Navbar />
		<main className="main-content">
		  <Routes>
			<Route path="/" element={<Home />} />
			<Route path="/cart" element={<Cart />} />
			<Route path="/admin" element={<AdminPanel />} />
			<Route path="*" element={<NotFound />} />
		  </Routes>
		</main>
		<Footer />
	  </div>
	);
  }
  
  export default App;
	
