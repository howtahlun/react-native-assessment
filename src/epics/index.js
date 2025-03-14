// src/epics/index.js

import { combineEpics } from 'redux-observable';
import { searchPlacesEpic,fetchPlaceDetailsEpic } from './placeEpics';

const rootEpic = combineEpics(
  searchPlacesEpic,
  fetchPlaceDetailsEpic
);

export default rootEpic;
