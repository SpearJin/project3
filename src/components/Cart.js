import { useState } from 'react';

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

  return (
    <>
      <span>{title}</span>
      <button onClick={handleInrease}>
        <i className='fas fa-plus-square'></i>
      </button>
      <span>{quentity}</span>
      <button onClick={handleDecrease}>
        <i className='fas fa-minus-square'></i>
      </button>
      <span>{price}원</span>
    </>
  );
}

export default Cart;
