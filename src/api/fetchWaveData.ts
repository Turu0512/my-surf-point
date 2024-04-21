import { WaveData } from '../types/wave';
import { ErrorCode } from '../types/error';

const point = 'POINT1'; // これは選択または入力によって動的に変更されることがあります。
const coords = process.env[`REACT_APP_${point}_COORDS`] ?? '000,000';
console.log(coords)

const [latitude, longitude] = coords.split(',');

const KOIGAURA_API_URL = 'https://marine-api.open-meteo.com/v1/marine?latitude=31.412205&longitude=131.343669&current=swell_wave_height&hourly=wave_height,wave_direction,wind_wave_height,wind_wave_direction,swell_wave_height,swell_wave_direction&timezone=Asia%2FTokyo';

export const fetchWaveData = async (): Promise<WaveData | ErrorCode> => {
  if (longitude === '000') {return { error: true, code: 'INVALID_LONGITUDE', message: 'Invalid longitude' };  }
  try {
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