import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Comment from '../Comment';
import styled from 'styled-components';
import addComma from '../../util/addComma';
import useApiCall from '../../hooks/useApiCall';

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

const DetailComment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 75%;
  left: 20%;
  width: 60%;
  height: 14%;
  border-radius: 4px;
  background-color: wheat;
`;

function ProductDetail({ detailProduct, setDetailProduct, fetchData }) {
  const [img, setImg] = useState(detailProduct.imgLink);
  const [name, setName] = useState(detailProduct.title);
  const [detail, setDetail] = useState(detailProduct.detail);
  const [price, setPrice] = useState(detailProduct.price);
  const [currentState, setCurrentState] = useState('none');
  const isDisplayNone = detailProduct === null;

  const [comments, setComments] = useState(null);
  const [addState, setAddState] = useState('none');
  const commentInputRef = useRef(null);

  const [payload, loading, error, fetchDataComment] = useApiCall(
    `http://localhost:4000/comment/${detailProduct._id}`
  );

  useEffect(() => {
    if (payload?.comment) {
      setComments(payload.comment);
    }
  }, [payload]);

  if (loading) {
    return <>로딩 중...</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

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

  const onHandleCreateComment = async () => {
    const value = commentInputRef.current.value;
    await axios.post('http://localhost:4000/comment', {
      id: detailProduct._id,
      comment: value,
    });
    fetchDataComment();
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

  const addButton = (
    <>
      <input className='add-input' type='text' ref={commentInputRef} />
      <button onClick={onHandleCreateComment}>추가</button>
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
        <DetailComment>
          {!comments || comments.length === 0
            ? addButton
            : comments?.map((comment, idx) => (
                <Comment
                  index={idx}
                  productId={detailProduct._id}
                  comment={comment}
                  comments={comments}
                  fetchDataComment={fetchDataComment}
                />
              ))}
        </DetailComment>
      </DetailComponent>
      <DetailWrapper />
    </>
  );
}

export default ProductDetail;

// if (!comments || comments.length === 0) {
// } else {
// }
//조건 : comments가 없거나 comments의 길이가 0일때... 추가 버튼이 나오게한다.
//     comments길이가 0보다 클때 있으면 comments.들을 보여준다.
