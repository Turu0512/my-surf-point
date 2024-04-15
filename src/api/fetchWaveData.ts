import { WaveData } from '../types/index';
import { fetchWeatherApi } from 'openmeteo';

const params = {
	"latitude": 31.4033,
	"longitude": 131.3417,
	"current": "swell_wave_height",
	"hourly": ["wave_height", "wave_direction", "wind_wave_height", "wind_wave_direction", "swell_wave_height", "swell_wave_direction"],
	"timezone": "Asia/Tokyo"
};
const url = "https://marine-api.open-meteo.com/v1/marine";

const KOIGAURA_API_URL = 'https://marine-api.open-meteo.com/v1/marine?latitude=31.412205&longitude=131.343669&current=swell_wave_height&hourly=wave_height,wave_direction,wind_wave_height,wind_wave_direction,swell_wave_height,swell_wave_direction&timezone=Asia%2FTokyo';

export const fetchWaveData = async ():Promise<WaveData> => {
  try {
    const responses = await fetchWeatherApi(url, params);

    const response = await fetch(`${KOIGAURA_API_URL}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    const waveData: WaveData = responseData.hourly;
    return waveData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};