// src/components/MapComponent.js

import React from 'react';
import { Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({ place }) => {
  // If the autocomplete result does not have geometry, we simulate it.
  const initialRegion = {
    latitude: place?.geometry?.location?.lat || 37.78825,
    longitude: place?.geometry?.location?.lng || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView style={{ width: Dimensions.get('window').width, height: 300 }} region={initialRegion}>
      {place && place.geometry && place.geometry.location && (
        <Marker
          coordinate={{
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          }}
          title={place.description}
        />
      )}
    </MapView>
  );
};

export default MapComponent;
