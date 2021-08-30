import styled from 'styled-components';
import addComma from '../../util/addComma';

const InfoComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    width: 200px;
    height: 200px;
  }
`;

function ProductInfo({ info }) {
  const { img, name, price } = info;

  return (
    <InfoComponent>
      <img src={img} alt='product-img' />
      <div className='info-description'>
        <span>{name}</span>
        <span>{addComma(price)}원</span>
      </div>
    </InfoComponent>
  );
}

export default ProductInfo;
