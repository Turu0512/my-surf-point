import { WaveData } from '../types/wave';
import { ErrorCode } from '../types/error';

export const fetchWaveData = async (point:any): Promise<WaveData | ErrorCode> => {

  const coords = process.env[`REACT_APP_${point.toUpperCase()}_COORDS`] ?? '000,000';

  const [latitude, longitude] = coords.split(',');

  const baseUrl = "https://marine-api.open-meteo.com/v1/marine";

  const params = {
    latitude: latitude,
    longitude: longitude,
    current: "swell_wave_height",
    hourly: ["wave_height", "wave_direction", "wind_wave_height", "wind_wave_direction", "swell_wave_height", "swell_wave_direction"],
    timezone: "Asia%2FTokyo"
  };

const point_api_url = `${baseUrl}?latitude=${params.latitude}&longitude=${params.longitude}&current=${params.current}&hourly=${params.hourly.join(',')}&timezone=${params.timezone}`;

  if (longitude === '000') {return { error: true, code: 'INVALID_LONGITUDE', message: 'Invalid longitude' };  }
  try {
    console.log(point_api_url);
    const response = await fetch(`${point_api_url}`);
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