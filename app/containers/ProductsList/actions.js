import {
  GET_ITEM,
  GET_ITEMS_FETCHING_START,
  GET_ITEMS_FETCHING_FAILED,
  GET_ITEMS_FETCHING_SUCCEEDED,
  GET_ITEMS,
  GET_ITEM_FETCHING_FAILED,
  GET_ITEM_FETCHING_START,
  GET_ITEM_FETCHING_SUCCEEDED,
} from './constants';

export const getItems = (limit, page) => ({
  type: GET_ITEMS,
  payload: {
    limit,
    page,
  },
});

export const getItemsStart = () => ({
  type: GET_ITEMS_FETCHING_START,
});

export const getItemsFailed = payload => ({
  type: GET_ITEMS_FETCHING_FAILED,
  payload,
});

export const getItemsSucceeded = payload => ({
  type: GET_ITEMS_FETCHING_SUCCEEDED,
  payload,
});

export const getItem = itemId => ({
  type: GET_ITEM,
  payload: itemId,
});

export const getItemStart = () => ({
  type: GET_ITEM_FETCHING_START,
});

export const getItemFailed = payload => ({
  type: GET_ITEM_FETCHING_FAILED,
  payload,
});

export const getItemSucceeded = payload => ({
  type: GET_ITEM_FETCHING_SUCCEEDED,
  payload,
});
