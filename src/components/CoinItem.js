import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

const CoinItem = ({ coin, onPress }) => {
  const username = useSelector((state) => state.auth.username)
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: coin.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{coin.name}</Text>
        <Text style={styles.symbol}>{coin.symbol.toUpperCase()}</Text>
        {username && <Text>KALP</Text>}
      </View>
      <Text style={styles.price}>${coin.current_price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#red',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
  },
  symbol: {
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
  },
});

export default CoinItem;