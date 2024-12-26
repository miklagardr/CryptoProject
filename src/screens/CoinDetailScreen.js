import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { LineChart } from 'react-native-chart-kit';
import { getCoinHistory } from '../api/coinApi';

const CoinDetailScreen = ({ route }) => {
  const { coinId } = route.params;
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7); // Default 1 week

  useEffect(() => {
    fetchCoinHistory();
  }, [timeRange]);

  const fetchCoinHistory = async () => {
    setLoading(true);
    const data = await getCoinHistory(coinId, timeRange);
    setHistory(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const prices = history.prices.map((item) => item[1]);
  const labels = history.prices.map((item, index) =>
    index % Math.floor(prices.length / 5) === 0 ? new Date(item[0]).toLocaleDateString() : ''
  );

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(500)} exiting={FadeOut.duration(300)}>
      <Text style={styles.title}>Coin Price History</Text>
      <Text style={styles.coin1}>{coinId.toUpperCase()}</Text>
      <Animated.View layout={Layout.springify()}>
      <LineChart
      verticalLabelRotation={70}
  data={{
    labels,
    datasets: [
      {
        data: prices,
        color: (opacity = 1) =>
          prices[0] > prices[prices.length - 1]
            ? `rgba(255, 99, 132, ${opacity})` // Kırmızı ton (ilk fiyat daha pahalı)
            : `rgba(99, 255, 132, ${opacity})`, // Yeşil ton (ilk fiyat daha ucuz)
        strokeWidth: 3, // Çizgi kalınlığı
      },
    ],
    legend: ['Price (USD)'], // Başlık
  }}
  width={Dimensions.get('window').width - 25}
  height={400}
  yAxisLabel="$"
  chartConfig={{
    backgroundColor: '#272c35',
    backgroundGradientFrom: '#272c35',
    backgroundGradientTo: '#272c35',
    decimalPlaces: prices[0] < 0.01 ? 8 : 2,
    color: (opacity = 1) => `rgba(39, 44, 53 ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '0', // Noktaları kaldırıyoruz
    },
  }}
  bezier
  style={styles.chart}
/>
      </Animated.View>
      <View style={styles.rangeSelector}>
        <Text onPress={() => setTimeRange(7)} style={styles.rangeButton}>
          1W
        </Text>
        <Text onPress={() => setTimeRange(30)} style={styles.rangeButton}>
          1M
        </Text>
        <Text onPress={() => setTimeRange(365)} style={styles.rangeButton}>
          1Y
        </Text>
      </View>
    </Animated.View>
  );
};

// const CoinDetailScreen = ({ route }) => {
//     const { coinId } = route.params;
//     const [history, setHistory] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [timeRange, setTimeRange] = useState(7); // Default 1 week
  
//     useEffect(() => {
//       fetchCoinHistory();
//     }, [timeRange]);
  
//     const fetchCoinHistory = async () => {
//       setLoading(true);
//       const data = await getCoinHistory(coinId, timeRange);
//       setHistory(data);
//       setLoading(false);
//     };
  
//     // Fiyatları işleyen yardımcı fonksiyon
//     const formatPrice = (price) => {
//       if (price < 0.01) return price.toFixed(8); // Küçük fiyatları 6 ondalık basamak ile göster
//       return price.toFixed(2); // Diğerlerini 2 ondalık basamak ile göster
//     };
  
//     if (loading) {
//       return (
//         <View style={styles.loader}>
//           <ActivityIndicator size="large" />
//         </View>
//       );
//     }
  
//     const prices = history.prices.map((item) => formatPrice(item[1]));
//     const labels = history.prices.map((item, index) =>
//       index % Math.floor(prices.length / 5) === 0 ? new Date(item[0]).toLocaleDateString() : ''
//     );
  
//     return (
//       <Animated.View style={styles.container} entering={FadeIn.duration(500)} exiting={FadeOut.duration(300)}>
//         <Text style={styles.title}>Coin Price History</Text>
//         <Text>{coinId.toUpperCase()}</Text>
//         <Animated.View layout={Layout.springify()}>
//           <LineChart
//             data={{
//               labels,
//               datasets: [
//                 {
//                   data: prices,
//                   color: (opacity = 1) =>
//                     prices[0] > prices[prices.length - 1]
//                       ? `rgba(255, 99, 132, ${opacity})` // Kırmızı ton (ilk fiyat daha pahalı)
//                       : `rgba(99, 255, 132, ${opacity})`, // Yeşil ton (ilk fiyat daha ucuz)
//                   strokeWidth: 3, // Çizgi kalınlığı
//                 },
//               ],
//               legend: ['Price (USD)'], // Başlık
//             }}
//             width={Dimensions.get('window').width - 20}
//             height={250}
//             yAxisLabel="$"
//             chartConfig={{
//               backgroundColor: '#f5f7fa',
//               backgroundGradientFrom: '#e8f1f8',
//               backgroundGradientTo: '#ffffff',
//               decimalPlaces: 6, // Küçük değerleri daha hassas göstermek için
//               color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
//               labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//               style: {
//                 borderRadius: 16,
//               },
//               propsForDots: {
//                 r: '0', // Noktaları kaldırıyoruz
//               },
//             }}
//             bezier
//             style={styles.chart}
//           />
//         </Animated.View>
//         <View style={styles.rangeSelector}>
//           <Text onPress={() => setTimeRange(7)} style={styles.rangeButton}>
//             1W
//           </Text>
//           <Text onPress={() => setTimeRange(30)} style={styles.rangeButton}>
//             1M
//           </Text>
//           <Text onPress={() => setTimeRange(365)} style={styles.rangeButton}>
//             1Y
//           </Text>
//         </View>
//       </Animated.View>
//     );
//   };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#272c35',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  coin1: {
    fontSize: 30,
    marginBottom: 10,
    color: 'yellow',
  },
  chart: {
    marginVertical: 20,
    color: '#272c35',
  },
  rangeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  rangeButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272c35',
  },
});

export default CoinDetailScreen;