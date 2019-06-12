import {
  GET_ITEMS_FETCHING_START,
  GET_ITEMS_FETCHING_SUCCEEDED,
  GET_ITEMS_FETCHING_FAILED,
  GET_ITEM_FETCHING_START,
  GET_ITEM_FETCHING_SUCCEEDED,
  GET_ITEM_FETCHING_FAILED,
} from './constants';

export const initialItemsState = {
  data: [],
  count: 0,
  page: 0,
  isFetching: false,
  isError: false,
  error: undefined,
};

export const itemsReducer = (state = initialItemsState, action) => {
  switch (action.type) {
    case GET_ITEMS_FETCHING_START:
      return { ...state, isFetching: true };
    case GET_ITEMS_FETCHING_SUCCEEDED:
      return {
        data: action.payload.items,
        count: action.payload.count,
        page: action.payload.page,
        isFetching: false,
        isError: false,
        error: undefined,
      };
    case GET_ITEMS_FETCHING_FAILED:
      return {
        ...state,
        isError: true,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const initialItemState = {
  data: {},
  isFetching: false,
  isError: false,
  error: undefined,
};

export const itemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case GET_ITEM_FETCHING_START:
      return { ...state, isFetching: true };
    case GET_ITEM_FETCHING_SUCCEEDED:
      return {
        data: action.payload,
        isFetching: false,
        isError: false,
        error: undefined,
      };
    case GET_ITEM_FETCHING_FAILED:
      return {
        ...state,
        isError: true,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
