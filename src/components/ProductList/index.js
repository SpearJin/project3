import styled from 'styled-components';

import ProductInfo from '../ProductInfo';
import deskImg from '../../images/desk.jpeg';
import notebookImg from '../../images/notebook.jpeg';
import mouseImg from '../../images/mouse.jpeg';
import ProductDetail from '../ProductDetail';
import { useState } from 'react';

const infoDetail = [
  {
    _id: 1,
    img: deskImg,
    name: '책상',
    detail: '책상 정보',
    price: 30000,
  },
  {
    _id: 2,
    img: notebookImg,
    name: '노트북',
    detail: '노트북 정보',
    price: 2000000,
  },
  {
    _id: 3,
    img: mouseImg,
    name: '마우스',
    detail: '마우스 정보',
    price: 50000,
  },
];

const ListComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  font-size: 1.5rem;
`;

function ProductList() {
  const [detailProduct, setDetailProduct] = useState(null);

  return (
    <ListComponent>
      {infoDetail.map((info) => (
        <ProductInfo
          key={info._id}
          info={info}
          onClick={() => setDetailProduct(info)}
        />
      ))}
      <ProductDetail
        detailProduct={detailProduct}
        setDetailProduct={setDetailProduct}
      />
    </ListComponent>
  );
}

export default ProductList;
