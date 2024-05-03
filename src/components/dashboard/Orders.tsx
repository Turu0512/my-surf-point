import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { fetchWaveData } from '../../api/fetchWaveData';
import { fetchWindData } from '../../api/fetchWindData';
import { WaveData } from '../../types/wave';
import { WindData } from '../../types/wind'; // Assuming you have a WindData type
import { ErrorCode } from '../../types/error';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

function getDirectionFromAngle(angle: number): string {
  const directions = [
    '北', '北北東', '北東', '東北東',
    '東', '東南東', '南東', '南南東',
    '南', '南南西', '南西', '西南西',
    '西', '西北西', '北西', '北北西'
  ];
  const index = Math.round(angle / 22.5) % 16;
  return directions[index];
}


export default function Orders() {
  const [waveData, setWaveData] = useState<WaveData | ErrorCode>();
  const [windData, setWindData] = useState<WindData | ErrorCode>();
  const { point } = useParams() || 'POINT1';
  const pointName = process.env[`REACT_APP_${point!.toUpperCase()}_POINT`] ?? 'ポイント情報が正しくありません';
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

   // 日付ごとのデータを抽出
  const dates: string[] = [];
// waveData が undefined でなく、WaveData 型のインスタンスであるかを確認
  if (waveData && 'time' in waveData) {  // 型ガードを追加
    for (const timestamp of waveData.time) {
      const date = timestamp.split('T')[0];
      if (!dates.includes(date)) {
        dates.push(date);
      }
    }
  }

  useEffect(() => {
    const getOrders = async () => {
      try {
        console.log(point);
        const waveDataList = await fetchWaveData(point);
        const windsDataList = await fetchWindData(point);
        setWaveData(waveDataList);
        setWindData(windsDataList);
        console.log(waveDataList);
        console.log(windsDataList);
      } catch (error) {
        console.error(error);
      }
    };

    getOrders();
  }, [point]);

  return (
    <React.Fragment>
      <Title>{pointName}</Title>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="wave data tabs">
          {dates.map((date, index) => (
            <Tab label={date} key={index} />
          ))}
          <Tab label="週間予報" />
        </Tabs>
      </Box>
      {dates.map((date, index) => (
        <div role="tabpanel" hidden={value !== index} key={index}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>時間</TableCell>
                <TableCell>波の向き</TableCell>
                <TableCell>うねりの高さ</TableCell>
                <TableCell>風速(m/s)</TableCell>
                <TableCell>風向き</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waveData && 'time' in waveData && waveData.time && waveData.time.map((time, idx) => {
                if (time.startsWith(date)) {
                  return (
                    <TableRow key={idx}>
                      <TableCell>{time.split('T')[1]}</TableCell>
                      <TableCell>{waveData.swell_wave_height[idx]}</TableCell>
                      <TableCell>{waveData.swell_wave_direction[idx]}</TableCell>
                      {windData && 'time' in windData && windData.time[idx] === time && (
                        <>
                          <TableCell>{windData.wind_speed_10m[idx]}</TableCell>
                          <TableCell>{getDirectionFromAngle(windData.wind_direction_10m[idx])}°</TableCell>
                        </>
                      )}
                    </TableRow>
                  );
                }
                return null;
              })}
            </TableBody>
          </Table>
        </div>
      ))}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>時間</TableCell>
              <TableCell>波の向き</TableCell>
              <TableCell>うねりの高さ</TableCell>
              <TableCell>風速(m/s)</TableCell>
              <TableCell>風向き</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {waveData && 'time' in waveData && waveData.time && waveData.time.map((time, index) => {
            // 3時間おきにデータを出力するために、インデックスが3で割り切れる場合のみ行を生成
            if (index % 3 === 0) {
              return (
                <TableRow key={time}>
                  <TableCell>{time}</TableCell>
                  <TableCell>{waveData.swell_wave_height[index]}</TableCell>
                  <TableCell>{getDirectionFromAngle(waveData.swell_wave_direction[index])}°</TableCell>
                  {windData && 'time' in windData && windData.time[index] === time && (
                    <>
                      <TableCell>{windData.wind_speed_10m[index]}</TableCell>
                      <TableCell>{getDirectionFromAngle(windData.wind_direction_10m[index])}°</TableCell>
                    </>
                  )}
                </TableRow>
              );
            }
            return null;
          })}
          </TableBody>
        </Table>
      </Box>
    </React.Fragment>
  );
}
