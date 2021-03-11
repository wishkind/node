import React from 'react';
import Swiper from 'swiper';
import 'swiper/swiper.min.css';
import Address from './Address';
import Title from './Title';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "age": 46,
    }
  }

  componentDidMount() {
    this.swiperObj =   new Swiper('.swiper-container', {
      sapceBetween: 50,
      slidesPerView: 3,
      //centeredSlides: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
/*
 componentDidUpdate() {

        this.swiperObj.update();

        this.swiperObj.slideTo(0, 1000, false);

  }




componentWillUnmount() {

        if (this.swiperObj.destroy) { // 销毁swiper

            this.swiperObj.destroy();

            this.swiperObj = null;

       }

  }
*/

  render() {
    
    return (
      <React.Fragment>
      <div className='swiper-container'>
        <div className='swiper-wrapper'>
          <div className='swiper-slide swiper-slideone'>Slide 1</div>
          <div className='swiper-slide swiper-slidetwo'>Slide 2</div>
          <div className='swiper-slide swiper-slideone'> Slide 3</div>
          <div className='swiper-slide swiper-slidethree'>Slide 4</div>
        </div>
        <div className='swiper-pagination'></div>
        <div className='swiper-button-next'></div>
        <div className='swiper-button-prev'></div>
      </div> 
      {/*<Address />*/}
      </React.Fragment>
    );
  }
}


