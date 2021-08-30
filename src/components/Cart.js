import Product from './Product';

const info = [
  {
    id: 1,
    name: '책상',
    unityPrice: 30000,
  },
  {
    id: 2,
    name: '노트북',
    unityPrice: 3000000,
  },
  {
    id: 3,
    name: '마우스',
    unityPrice: 50000,
  },
];

function Cart() {
  return (
    <>
      {info.map((item) => (
        <Product info={item} />
      ))}
    </>
  );
}

export default Cart;
