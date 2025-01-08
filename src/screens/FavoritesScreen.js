import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FavoriteScreen = ({ route }) => {
  const username = useSelector((state) => state.auth.username);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://172.20.10.10:3000/favorites/${username}`);
        setFavorites(response.data.favorites);
      } catch (err) {
        setError('An error occurred while importing favorites.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [username]);

  const handleDeleteFavorite = async (coinId) => {
    try {
      await axios.delete(`http://172.20.10.10:3000/favorites/${username}/${coinId}`);
      setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== coinId));
    } catch (err) {
      console.error('There was an error deleting a favorite:', err);
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{`Price: ${item.current_price}$`}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteFavorite(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}> 
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}> 
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderFavoriteItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272c35',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#39404a',
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: '#d0d0d0',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  error: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FavoriteScreen;
