// src/reducers/placesReducer.js

import {
  SEARCH_PLACES_REQUEST,
  SEARCH_PLACES_SUCCESS,
  SEARCH_PLACES_FAILURE,
  SELECT_PLACE,
  FETCH_PLACE_DETAILS_SUCCESS,
  FETCH_PLACE_DETAILS_FAILURE,
} from '../actions/types';

const initialState = {
  loading: false,
  places: [],
  searchHistory: [],
  error: null,
  selectedPlace: null,
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PLACES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_PLACES_SUCCESS:
      return {
        ...state,
        loading: false,
        places: action.payload.places,
        searchHistory: [...state.searchHistory, action.payload.query],
      };
    case SEARCH_PLACES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SELECT_PLACE:
      return {
        ...state,
        selectedPlace: action.payload,
      };
    case FETCH_PLACE_DETAILS_SUCCESS:
      return {
        ...state,
        selectedPlace: action.payload.details,
      };
    case FETCH_PLACE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default placesReducer;
