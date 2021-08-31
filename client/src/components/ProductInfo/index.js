import styled from 'styled-components';
import addComma from '../../util/addComma';

const InfoComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > img {
    width: 200px;
    height: 200px;
  }
`;

function ProductInfo({ info, onClick }) {
  const { imgLink, title, price } = info;

  return (
    <InfoComponent onClick={onClick}>
      <img src={imgLink} />
      <div className='info-description'>
        <span>{title}</span>
        <span>{addComma(price)}원</span>
      </div>
    </InfoComponent>
  );
}

export default ProductInfo;
