import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); 

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.20.10.10:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Successful", "Login done!");
        console.log(data)
        dispatch(login(data.user.username)) 
        navigation.navigate("Home")
      } else {
        Alert.alert("Error", "Username or password incorrect!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error connecting to the server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Register')}
      >
        Don't have an account? Register now.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 , backgroundColor: '#272c35', },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 16 , color:"white" },
  input: { borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4  , backgroundColor : "white"},
  link: { textAlign: 'center', color: 'blue', marginTop: 8 },
});