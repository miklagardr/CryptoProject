import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';

export const getCoins = async (page = 1, perPage = 20) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCoinHistory = async (coinId, days = 7) => {
  try {
    // https://api.coingecko.com/api/v3/ping?x_cg_demo_api_key=YOUR_API_KEY
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?x_cg_demo_api_key=CG-yWwPuVSnRb5G3rxPFWqpZGoC`,
      {
        params: {
          vs_currency: 'usd',
          days,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};