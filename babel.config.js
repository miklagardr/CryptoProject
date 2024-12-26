module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Mevcut Expo ön ayarı
    plugins: ['react-native-reanimated/plugin'], // Reanimated eklentisi
  };
};