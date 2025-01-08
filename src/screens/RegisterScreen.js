import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';


export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://172.20.10.10:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        Alert.alert("Successful", "Registration successful! You can log in now.");
        navigation.navigate('Login');
      } else {
        Alert.alert("Error", "This username is already in use.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error connecting to the server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Sign in
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 ,  backgroundColor: '#272c35',},
  title: { fontSize: 24, textAlign: 'center', marginBottom: 16, color : "white"},
  input: { borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4 , backgroundColor : "white"},
  link: { textAlign: 'center', color: 'blue', marginTop: 8 },
});