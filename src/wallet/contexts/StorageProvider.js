/**
*  本文件用来全局获取和改变本地存储
*  存储内容随着开发逐渐增加
*/
import React, {
    useEffect,
    createContext,
    useMemo,
    useReducer,
    useContext,
    useCallback
} from 'react'
import {reactLocalStorage} from 'reactjs-localstorage';
import {safeAccess} from 'utils'

//需要在.env.local等文件中设置REACT_APP_APPKEY，代表本APP的key或者ID
const appKey = process.env.REACT_APP_APPKEY;
//创建上下文环境，固定用法
const StorageContext = createContext()
function useStorageContext() {
    return useContext(StorageContext)
}
/**  本地存储计划示例，
{

    "0x1234....":{
                    crypt:"ifajfay08",
                    erc20Tokens:{
                                    homestead:[
                                                {
                                                    address:'0x1234....'
                                                    balance:0x78,
                                                    symbol:'',
                                                    decimals:''

                                                },
                                                {
                                                    address:'0x1234....'
                                                    symbol:'',
                                                    decimals:''
                                                }
                                            ]
                                }
                  },
                  erc721Tokens:{
                    homestead:[
                    {
                        address:'0x1234....'
                        balance:0x78,
                        symbol:'',
                        name:'',
                        all:true,
                        enum:true,
                        ids:[]
                    }
                ]
              }
}
*/
const UPDATE = 'UPDATE'
const INIT = 'INIT'
const ERC20TOKENS = 'erc20Tokens'
const ERC721TOKENS = 'erc721Tokens'
function reducer(state, {type, payload}) {
    switch (type) {
        //更新某一个地址的内容，注意是更新它下面的全部，不是只更新一项
        case UPDATE:
            {
                const {address, value} = payload
                return {
                    ...state,
                    [address]: value
                }
            }
        //初始化整个变量
        case INIT:
            {
                return payload
            }
        default:
            {
                throw Error(`Unexpected action type in StorageContext reducer: '${type}'.`)
            }
    }
}

//定义一个provider
export default function Provider({children}) {
    //内存中保留一份缓存，不用每次从本地存储读取
    const [state, dispatch] = useReducer(reducer, null)
    //存储更新的同时也更新内存缓存
    const updateByAddress = useCallback((address, value) => {
        reactLocalStorage.setObject(appKey, {
            ...state,
            [address]: value
        })
        dispatch({
            type: UPDATE,
            payload: {
                address,
                value
            }
        })
    }, [state])
    //这个不用更新存储，就是从存储得到的
    const init = useCallback(payload => {
        dispatch({type: INIT, payload})
    }, [])

    //provider返回值，注意返回的方法包装在一个对象中
    return (<StorageContext.Provider value={useMemo(() => [state, {updateByAddress,init}], [state, updateByAddress, init])}>
        {children}
    </StorageContext.Provider>)
}

/**
* 用来初始化
*/
function useStorage() {
    const [data, {init}] = useStorageContext();


    useEffect(() => {
        if (!data) {
            let _data = reactLocalStorage.getObject(appKey);
            init(_data)
        }
    }, [data, init])
    return data
}

//获取对应地址的存储
export function useStorageByAddress(address) {
    const [data,] = useStorageContext();
    return safeAccess(data, [address])
}

//返回默认账号的存储，默认账号就是第一个账号（在本钱包为单账号情况下就是唯一的账号）
export function useDefaultAccount() {
    const [data,] = useStorageContext();
    let keys = Object.keys(data)
    return keys[0]
}

//获取当前存储的账号数量
//-1代表正在获取中
export function useAccountAmount() {
    const data = useStorage();
    if(!data){
        return -1
    }else{
        return Object.keys(data).length
    }
}

//获取某账号加密后的私钥，登录时使用
export function useAccountCrypt(address) {
    const [data,] = useStorageContext()
    return safeAccess(data,[address,'crypt'])
}

//更新用户加密后的密钥，新建用户或者导入时使用
export function useUpdateCrypt() {
    const [data,{updateByAddress}] = useStorageContext()

    return useCallback((address,crypt)=>{
        let _data = safeAccess(data,[address]) || {}
        _data = {
            ..._data,
            crypt,
        }
        updateByAddress(address,_data)
    },[updateByAddress,data])

}

//获取某个地址对应的所有ERC20代币列表
export function useErc20Tokens(address,network) {
    const [data,] = useStorageContext();
    let tokens = safeAccess(data,[address,ERC20TOKENS,network]) || []
    return tokens
}

//获取某个地址对应的所有ERC721代币列表
export function useErc721Tokens(address,network) {
    const [data,] = useStorageContext();
    let tokens = safeAccess(data,[address,ERC721TOKENS,network]) || []
    return tokens
}

