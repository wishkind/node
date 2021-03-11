import React, {useRef, useState, useEffect, forwardRef} from 'react';
const Sw = forwardRef(
  (
    {
      className,
      tag: Tag = 'div',
      wrapperTag: WrapperTag = 'div',
      children,
      onSwiper,
      ...rest
    } = {},
    externalElRef,
  ) => {
    const [containerClasses, setContainerClasses] = useState('swiper-container');
    const [virtualData, setVirtualData] = useState(null);
    const [breakpointChanged, setBreakpointChanged] = useState(false);
    const initializedRef = useRef(false);
    const swiperElRef = useRef(null);
    const swiperRef = useRef(null);
    const oldPassedParamsRef = useRef(null);
    const oldSlides = useRef(null);

    const nextElRef = useRef(null);
    const prevElRef = useRef(null);
    const paginationElRef = useRef(null);
    const scrollbarElRef = useRef(null);
    

    return (
      <div ref={swiperElRef}>
        <p> hhhhhhhhhh</p>
      </div>
    );
}
);
Sw.displayName = 'Sw';
export {Sw};
