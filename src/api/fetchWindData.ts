import { WindData } from '../types/wind'; // Assuming you have a WindData type
import { ErrorCode } from '../types/error';

export const fetchWindData = async (point: any): Promise<WindData | ErrorCode> => {
  const coords = process.env[`REACT_APP_${point.toUpperCase()}_COORDS`] ?? '000,000';

  const [latitude, longitude] = coords.split(',');

  const baseUrl = "https://api.open-meteo.com/v1/jma";

  const params = {
    latitude: latitude,
    longitude: longitude,
    hourly: ["wind_speed_10m", "wind_direction_10m"],
    wind_speed_unit: "ms",
    timezone: "Asia%2FTokyo"
  };

  const point_api_url = `${baseUrl}?latitude=${params.latitude}&longitude=${params.longitude}&hourly=${params.hourly.join(',')}&wind_speed_unit=${params.wind_speed_unit}&timezone=${params.timezone}`;

  if (longitude === '000') { return { error: true, code: 'INVALID_LONGITUDE', message: 'Invalid longitude' }; }
  try {
    const response = await fetch(`${point_api_url}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    const windData: WindData = responseData.hourly;
    return windData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};