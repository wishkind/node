// https://swiperjs.com/get-started/
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
//import 'swiper/swiper.scss';
//import 'swiper/components/navigation/navigation.scss';
//import 'swiper/components/pagination/pagination.scss';
//import 'swiper/components/scrollbar/scrollbar.scss';
import { makeStyles } from '@material-ui/core/styles';
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);
const useStyles = makeStyles({
    SwiperStyle: {
        backgroundColor: '#f5f5f5',
        height: '58px',
        width: '100%',
    },
});

export default function App(props) {
    const classes = useStyles();

    return (
        <div>

            <Swiper
                direction={'horizontal'}
                loop={true}
                autoplay={{
                    delay: 500,
                    disableOnInteraction: false
                }}
            >

                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>

            </Swiper>

            <style jsx global>{`
                    .swiper-container {
                        background-color: #f5f5f5;
                    }
           `}</style>
        </div>
    )
}
