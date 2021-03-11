/**
* 本文件对notistack进行了一点简单包装，主要是增加默认信息类型，关闭回调等。
* 同时只导出一个showSnackbar方法来简化应用
* 再次提醒，当前版本notistack的onClose回调有问题，请小心
*/
import React, { createContext, useContext } from 'react'
import { useSnackbar } from 'notistack';

const SnackbarContext = createContext()
export function useSimpleSnackbar() {
    return useContext(SnackbarContext)
}

//所有类型
const VARIANTS = [
    'default',
    'success',
    'error',
    'warning',
    'info'
]

export default function Provider({children}) {
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message,variant='default',closeNotification) => {
        // variant could be success, error, warning, info, or default
        if(VARIANTS.indexOf(variant) === -1) {
            variant='default';
        }
        let options = {
            variant
        }
        if(closeNotification) {
            options['onClose'] = closeNotification
        }
        enqueueSnackbar(message, options);
    };
    //导出显示消息条的方法
    return (<SnackbarContext.Provider value={showSnackbar}>
                 {children}
            </SnackbarContext.Provider>)
}
