import { useState } from 'react';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h1>Cart</h1>
      <div className="cart-items">
        {cart.map(item => (
          <CartItem key={item.id} item={item} onRemove={removeFromCart} />
        ))}
      </div>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
};

export default CartPage;
