import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';
import LoggedInOnly from './LoggedInOnly';
import NotLoggedInOnly from './NotLoggedInOnly';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <Link href={`/product/${product.id}`}>
        <img
          src={product?.photo?.image?.publicUrlTransformed}
          alt={product.name}
        />
      </Link>
      <Title>
        <Link href={`/product/${product.id}`}>{product?.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <LoggedInOnly>
          <Link href={{ pathname: '/update', query: { id: product.id } }}>
            Edit
          </Link>
          <AddToCart id={product.id}>Add to Cart</AddToCart>
          <DeleteProduct id={product.id}>Delete</DeleteProduct>
        </LoggedInOnly>
        <NotLoggedInOnly>
          <Link href="/signin">Sign in to start shopping</Link>
        </NotLoggedInOnly>
      </div>
    </ItemStyles>
  );
}
