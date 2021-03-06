import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import ErrorMessage from './ErrorMessage';
import PaginationStyles, {
  PaginationContainerStyles,
} from './styles/PaginationStyles';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationContainerStyles>
      <PaginationStyles>
        <Head>
          <title>
            Sick Fits - Page {page} of {pageCount}
          </title>
        </Head>
        <Link href={`/products/${page - 1}`}>
          <a aria-disabled={page < 2}>&lt; Prev</a>
        </Link>
        <p>
          Page {page} of {pageCount}
        </p>
        <p>{count} Items Total</p>
        <Link href={`/products/${page + 1}`}>
          <a aria-disabled={page == pageCount}>Next &gt;</a>
        </Link>
      </PaginationStyles>
    </PaginationContainerStyles>
  );
}