//增加一个ERC20代币（只是增加显示）
export function useAddErc20Token() {
    const [data,{updateByAddress}] = useStorageContext();

    return useCallback((address,network,tokenAddress,symbol,decimals,balance)=>{
        let tokens = safeAccess(data,[address,ERC20TOKENS,network]) || []
        tokens.push({
            "address":tokenAddress,
            symbol,
            decimals,
            balance
        })
        let value = {
           ...(safeAccess(data,[address]) || {}),
           [ERC20TOKENS]:{
               ...(safeAccess(data,[address,ERC20TOKENS]) || {}),
               [network]:tokens
           }
        }
        updateByAddress(address,value)
    },[data,updateByAddress])
}

//增加一个ERC721代币（只是增加显示）
export function useAddErc721Token() {
    const [data,{updateByAddress}] = useStorageContext();

    return useCallback((address,network,tokenAddress,symbol,name,balance)=>{
        let tokens = safeAccess(data,[address,ERC721TOKENS,network]) || []
        tokens.push({
            "address":tokenAddress,
            symbol,
            name,
            balance
        })
        let value = {
           ...(safeAccess(data,[address]) || {}),
           [ERC721TOKENS]:{
               ...(safeAccess(data,[address,ERC721TOKENS]) || {}),
               [network]:tokens
           }
        }
        updateByAddress(address,value)
    },[data,updateByAddress])
}

//移除一个ERC20代币（只是移除显示）
export function useRemoveErc20Token() {
    const [data,{updateByAddress}] = useStorageContext();

    return useCallback((address,network,index)=>{
        let tokens = safeAccess(data,[address,ERC20TOKENS,network]) || []
        if(index >= tokens.length) {
            throw Error('invalid index of erc20 token')
        }
        tokens.splice(index,1)
        let value = {
           ...(safeAccess(data,[address]) || {}),
           [ERC20TOKENS]:{
               ...(safeAccess(data,[address,ERC20TOKENS]) || {}),
               [network]:tokens
           }
        }
        updateByAddress(address,value)
    },[data,updateByAddress])
}

//移除一个ERC721代币（只是移除显示）
export function useRemoveErc721Token() {
    const [data,{updateByAddress}] = useStorageContext();

    return useCallback((address,network,index)=>{
        let tokens = safeAccess(data,[address,ERC721TOKENS,network]) || []
        if(index >= tokens.length) {
            throw Error('invalid index of erc20 token')
        }
        tokens.splice(index,1)
        let value = {
           ...(safeAccess(data,[address]) || {}),
           [ERC721TOKENS]:{
               ...(safeAccess(data,[address,ERC721TOKENS]) || {}),
               [network]:tokens
           }
        }
        updateByAddress(address,value)
    },[data,updateByAddress])
}

//显示某个erc20代币的余额
export function useUpdateErc20Balance() {
    const [data,{updateByAddress}] = useStorageContext();

    return useCallback((address,network,tokenAddress,balance)=>{
        let tokens = safeAccess(data,[address,ERC20TOKENS,network]) || []
        for (let token of tokens) {
            if(token.address === tokenAddress) {
                token.balance = balance;
                break;
            }
        }
        let value = {
           ...(safeAccess(data,[address]) || {}),
           [ERC20TOKENS]:{
               ...(safeAccess(data,[address,ERC20TOKENS]) || {}),
               [network]:tokens
           }
        }
        updateByAddress(address,value)
    },[data,updateByAddress])
}

//显示某个erc721代币的余额
export function useUpdateErc721Balance() {
    const [data,{updateByAddress}] = useStorageContext();

    return useCallback((address,network,tokenAddress,balance)=>{
        let tokens = safeAccess(data,[address,ERC721TOKENS,network]) || []
        for (let token of tokens) {
            if(token.address === tokenAddress) {
                token.balance = balance;
                break;
            }
        }
        let value = {
           ...(safeAccess(data,[address]) || {}),
           [ERC721TOKENS]:{
               ...(safeAccess(data,[address,ERC721TOKENS]) || {}),
               [network]:tokens
           }
        }
        updateByAddress(address,value)
    },[data,updateByAddress])
}

//用来更新所有ERC20Token信息,主要用来在打开界面时获取所有代币最新余额
export function useUpdateAllTokens() {
    const [data,{updateByAddress}] = useStorageContext();

    return useCallback((address,network,tokens)=>{
        let value = {
           ...(safeAccess(data,[address]) || {}),
           [ERC20TOKENS]:{
               ...(safeAccess(data,[address,ERC20TOKENS]) || {}),
               [network]:tokens
           }
        }
        updateByAddress(address,value)
    },[data,updateByAddress])
}

//用来更新所有ERC721Token信息,主要用来在打开界面时获取所有代币最新余额
export function useUpdateAll721Tokens() {
    const [data,{updateByAddress}] = useStorageContext();

    return useCallback((address,network,tokens)=>{
        let value = {
           ...(safeAccess(data,[address]) || {}),
           [ERC721TOKENS]:{
               ...(safeAccess(data,[address,ERC721TOKENS]) || {}),
               [network]:tokens
           }
        }
        updateByAddress(address,value)
    },[data,updateByAddress])
}
