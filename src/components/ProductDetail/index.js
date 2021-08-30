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

function ProductDetail({
  detailProduct,
  setDetailProduct,
  productList,
  setProductList,
}) {
  const { img, name, detail, price } = detailProduct;
  const [currentState, setCurrentState] = useState('none');
  const isDisplayNone = detailProduct === null;

  const onHandleDelete = () => {
    setProductList((state) =>
      state.filter((item) => item._id !== detailProduct._id)
    );
    setDetailProduct(null);
  };

  const onHandleUpdate = () => {
    setProductList((state) =>
      state.map((item) => {
        if (item._id === detailProduct._id) {
          return {
            ...item,
            name,
            detail,
            price,
          };
        }
        return item;
      })
    );
    setDetailProduct(null);
  };

  const divDetail = (
    <>
      <img src={img} />
      <div className='detail-description'>
        <span>{name}</span>
        <span>{detail}</span>
        <span>{addComma(price)}원</span>
      </div>
      <div>
        <DetailButton onClick={() => setCurrentState('update')}>
          수정
        </DetailButton>
        <DetailButton onClick={onHandleDelete}>삭제</DetailButton>
      </div>
    </>
  );

  const updateDetail = (
    <>
      <img src={img} />
      <div className='detail-description'>
        <input
          className='detail-input'
          type='text'
          placeholder={name}
          onChange={(e) => e.target.value}
        />
        <input
          className='detail-input'
          type='text'
          placeholder={detail}
          onChange={(e) => e.target.value}
        />
        <input
          className='detail-input'
          type='text'
          placeholder={price}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <DetailButton onClick={onHandleUpdate}>완료</DetailButton>
        <DetailButton onClick={() => setCurrentState('none')}>
          취소
        </DetailButton>
      </div>
    </>
  );

  return (
    <>
      <DetailComponent isDisplayNone={isDisplayNone}>
        <button onClick={() => setDetailProduct(null)}>X</button>
        <DetailInfo>
          {currentState === 'update' ? updateDetail : divDetail}
        </DetailInfo>
      </DetailComponent>
      <DetailWrapper />
    </>
  );
}

export default ProductDetail;
