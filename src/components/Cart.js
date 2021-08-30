import { useState } from 'react';
import styled from 'styled-components';
import addComma from '../util/addComma';
import Product from './Product';

const CartProduct = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const ProductWraaper = styled.div`
  width: 800px;
  border-radius: 4px;
  background-color: wheat;
  text-align: center;
`;

const Price = styled.div`
  transform: translateX(200px);
`;

function Cart() {
  const [deskTotalPrice, setDeskTotalPrice] = useState(0);
  const [noteTotalPrice, setNoteTotalPrice] = useState(0);
  const [mouseTotalPrice, setMouseTotalPrice] = useState(0);
  const totalPrice = deskTotalPrice + noteTotalPrice + mouseTotalPrice;

  return (
    <CartProduct>
      <ProductWraaper>
        <Product
          name='책상'
          unityPrice={30000}
          setTotalPrice={setDeskTotalPrice}
        />

        <Product
          name='노트북'
          unityPrice={2000000}
          setTotalPrice={setNoteTotalPrice}
        />

        <Product
          name='마우스'
          unityPrice={50000}
          setTotalPrice={setMouseTotalPrice}
        />
        <Price>총 가격: {addComma(totalPrice)} 원</Price>
      </ProductWraaper>
    </CartProduct>
  );
}

export default Cart;
