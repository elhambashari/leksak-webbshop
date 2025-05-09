import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useCartStore } from "../store/CartStore";

function Navbar() {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.cartItems);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">Sommarshoppen</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Produkter</Link>
        </li>

        <li className='cart-link'>
          <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
            <span className="cart-icon">
              🛒
              {!isAdminPage && totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
            </span>
            <span className="cart-text">Kundvagn</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

