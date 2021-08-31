import styled from 'styled-components';

import ProductInfo from '../ProductInfo';
import ProductDetail from '../ProductDetail';
import { useEffect, useState } from 'react';
import useApiCall from '../../hooks/useApiCall';

const ListComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: calc(100vh - 100px);
  font-size: 1.5rem;
`;

function ProductList() {
  const [detailProduct, setDetailProduct] = useState(null);
  const [productList, setProductList] = useState(null);
  const [payload, loading, error, fetchData] = useApiCall(
    'http://localhost:4000/product'
  );

  useEffect(() => {
    setProductList(payload);
  }, [payload]);

  if (loading) {
    return <>로딩 중...</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  if (!productList) {
    return <></>;
  }

  return (
    <ListComponent>
      {productList.map((info) => (
        <ProductInfo
          key={info._id}
          info={info}
          onClick={() => setDetailProduct(info)}
        />
      ))}
      {detailProduct !== null && (
        <ProductDetail
          detailProduct={detailProduct}
          setDetailProduct={setDetailProduct}
          productList={productList}
          setProductList={setProductList}
          fetchData={fetchData}
        />
      )}
    </ListComponent>
  );
}

export default ProductList;
