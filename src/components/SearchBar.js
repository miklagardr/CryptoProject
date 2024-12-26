import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const SearchBar = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search coins..."
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 8,
    color:'white',
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default SearchBar;