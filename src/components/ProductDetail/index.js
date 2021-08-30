import { useState } from 'react';
import styled from 'styled-components';
import addComma from '../../util/addComma';

const DetailComponent = styled.div`
  display: ${({ isDisplayNone }) => (isDisplayNone ? 'none' : 'block')};
  position: fixed;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  border-radius: 4px;
  background-color: white;
  z-index: 1;
  & > button {
    position: fixed;
    right: 10%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  & > img {
    width: 200px;
    height: 200px;
  }
`;

const DetailWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const DetailButton = styled.button`
  width: 40px;
  height: 30px;
  margin: 0 2px;
  border-radius: 20px;
  background-color: goldenrod;
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

function ProductDetail({ detailProduct, setDetailProduct, setProductList }) {
  const { img, name, detail, price } = detailProduct;
  const isDisplayNone = detailProduct === null;

  const onHandleDelete = () => {
    setProductList((state) =>
      state.filter((item) => item._id !== detailProduct._id)
    );
    setDetailProduct(null);
  };

  return (
    <>
      <DetailComponent isDisplayNone={isDisplayNone}>
        <button onClick={() => setDetailProduct(null)}>X</button>
        <DetailInfo>
          <img src={img} />
          <div className='detail-description'>
            <span>{name}</span>
            <span>{detail}</span>
            <span>{addComma(price)}원</span>
          </div>
          <div>
            <DetailButton>수정</DetailButton>
            <DetailButton onClick={onHandleDelete}>삭제</DetailButton>
          </div>
        </DetailInfo>
      </DetailComponent>
      <DetailWrapper />
    </>
  );
}

export default ProductDetail;
