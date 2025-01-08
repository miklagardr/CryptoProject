import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from './models/users.js';


const app = express();
app.use(bodyParser.json());
app.use(cors());



// MongoDB Bağlantısı
const MONGO_URI = 'mongodb+srv://emirc:Emir2211@cluster0.vwhsi9m.mongodb.net/cryptoproject?retryWrites=true&w=majority&appName=Cluster0'; // Yerel bağlantı
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB bağlantısı başarılı!'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));




// Basit Test Endpoint
app.get('/', (req, res) => {
  res.send({ message: "API çalışıyor!" });
});

// Sunucu Başlatma
const PORT = 3000;
const HOST = '172.20.10.10'; //http
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});


const SECRET_KEY = "your_secret_key"; // Güvenli bir anahtar belirleyin

 // MongoDB için oluşturduğumuz model

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kullanıcı kontrolü
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'Kullanıcı adı zaten var' });
    }

    // Şifreyi hashle ve yeni kullanıcı ekle
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).send({ message: 'Kayıt başarılı' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Sunucu hatası', error });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kullanıcı kontrolü
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }

    // JWT Token oluşturma
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.send({user,token, message: 'Giriş başarılı' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Sunucu hatası', error });
  }
});

app.post('/favorites', async (req, res) => {
  const { username, coin } = req.body;

  try {
    // Kullanıcıyı MongoDB'de bul
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).send({ message: 'Kullanıcı bulunamadı' });
    }

    // Favorilere ekleme
    if (!user.favorites.some(fav => fav.id === coin.id)) {
      user.favorites.push(coin);
      await user.save();
    }
    

    res.send({ favorites: user.favorites, message: 'Favorilere eklendi' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Sunucu hatası', error });
  }
});

app.get('/favorites/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Kullanıcıyı MongoDB'de bul
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).send({ message: 'Kullanıcı bulunamadı' });
    }

    res.send({ favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Sunucu hatası', error });
  }
});

app.delete('/favorites/:username/:coinId', async (req, res) => {
  const { username, coinId } = req.params;

  try {
    // Kullanıcıyı MongoDB'de bul
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: 'Kullanıcı bulunamadı' });
    }

    // Favoriler listesinden ilgili coin'i sil
    const updatedFavorites = user.favorites.filter(fav => fav.id !== coinId);
    user.favorites = updatedFavorites;

    // Değişiklikleri kaydet
    await user.save();

    res.send({ message: 'Favori başarıyla silindi', favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Sunucu hatası', error });
  }
});