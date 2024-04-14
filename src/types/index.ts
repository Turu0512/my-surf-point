export interface WaveData {
  time: string[];
  wave_height: number[];
  wave_direction: number[];
  wind_wave_height: number[];
  wind_wave_direction: number[];
  swell_wave_height: number[];
  swell_wave_direction: number[];
  // 他にもプロパティがある場合は追加します
}