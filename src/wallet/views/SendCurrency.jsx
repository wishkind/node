/**
*  本文件用来判断是显示发送页面还是简要交易信息页面
*/
import React,{useState} from 'react';
import { withRouter } from "react-router";
import SendEtherForm from './SendEtherForm'
import {useGlobal} from 'contexts/GlobalProvider'
import TransactionInfo from './TransactionInfo'

//交易状态
const BEGIN = 'begin'
const PENDING = 'pending'

const values_init = {
    status:BEGIN,           //交易状态，分为二种 未发出（begin)，pending
    amount:0,               //发送的代币或者ETH数量
    symbol:"",
    tx:null,            //交易HASH
    td:null             //交易结果
}

function SendCurrency({history}) {
    const {txGlobal} = useGlobal()
    const [values,setValues] = useState({
        ...values_init,
        ...txGlobal
    })

    //交易发送之后转到交易信息页面
    const sendOver = (tx,amount,symbol) => {
        setValues({
            status:PENDING,
            tx,
            amount,
            symbol,
            td:null
        })
    }
    //返回主界面
    const resverseBack = () => {
        history.push('/detail')
    }

    const {status,tx,amount,symbol} = values
    if(status === BEGIN){
        return (
            <SendEtherForm cancelCallback={resverseBack} sendCallback={sendOver} />
        )
    }else if(status === PENDING) {
        return (
            <TransactionInfo tx={tx} amount={amount} symbol={symbol} reverseCallback={resverseBack} />
        )
    }else {
        return null
    }
}

export default withRouter(SendCurrency)
