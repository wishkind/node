import React from 'react';
//import Swiper from 'swiper';
import 'swiper/swiper.min.css';
import Axios from 'axios';
//import slideTo from './slide/slideTo';
import slide from './slide/index';
import Swiper from './core-class';
import SearchBar from './searchBar';

const doSomethingWith = (v) => {
    alert(v)
}
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "gg",
            list: [],
        }
  //      slideTo();
    }
    componentDidMount() {
        Axios.get('/data.json').then(res => {
            this.setState(() => {
                return {
                    list: res.data
                }
            })
        })
        new Swiper('.swiper-container', {
            direction: 'horizontal',
            slidesPerView: 3, 
            spaceBetween: 30,
            loop: true,
            loopFillGroupWithBlank: true,
            speed: 1000,
            autoplay: 1000,
            //autoplayDisableOnInteraction: false,

            coverflow: { 
                rotate: 30, 
                stretch: 10, 
                depth: 60, 
                modifier: 2, 
                slideShadows : true, 
            }, 
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        })
    }

    render() {
        const {list} = this.state
        console.log(list)
        return (
            <div className='page-all'>
            <React.Fragment>
          {/*   <SearchBar />
                value={this.state.value}
                onChange={() => alert("ggg")}
                onRequestSearch={() => alert("bbb")}
              />*/}
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        list.map( item => {
                            return (
                                <div className="swiper-slide" key={item.id}>
                                    <p> <img src={item.imgurl} /> </p>
                                </div>
                            )
                        })
                     }
                </div>
             {/*如果需要分页器*/}
                <div className="swiper-pagination">p</div>
  
             {/*如果需要导航按钮 */}
                 <div className="swiper-button-prev">next</div>
                 <div className="swiper-button-next">prev</div>
     
             {/* 如果需要滚动条*/}
                 <div className="swiper-scrollbar">s</div>
             </div>
             </React.Fragment>
             </div>
        );
    }
} 
