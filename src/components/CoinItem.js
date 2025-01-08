import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const CoinItem = ({ coin, onPress }) => {
  const username = useSelector((state) => state.auth.username)

  const handlePress = async () => {
    try{
      const response = await fetch('http://172.20.10.10:3000/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, coin }),
        });
    if(response.ok) {
      const data = await response.json();
      Alert.alert("Added", "Added to Favorites!");
    }
    else{
      Alert.alert("Error", "Could not be added");
    }}
    catch(error){
      console.error(error);
      Alert.alert("Error", "There was an error connecting to the server.");
    }
  }

    
      
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: coin.image }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.heart}>
          <Text style={styles.name}>{coin.name}</Text>
          <Text style={styles.symbol}>{coin.symbol.toUpperCase()}</Text>
          {username && <Text><FontAwesome6 onPress={handlePress} name="heart-circle-plus" size={18} color="white" /></Text>}
        </View>
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
    fontSize : 8,
    marginRight : 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
  },
  heart : {
    display : 'flow-root'
  }
});

export default CoinItem;