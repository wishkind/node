import React, { useState } from 'react';
import SwiperCore, { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
 
// install Swiper's Thumbs component
SwiperCore.use([Thumbs]);
 
const App = () => {
  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
 
  return (
    <main>
      {/* Main Swiper -> pass thumbs swiper instance */}
      <Swiper thumbs={{ swiper: thumbsSwiper }} >
        {/* ... */}
        slide 0
      </Swiper>
 
      {/* Thumbs Swiper -> store swiper instance */}
      <Swiper onSwiper={setThumbsSwiper}>
        {/* ... */}
        slide 1
      </Swiper>
    </main>
  )
}

export default App;

