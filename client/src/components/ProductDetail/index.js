import axios from 'axios';
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
  setProductList,
  fetchData,
}) {
  const [img, setImg] = useState(detailProduct.imgLink);
  const [name, setName] = useState(detailProduct.title);
  const [detail, setDetail] = useState(detailProduct.detail);
  const [price, setPrice] = useState(detailProduct.price);

  const [currentState, setCurrentState] = useState('none');
  const isDisplayNone = detailProduct === null;

  const onHandleDelete = async () => {
    await axios.delete(`http://localhost:4000/product/${detailProduct._id}`);
    fetchData();
    setDetailProduct(null);
  };

  const onHandleUpdate = async () => {
    await axios.put('http://localhost:4000/product', {
      id: detailProduct._id,
      title: name,
      imgLink: img,
      detail,
      price,
    });
    fetchData();
    setDetailProduct(null);
  };

  const onHandleCreate = async () => {
    await axios.post('http://localhost:4000/product', {
      title: name,
      imgLink: img,
      detail,
      price,
    });
    fetchData();
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
        <DetailButton onClick={() => setCurrentState('create')}>
          추가
        </DetailButton>
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
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='detail-input'
          type='text'
          placeholder={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <input
          className='detail-input'
          type='text'
          placeholder={price}
          onChange={(e) => setPrice(e.target.value)}
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

  const createDetail = (
    <>
      <div className='detail-description'>
        <input
          className='detail-input'
          type='text'
          placeholder='이미지'
          onChange={(e) => setImg(e.target.value)}
        />
        <input
          className='detail-input'
          type='text'
          placeholder='상품명'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='detail-input'
          type='text'
          placeholder='상품설명'
          onChange={(e) => setDetail(e.target.value)}
        />
        <input
          className='detail-input'
          type='text'
          placeholder='가격'
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <DetailButton onClick={onHandleCreate}>완료</DetailButton>
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
          {currentState === 'update'
            ? updateDetail
            : currentState === 'create'
            ? createDetail
            : divDetail}
        </DetailInfo>
      </DetailComponent>
      <DetailWrapper />
    </>
  );
}

export default ProductDetail;
