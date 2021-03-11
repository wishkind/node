//此页用来放置一些自定义Hook
import {useMemo} from 'react';
import Jazzicon from 'jazzicon'

//返回一个代表该地址的ICON，注意其实返回的是一个div节点对象
export function useAddressIcon(address,size) {
  return useMemo(() => {
      return Jazzicon(size, parseInt(address.slice(2, 8))*100)
  }, [address,size])
}
