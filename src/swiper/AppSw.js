import React from 'react';
import Sw from './TestS';
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "gg",
            list: [],
        }
    }
    componentDidMount() {
        new Sw('.swiper-container', {
            direction: 'horizontal',
            slidesPerView: 3, 
            spaceBetween: 30,
            loop: true,
            loopFillGroupWithBlank: true,
            speed: 1000,
        })
    }

    render() {
        return (
            <div className='page-all'>
            <React.Fragment>
            <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">ffffff</div>
                </div>
             </div>
             </React.Fragment>
             </div>
        );
    }
} 
