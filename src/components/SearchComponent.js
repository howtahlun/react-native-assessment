// src/components/SearchComponent.js

import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { InputItem, List, ActivityIndicator } from '@ant-design/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchPlaceRequest } from '../actions/searchActions';

const SearchComponent = ({ onPlaceSelect }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { suggestions, loading } = useSelector((state) => state.search);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.length >= 3) { // trigger search after 3 characters
      dispatch(searchPlaceRequest(value));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPlaceSelect(item)}>
      <List.Item>{item.description}</List.Item>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 10 }}>
      <InputItem
        value={query}
        onChange={handleSearch}
        placeholder="Search for a place"
      />
      {loading && <ActivityIndicator animating />}
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SearchComponent;
