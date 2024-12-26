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
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Başarılı", "Giriş yapıldı!");
        console.log(data)
        dispatch(login(data.user.username)) 
        navigation.navigate("Home")
        console.log("Token:", data.token);
        // Token ile işlemleri devam ettirin
      } else {
        Alert.alert("Hata", "Kullanıcı adı veya şifre hatalı!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Register')}
      >
        Hesabınız yok mu? Kayıt olun.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 16 },
  input: { borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4 },
  link: { textAlign: 'center', color: 'blue', marginTop: 8 },
});