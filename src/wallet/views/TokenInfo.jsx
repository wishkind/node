/**
*  本文件用来判断是显示代币列表还是显示增加代币页面
*/
import React ,{useState} from 'react'
import TokenList from './TokenList'
import AddToken from './AddToken'
import { withRouter } from "react-router";

//两种操作，增加代币或者显示列表
const LIST = 'list'
const ADD = 'add'
const ERC20 = 0

function TokenInfo({history}) {
    const [status,setStatus] = useState(LIST)
    const [tokenType,setTokenType] = useState(ERC20)

    const onClose = () => {
        history.push('/main')
    }
    const openAdd = (value) => {
        setTokenType(value)
        setStatus(ADD)
    }
    const openList = () => {
        setStatus(LIST)
    }

    if(status === LIST) {
        return (
            <TokenList onClose={onClose} openAdd={openAdd} token_type={tokenType}/>
        )
    }else if(status === ADD) {
        return (
            <AddToken onClose={onClose} openList={openList} token_type={tokenType} />
        )
    }else {
        return null
    }
}

export default withRouter(TokenInfo)
