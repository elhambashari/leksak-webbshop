

import { useCartStore } from '../store/Cartstore';
import './ProductCard.css';

function ProductCard({ product }) {
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <div className="product-card">
	  <img src={product.imageUrl}  />
      <h2>{product.title}</h2>
      <p className="price">{product.price} kr</p>
      <button onClick={() => addToCart(product)}>Lägg till i kundvagn</button>
    </div>
  );
}

export default ProductCard;
