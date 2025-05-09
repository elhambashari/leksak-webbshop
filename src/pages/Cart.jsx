

import { useCartStore } from '../store/Cartstore';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

import './Cart.css';

function Cart() {
	const navigate = useNavigate();
	const cart = useCartStore(state => state.cartItems);
	const updateQuantity = useCartStore(state => state.updateQuantity);
	const removeFromCart = useCartStore(state => state.removeFromCart);
	const totalPrice = useCartStore(state => state.totalPrice);
  
	return (
	  <div className="cart-container">
		{cart.length > 0 && <h1>Din kundvagn</h1>}
  
		{cart.length === 0 ? (
		  <div className="empty-cart">
			  <div className="empty-message-wrapper">
			<p className="empty-message">Din kundvagn är tom.</p>
			<button className="continue-button" onClick={() => navigate('/')}>
              Gå vidare till produkter
            </button>
			</div>
		  </div>
		) : (
		  <div className="cart-list">
			{cart.map(item => (
			  <CartItem
				key={item.id}
				item={item}
				onQuantityChange={updateQuantity}
				onRemove={removeFromCart}
			  />
			))}
  
			<div className="cart-summary">
			  <h3>Summa: {totalPrice()} kr</h3>
			</div>
		  </div>
		)}
	  </div>
	);
  }
  

export default Cart;
