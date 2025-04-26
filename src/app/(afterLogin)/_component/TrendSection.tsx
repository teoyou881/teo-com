import React from 'react';
import style from './trendSection.module.css'
import Trend from '@/app/(afterLogin)/_component/Trend';

const TrendSection = () => {
  return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>What's happening</h3>
          <Trend/>
          <Trend/>
          <Trend/>
          <Trend/>
          <Trend/>
        </div>
      </div>
  );
};
export default TrendSection;
