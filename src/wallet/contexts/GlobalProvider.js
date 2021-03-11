/**
*  本文件用来全局获取和改变不需要本地存储的全局变量(内存中)
*/
import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react'
import { ethers } from 'ethers'

const UPDATE='UPDATE'
const GlobalProvider = createContext()

function useGlobalContext() {
  return useContext(GlobalProvider)
}

//todo 全局变量随着开发逐渐增加
const global_init = {
    network:"homestead",
    provider:new ethers.providers.InfuraProvider("mainnet","fda03bb99a764dca90b2400ecff9ef5a"),
    password:'',
    transaction:null,
    isLogin:false,
    wallet:null,
    txGlobal:{},                 //用来记录签名时的交易
    tokenSelectedIndex:0,        //当前选中的20代币索引，0代表 ETH
    nftTokenSelectedIndex:0,   //当前选中的721代币索引
    ethPrice:0
}

function reducer(state,{type,payload}) {
    switch (type) {
        case UPDATE:{
            return { ...state,...payload }
        }
        default:{
          throw Error(`Unexpected action type in GlobalContext reducer: '${type}'.`)
        }
    }
}

export default function Provider({children}) {
    const [state, dispatch] = useReducer(reducer, global_init)

    const update = useCallback( payload => {
        dispatch({ type: UPDATE, payload})
    }, [])

    return (
        <GlobalProvider.Provider value={useMemo(() => [state,{update}], [state, update])}>
          {children}
        </GlobalProvider.Provider>
      )
}

//使用全局内存变量
export function useGlobal() {
    const [state,] = useGlobalContext()
    return state
}

//全新全局内存变量
export function useUpdateGlobal() {
    const [,{update}] = useGlobalContext()
    return update
}
