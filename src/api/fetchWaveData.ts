// import { Order } from '../types';

const KOIGAURA_API_URL = 'https://marine-api.open-meteo.com/v1/marine?latitude=31.412205&longitude=131.343669&current=swell_wave_height&hourly=wave_height,swell_wave_height&timezone=Asia%2FTokyo';

export const fetchOrders = async () => {
  try {
    const response = await fetch(`${KOIGAURA_API_URL}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};