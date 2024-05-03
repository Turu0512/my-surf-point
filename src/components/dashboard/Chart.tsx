import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import Title from './Title';


export default function Chart() {
  return (
    <React.Fragment>
      <Title>Today</Title>
      <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} src="https://api.tide736.net/tide_image.php?pc=28&hc=9&yr=2024&mn=5&dy=2&rg=day&w=768&h=512&lc=blue&gcs=cyan&gcf=blue&ld=on&ttd=on&tsmd=on" alt="Tide chart" />
      </div>
    </React.Fragment>
  );
}

