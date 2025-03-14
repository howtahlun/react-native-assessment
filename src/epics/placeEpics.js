// src/epics/placeEpics.js

import { ofType } from 'redux-observable';
import { mergeMap, debounceTime, delay, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import axios from 'axios';
import {
  SEARCH_PLACES_REQUEST,
  FETCH_PLACE_DETAILS_REQUEST,
} from '../actions/types';
import {
  searchPlacesSuccess,
  searchPlacesFailure,
  fetchPlaceDetailsSuccess,
  fetchPlaceDetailsFailure,
} from '../actions/placeActions';
const API_KEY = 'YOUR_GOOGLE_API_KEY_HERE'; 
const API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

export const searchPlacesEpic = (action$) =>
  action$.pipe(
    ofType(SEARCH_PLACES_REQUEST),
    debounceTime(500), 
    mergeMap((action) =>
      axios
        .get(API_URL, {
          params: {
            input: action.payload,
            key: API_KEY,
          },
        })
        .then((response) =>
          searchPlacesSuccess({ query: action.payload, places: response.data.predictions })
        )
        .catch((error) => searchPlacesFailure({ error: error.message }))
    )
  );

export const fetchPlaceDetailsEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_PLACE_DETAILS_REQUEST),
    mergeMap((action) =>
      axios
        .get('https://maps.googleapis.com/maps/api/place/details/json', {
          params: {
            place_id: action.payload,
            key: API_KEY, 
          },
        })
        .then((response) =>
          fetchPlaceDetailsSuccess({ details: response.data.result })
        )
        .catch((error) =>
          fetchPlaceDetailsFailure({ error: error.message })
        )
    )
  );
