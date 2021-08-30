import styled from 'styled-components';

const DetailComponent = styled.div`
  display: ${({ isDisplayNone }) => (isDisplayNone ? 'none' : 'block')};
  position: fixed;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.2);
`;

function ProductDetail({ detailProduct, setDetailProduct }) {
  const isDisplayNone = detailProduct === null;
  return (
    <DetailComponent isDisplayNone={isDisplayNone}>
      {JSON.stringify(detailProduct)}
      <button onClick={() => setDetailProduct(null)}>X</button>
    </DetailComponent>
  );
}

export default ProductDetail;
