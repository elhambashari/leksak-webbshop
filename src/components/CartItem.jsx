

import './CartItem.css';

function CartItem({ item, onQuantityChange, onRemove }) {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  return (
    <div className="cart-item">
      <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h2>{item.name}</h2>
        <p>{item.price} kr/st</p>
        <div className="cart-item-quantity">
          <label>Antal:</label>
          <div className="quantity-controls">
            <button onClick={handleDecrease}>−</button>
            <span>{item.quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
        </div>
        <p className="cart-item-total">Totalt: {item.quantity * Number(item.price)} kr</p>
        <button className="remove-button" onClick={() => onRemove(item.id)}>Ta bort</button>
      </div>
    </div>
  );
}

export default CartItem;
