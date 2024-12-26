import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator , Button , Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import CoinItem from '../components/CoinItem';
import { getCoins } from '../api/coinApi';
import { useSelector , useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const HomeScreen = ({ navigation }) => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 
  const username = useSelector((state) => state.auth.username); 
  console.log(username)

  useEffect(() => {
    loadCoins();
  }, [page]);

  const loadCoins = async () => {
    setLoading(true);
    const newCoins = await getCoins(page);
    setCoins((prevCoins) => [...prevCoins, ...newCoins]);
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (!loading) setPage((prevPage) => prevPage + 1);
  };

  const handleLogout = () => {
    dispatch(logout())
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {!username ? <View style={styles.buttons}>
        <Button color='grey'  title='Register' onPress={() => {navigation.navigate('Register')}}/>
        <Button   color='grey' title='Login' onPress={() => {navigation.navigate('Login')}}/>
        
      </View> : 
        <View>
          <Text style={styles.username}>{username}</Text>
          <Button title='Logout' onPress={handleLogout}/>
        </View>
      }
      <SearchBar value={search} onChangeText={(text) => setSearch(text)} />
        
      <FlatList
        data={filteredCoins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CoinItem
            coin={item}
            onPress={() => navigation.navigate('Detail', { coinId: item.id })}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272c35',
    borderColor: '#272c35', 
    borderTopWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    color:'red',
  },
  username:{
    display : 'flex', 
    justifyContent : 'end', 
    color : 'white', 
    fontSize : 30,
    
  }
});

export default HomeScreen;