import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectFade} from 'swiper';
 
import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
 
SwiperCore.use([EffectFade]);
 
const App = () => {
  return (
    <Swiper effect="fade">
      {[1, 2, 3].map((i, el) => {
        return <SwiperSlide>Slide {el}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default App;
