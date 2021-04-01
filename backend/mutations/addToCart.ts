import { KeystoneContext } from '@keystone-next/types';
import { Session } from '../types';
import { CartItem } from '../schemas/CartItem';
import { CartItemCreateInput } from '../.keystone/schema-types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('adding to cart...');
  /* 1. query current user to check if they are signed in */
  const sess = context.session as Session; /* 'as Session' is to check against typescript type of 'Session' */
  if (!sess.itemId) {
    throw new Error('You must be logged in to do this');
  }
  /* 2. query the current user's cart */
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sess.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  });
  console.log(allCartItems);
  const [existingCartItem] = allCartItems;
  console.log(existingCartItem);
  /* 3. check if item that is being added already exists in the cart */
  if (existingCartItem) {
    /* 3a. if it is then increment by 1 */
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!`
    );
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  /* 3b. else add the new item to the cart */
  console.log('adding new item');
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sess.itemId } },
    },
  });
}

export default addToCart;
