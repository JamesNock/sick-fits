import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import AddToCart from './AddToCart';
import ErrorMessage from './ErrorMessage';
import LoggedInOnly from './LoggedInOnly';
import NotLoggedInOnly from './NotLoggedInOnly';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const AddToCartButtonStyles = styled.div`
  > button,
  a {
    background: var(--red);
    color: var(--offWhite);
    font-size: 1.5rem;
    padding: 1rem;
    border: 0;
    z-index: 2;
    margin-top: 2rem;
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { Product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>{Product.name} | Sick Fits</title>
      </Head>
      <img
        src={Product?.photo?.image?.publicUrlTransformed}
        alt={Product?.photo?.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
        <AddToCartButtonStyles>
          <LoggedInOnly>
            <AddToCart id={Product.id}>Add to Cart</AddToCart>
          </LoggedInOnly>
          <NotLoggedInOnly>
            <Link href="/signin">Sign in to to start shopping</Link>
          </NotLoggedInOnly>
        </AddToCartButtonStyles>
      </div>
    </ProductStyles>
  );
}
