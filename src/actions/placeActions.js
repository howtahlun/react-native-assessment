// src/actions/placeActions.js

import {
  SEARCH_PLACES_REQUEST,
  SEARCH_PLACES_SUCCESS,
  SEARCH_PLACES_FAILURE,
  SELECT_PLACE,
  FETCH_PLACE_DETAILS_REQUEST,
  FETCH_PLACE_DETAILS_SUCCESS,
  FETCH_PLACE_DETAILS_FAILURE,
} from './types';

export const searchPlaces = (query) => ({
  type: SEARCH_PLACES_REQUEST,
  payload: query,
});

export const searchPlacesSuccess = ({ query, places }) => ({
  type: SEARCH_PLACES_SUCCESS,
  payload: { query, places },
});

export const searchPlacesFailure = ({ error }) => ({
  type: SEARCH_PLACES_FAILURE,
  payload: { error },
});

export const selectPlace = (place) => ({
  type: SELECT_PLACE,
  payload: place,
});

export const fetchPlaceDetails = (placeId) => ({
  type: FETCH_PLACE_DETAILS_REQUEST,
  payload: placeId,
});

export const fetchPlaceDetailsSuccess = ({ details }) => ({
  type: FETCH_PLACE_DETAILS_SUCCESS,
  payload: { details },
});

export const fetchPlaceDetailsFailure = ({ error }) => ({
  type: FETCH_PLACE_DETAILS_FAILURE,
  payload: { error },
});