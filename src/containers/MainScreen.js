// src/containers/MainScreen.js

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import { InputItem, List } from '@ant-design/react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { searchPlaces, selectPlace, fetchPlaceDetails } from '../actions/placeActions';

const MainScreen = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const { loading, places, searchHistory, error, selectedPlace } = useSelector((state) => state.places);

  useEffect(() => {
    if (query.trim().length > 2) {
      const delayDebounceFn = setTimeout(() => {
        dispatch(searchPlaces(query));
        Keyboard.dismiss();
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [query, dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <List>
          <InputItem
            clear
            placeholder="Enter place name here..."
            value={query}
            onChange={(value) => setQuery(value)}
          >
            Search
          </InputItem>
        </List>

        {loading && <ActivityIndicator/>}
        {error && <Text style={styles.errorText}>{error}</Text>}

        <List renderHeader="Search Results">
          {places.map((place, index) => (
            <List.Item
              key={index}
              onPress={() => dispatch(fetchPlaceDetails(place.place_id))}
            >
              {place.description}
            </List.Item>
          ))}
        </List>

        <List renderHeader="Search History">
          {searchHistory.map((item, index) => (
            <List.Item key={index}>
              {item}
            </List.Item>
          ))}
        </List>
        
        {selectedPlace &&
          selectedPlace.geometry &&
          selectedPlace.geometry.location && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: selectedPlace.geometry.location.lat,
                longitude: selectedPlace.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: selectedPlace.geometry.location.lat,
                  longitude: selectedPlace.geometry.location.lng,
                }}
                title={selectedPlace.name}
              />
            </MapView>
          )}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  map: { width: '100%', height: 300, marginTop: 20 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
});

export default MainScreen;
