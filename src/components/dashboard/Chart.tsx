import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchTideData } from '../../api/fetchTideData';

export default function Chart() {
  const { point = 'POINT1' } = useParams<{ point?: string }>();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const pc = process.env[`REACT_APP_${point.toUpperCase()}_PC`] || '28';
    const hc = process.env[`REACT_APP_${point.toUpperCase()}_HC`] || '9';
    const data = fetchTideData(year, month, day);
    // setTideData(data)

    const url = `https://api.tide736.net/tide_image.php?pc=${pc}&hc=${hc}&yr=${year}&mn=${month}&dy=${day}&rg=day&w=768&h=512&lc=blue&gcs=cyan&gcf=blue&ld=on&ttd=on&tsmd=on`;
    setImageUrl(url);
  }, [point]);

  return (
    <React.Fragment>
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img style={{ height: '100%', objectFit: 'contain' }} src={imageUrl} alt="潮汐チャート" />
      </div>
    </React.Fragment>
  );
}