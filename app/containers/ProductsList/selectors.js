import { createSelector } from 'reselect';
import { GOODS_REDUCER_NAME, CURRENT_ITEM_REDUCER_NAME } from './constants';
import { initialItemsState, initialItemState } from './reducers';

const findGoods = state => state.get(GOODS_REDUCER_NAME, initialItemsState);
const findItem = state =>
  state.get(CURRENT_ITEM_REDUCER_NAME, initialItemState);

const selectGoods = createSelector(
  findGoods,
  items => items,
);

const selectCurrentItem = createSelector(
  findItem,
  item => item,
);

export { selectGoods, selectCurrentItem };
