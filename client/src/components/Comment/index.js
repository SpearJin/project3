import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const CommentComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  & > .content {
    width: 153px;
  }
`;

const CommentBtn = styled.button`
  width: 30px;
  height: 20px;
  margin: 0 2px;
  border-radius: 4px;
  background-color: goldenrod;
  color: white;
  font-size: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

function Comment({ index, productId, comment, comments, fetchDataComment }) {
  const [newComment, setNewComment] = useState(comment);
  const [commentState, setCommentState] = useState('none');

  const onHandleUpdate = async () => {
    await axios.put('http://localhost:4000/comment', {
      id: productId,
      comment: newComment,
      index,
    });
    fetchDataComment();
  };

  const onHandleDelete = async () => {
    console.log(`productId: ${productId}`);
    await axios.delete(`http://localhost:4000/comment/${productId}/${index}`);
    fetchDataComment();
  };

  const onHandleCreate = async () => {
    await axios.post('http://localhost:4000/comment', {
      id: productId,
      comment: newComment,
    });
    fetchDataComment();
  };

  const divComment = (
    <>
      <div>{newComment}</div>
      <div>
        <CommentBtn onClick={() => setCommentState('create')}>추가</CommentBtn>
        <CommentBtn onClick={() => setCommentState('update')}>수정</CommentBtn>
        <CommentBtn onClick={onHandleDelete}>삭제</CommentBtn>
      </div>
    </>
  );

  const updateComment = (
    <>
      <input
        type='text'
        onChange={(e) => setNewComment(e.target.value)}
        placeholder='댓글을 수정하세요'
      />
      <div>
        <CommentBtn onClick={onHandleUpdate}>완료</CommentBtn>
        <CommentBtn onClick={() => setCommentState('none')}>취소</CommentBtn>
      </div>
    </>
  );

  const createComment = (
    <>
      <input
        type='text'
        onChange={(e) => setNewComment(e.target.value)}
        placeholder='댓글을 작성하세요'
      />
      <div>
        <CommentBtn onClick={onHandleCreate}>완료</CommentBtn>
        <CommentBtn onClick={() => setCommentState('none')}>취소</CommentBtn>
      </div>
    </>
  );

  return (
    <CommentComponent>
      {commentState === 'update'
        ? updateComment
        : commentState === 'create'
        ? createComment
        : divComment}
    </CommentComponent>
  );
}

export default Comment;
