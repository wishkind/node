/**
*  本文件用来实时更新用户的余额(ETH)
*/
import React, { createContext, useEffect, useContext, useReducer, useMemo, useCallback } from 'react'
// import { ethers } from 'ethers'
import { safeAccess } from '../utils'
import {useGlobal} from './GlobalProvider'

const UPDATE='UPDATE'
const BalancesProvider = createContext()

function useBalancesContext() {
  return useContext(BalancesProvider)
}

function reducer(state,{type,payload}) {
    switch (type) {
        case UPDATE:{
            const {address,network,value} = payload
            return {
                ...state,
                [address]:{
                    ...(safeAccess(state,[address]) || {}),
                    [network]:{
                        value
                    }
                }
            }
        }
        default:{
          throw Error(`Unexpected action type in BalancesContext reducer: '${type}'.`)
        }
    }
}

export default function Provider({children}) {
    const [state, dispatch] = useReducer(reducer, {})
    const {wallet,network,provider} = useGlobal()

    const update = useCallback((address,network,value) => {
        dispatch({type:UPDATE, payload:{address,network,value}})
    },[])

    //刷新每个账号在每个网络下的余额,每当用户改变网络时，会自动重新更新并且监听
    useEffect(()=>{
        
        if(wallet) {
            const {address} = wallet
            let stale = false
            provider.on(address, value => {
                if(!stale ){
                   update(address,network,value)
                }
            });

            //清除函数，必须的，
            return ()=>{
                stale = true
                provider.removeAllListeners(address)
            }
        }
    },[wallet,network,provider,update])

    return (
        <BalancesProvider.Provider value={useMemo(() => [state, { update }], [state, update])}>
            {children}
        </BalancesProvider.Provider>
    )
}

//用来获取账号在某个网络下的余额的hook，注意，取的是内存中的值，
//当然，内存中的值更新后使用该hook的值会自动更新
export function useBalance(address,network) {
    const [state,] = useBalancesContext()
    const {value} = safeAccess(state,[address,network]) || {}
    return value
}
