import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { fetchTideData } from '../../api/fetchTideData';


export default function Chart() {

  const [tideData, setTideData] = useState(null);
  const currentDate = new Date(); // 現在の日付を取得

  useEffect(() => {
    const loadData = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // JavaScriptの月は0から始まるため、+1をします
        const day = currentDate.getDate();
        // const data = await fetchTideData(year, month, day);
        // setTideData(data);
      } catch (error) {
        console.error('Failed to fetch tide data:', error);
      }
    };
    loadData();
  }, []);

  return (
    <React.Fragment>
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img style={{ height: '100%', objectFit: 'contain' }} src="https://api.tide736.net/tide_image.php?pc=28&hc=9&yr=2024&mn=5&dy=2&rg=day&w=768&h=512&lc=blue&gcs=cyan&gcf=blue&ld=on&ttd=on&tsmd=on" alt="Tide chart" />
      </div>
    </React.Fragment>
  );
}


