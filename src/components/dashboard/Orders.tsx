import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { fetchWaveData } from '../../api/fetchWaveData';
import { WaveData } from '../../types/wave';
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
  const { point } = useParams() || 'POINT1';
  const pointName = process.env[`REACT_APP_${point!.toUpperCase()}_POINT`] ?? 'ポイント情報が正しくありません';


  useEffect(() => {
    const getOrders = async () => {
      try {
        console.log(point);
        const ordersData = await fetchWaveData(point);
        setWaveData(ordersData);
        console.log(ordersData);
      } catch (error) {
        console.error(error);
      }
    };

    getOrders();
  }, [point]);

  return (
    <React.Fragment>
      <Title>{pointName}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>時間</TableCell>
            <TableCell>波の高さ</TableCell>
            <TableCell>波の向き</TableCell>
            <TableCell>うねりの高さ</TableCell>
            <TableCell>うねりの向き</TableCell>
            <TableCell>風波</TableCell>
            <TableCell>風波の向き</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {waveData && 'time' in waveData && waveData.time && waveData.time.map((time, index) => {
          // 3時間おきにデータを出力するために、インデックスが3で割り切れる場合のみ行を生成
          if (index % 3 === 0) {
            return (
              <TableRow key={time}>
                <TableCell>{time}</TableCell>
                <TableCell>{waveData.wave_height[index]}</TableCell>
                <TableCell>{getDirectionFromAngle(waveData.wave_direction[index])}°</TableCell>
                <TableCell>{waveData.swell_wave_height[index]}</TableCell>
                <TableCell>{getDirectionFromAngle(waveData.swell_wave_direction[index])}°</TableCell>
                <TableCell>{waveData.wind_wave_height[index]}</TableCell>
                <TableCell>{getDirectionFromAngle(waveData.wind_wave_direction[index])}°</TableCell>
              </TableRow>
            );
          }
          return null;
        })}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
