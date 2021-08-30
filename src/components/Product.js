import { useState } from 'react';
import styled from 'styled-components';
import addComma from '../util/addComma';

const ProductComponent = styled.div`
  padding: 0.5em;
  font-size: 2.5rem;
`;

function Product({ name, unityPrice, setTotalPrice }) {
  const [quentity, setQuentity] = useState(5);
  const price = quentity * unityPrice;

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

  setTotalPrice(price);

  return (
    <ProductComponent>
      <span className='cart-name'>{name}</span>
      <button className='cart-button cart-increase' onClick={handleInrease}>
        <i className='fas fa-plus-square'></i>
      </button>
      <span className='cart-quentity'>{quentity}</span>
      <button className='cart-button cart-decrease' onClick={handleDecrease}>
        <i className='fas fa-minus-square'></i>
      </button>
      <span className='cart-price'>{addComma(price)}원</span>
    </ProductComponent>
  );
}

export default Product;
