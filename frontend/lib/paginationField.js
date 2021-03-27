import { formatRelativeWithOptions } from 'date-fns/fp';
import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false /* tells apollo that we will take care of everything */,
    read(existing = [], { args, cache }) {
      /* first thing it does is asks the read function for those items */
      const { skip, first } = args;
      /* Read number of items on the page from the cache */
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pageCnt = Math.ceil(count / first);

      /* Check if we have existing items */
      const items = existing.slice(skip, skip + first).filter((x) => x);
      /* if there are items and there aren't enough to satisfy how many were requested
      and we are on the last page then just send it */
      if (items.length && items.length !== first && page === pageCnt)
        return items;

      if (items.length !== first) {
        /* we don't have any items, we must go to the network to fetch them */
        return false;
      }
      /* We have items, so return them from cache */
      if (items.length) return items;
      /*  go to the network to fetch them */
      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      /* This runs when apollo client comes back from network with our products */
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
