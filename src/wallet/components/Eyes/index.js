import React from 'react';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import purple from '@material-ui/core/colors/purple';

//这里主要是包装了一个颜色
export function Visible() {
    return (
        <Visibility style={{color:purple[500]}} />
    )
}

export function Invisible() {
    return (
        <VisibilityOff style={{color:purple[500]}} />
    )
}
