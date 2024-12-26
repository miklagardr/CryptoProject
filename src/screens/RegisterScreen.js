import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        Alert.alert("Başarılı", "Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
        navigation.navigate('Login');
      } else {
        Alert.alert("Hata", "Bu kullanıcı adı zaten kullanılıyor.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
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
      <Button title="Kayıt Ol" onPress={handleRegister} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Zaten bir hesabınız var mı? Giriş yapın.
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