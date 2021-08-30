import { useState } from 'react';
import styled from 'styled-components';

function Cart() {
  const [title, setTitle] = useState('책상');
  const [quentity, setQuentity] = useState(5);
  const price = quentity * 30000;

  const handleInrease = () => {
    if (quentity < 9) {
      setQuentity(quentity + 1);
    }
  };

  const handleDecrease = () => {
    if (quentity > 0) {
      setQuentity(quentity - 1);
    }
  };

  const CartComponent = styled.div`
    padding: 0.5em;
    font-size: 2.5rem;
  `;

  return (
    <CartComponent>
      <span className='cart-name'>{title}</span>
      <button className='cart-button cart-increase' onClick={handleInrease}>
        <i className='fas fa-plus-square'></i>
      </button>
      <span className='cart-quentity'>{quentity}</span>
      <button className='cart-button cart-decrease' onClick={handleDecrease}>
        <i className='fas fa-minus-square'></i>
      </button>
      <span className='cart-price'>{price}원</span>
    </CartComponent>
  );
}

export default Cart;
