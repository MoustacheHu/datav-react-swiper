import React from 'react';
import { Swiper as SwiperCore, Autoplay, EffectFade, EffectCoverflow, EffectFlip } from 'swiper';
import Single from './single';
import Multiple from './multiple';
import 'swiper/swiper.less';
import 'swiper/components/effect-fade/effect-fade.less';
import 'swiper/components/effect-coverflow/effect-coverflow.less';
import 'swiper/components/effect-flip/effect-flip.less';
import './app.less';

const App = ({ data, config }) => {
  const { basicConfig: { mode } } = config;

  // 开启自动播放模块，不主动开启则 autoplay 不会生效
  SwiperCore.use([Autoplay, EffectFade, EffectCoverflow, EffectFlip]);

  return mode === 1 ? <Single data={data} config={config} /> : <Multiple data={data} config={config} />;
};

export default App;
