import crypto from 'crypto'
import {utils,ethers} from 'ethers'
import ERC20_ABI from 'constants/abis/ERC20ABI.json'
import ERC721_ABI from 'constants/abis/ERC721ABI.json'
import {NET_WORKS_NAME,NET_WORKS,CHAINID_TO_NETWORK} from '../constants'
// import {useGlobal} from '../contexts/GlobalProvider'

//一般用不到，标记错误代码
export const ERROR_CODES = ['TOKEN_NAME', 'TOKEN_SYMBOL','TOKEN_NAME','TOKEN_DECIMALS','TOKEN_BALANCE','TOKEN_INTERFACE'].reduce(
  (accumulator, currentValue, currentIndex) => {
    accumulator[currentValue] = currentIndex
    return accumulator
  },
  {}
)

//ETHERSCAN查询时的前缀，国内无法访问直接ETHERSCAN，但这不是代码的问题
const ETHERSCAN_PREFIXES = {
    1: '',
    3: 'ropsten.',
    4: 'rinkeby.',
    42: 'kovan.'
}

//aes加密
export function aesEncrypt(data, key) {
    let cipher = crypto.createCipher('aes192', key);
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

//aes解密
export function aesDecrypt(encrypted, key) {
    let decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

//获取设定的密码长度
export function getPasswordLength() {
    let length = process.env.REACT_APP_PASSWORD_LENGTH;
    return + length
}

//将以太坊地址取首尾几个字符，用较短形式显示
export function shortenAddress(address, digits = 4) {
    return `${address.substring(0, digits + 2)}...${address.substring(address.length - digits)}`
}

//将ether数量（单位为wei)转化为相应的十进制小数（单位为ETH)
export function convertToEth(_bigNumber) {
    if(!_bigNumber) {
        return 0
    }
    let eth_string = utils.formatEther(_bigNumber)
    return + eth_string
}

//将任意精度的token余额转换成为十进制小数 。例如 0x1234 => 12.34
//第一个参数类型为bigNumber，为用户代币余额，第二个参数类型为十进制整数，为代币的精度
export function convertBigNumberToFixed(_bigNumber,decimals) {
    if(!_bigNumber) {
        return 0
    }
    let _str = _bigNumber.toString()
    let _len = _str.length;
    if(_len < decimals - 3){
        return 0
    }
    if(_len > decimals) {
        let header = _str.substring(0,_len - decimals);
        let body = _str.substring(_len - decimals,
            _len - decimals + 4 > _len ? _len - decimals + 4 : _len)
        let result = header + "." + body
        return + result
    }
    let _step = decimals - _len
    let _result = "0."
    for(let i=0;i<_step;i++){
        _result.append("0")
    }
    let _tail = _str.substring(0,4-_step)
    _result = _result.concat(_tail)
    return + _result
}

//同上一个方法相反，将十进制小数转换成为做任意精度的token余额 例如  12.34 => 0x1234
//第一个参数类型为十进制小数，为用户设定的数量，第二个参数类型为十进制整数，为代币的精度
export function convertFixedToBigNumber(fixed,decimals){
    if(!fixed) {
        return ethers.constants.Zero
    }
    let strs = fixed.toString().split('.')
    let power = 0;
    let r_str = strs[0]
    if(strs.length > 1) {
        let _tail = strs[1]
        let _len = _tail.length
        if(_len > decimals){
            _tail = _tail.substring(0,decimals)
        }
         r_str = r_str + _tail
         power = _tail.length
    }
    let ten = utils.bigNumberify(10)
    let times = ten.pow(power)
    let times_str = utils.bigNumberify(r_str)
    return times_str.mul(ten.pow(decimals)).div(times)
}

//用来获取对象中深层属性，比如获取 a.b.c.d
//第一个参数是a，第二个参数为数组，为属性列表[b,c,d]
export function safeAccess(object, path) {
    return object
        ? path.reduce((accumulator, currentValue) => (
            accumulator && accumulator[currentValue]
            ? accumulator[currentValue]
            : null), object)
        : null
}

//将一个支持的地址转成校验过的地址，同时也可以用来判定地址是否有效
export function isAddress(_address) {
    let address = null;
    try{
       address = utils.getAddress(_address)
    }catch{
    }
    return address
}

//获取etherscan查看链接
export function getEtherscanLink(network, data, type) {
  const prefix = `https://${ETHERSCAN_PREFIXES[network] || ETHERSCAN_PREFIXES[1]}etherscan.io`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token':{
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

//下面的网络名称特指全称（比如Kovan测试网络、主网等），而网络特指它的字符串代表（如'homestead'、'kovan'）
//根据chainId获取网络
export function getNetworkByChainId(chainId) {
    return CHAINID_TO_NETWORK[chainId]
}

//和上面的相反，根据网络获取chainId
export function getChainIdByNetwork(network) {
    return utils.getNetwork(network).chainId
}

//获取网络名称
export function getNetworkName(network) {
    let index = NET_WORKS.indexOf(network)
    return NET_WORKS_NAME[index]
}

//根据chainId获取网络名称
export function getNetworkNameById(chainId) {
    return getNetworkName(getNetworkByChainId(chainId))
}

//获取ERC20代币合约对象并链接到相应钱包
//参数分别为代币地址，网络和钱包
export function getErc20Token(tokenAddress,network,wallet,provider) {
    if(!isAddress(tokenAddress) || !network) {
        return null;
    }
    // const {provider} = useGlobal()
    try{
        // let provider = ethers.getDefaultProvider(network);
        if(wallet) {
            provider = wallet.connect(provider)
        }
        return new ethers.Contract(tokenAddress,ERC20_ABI,provider)
    }catch{
        return null
    }
}
//下面三个代币相关的方法中的代币合约对象均已使用上面的方法链接到钱包。
//获取token符号
export async function getTokenSymbol(tokenContract) {
    return tokenContract.symbol().catch(error => {
        error.code = ERROR_CODES.TOKEN_SYMBOL
        throw error
    })
}

//获取token精度
export async function getTokenDecimals(tokenContract) {
    return tokenContract.decimals().catch(error => {
        error.code = ERROR_CODES.TOKEN_DECIMALS
        throw error
    })
}

//获取某个地址在某个token余额
export async function getTokenBalance(tokenContract,address) {
    return tokenContract.balanceOf(address).catch(error => {
        error.code = ERROR_CODES.TOKEN_BALANCE
        throw error
    })
}

//获取ERC721代币合约对象并链接到相应钱包
//参数分别为代币地址，网络和钱包
export function getErc721Token(tokenAddress,network,wallet,provider) {
    // const {provider} = useGlobal()
    if(!isAddress(tokenAddress) || !network) {
        return null;
    }
    try{
        // let provider = ethers.getDefaultProvider(network);
        if(wallet) {
            provider = wallet.connect(provider)
        }
        return new ethers.Contract(tokenAddress,ERC721_ABI,provider)
    }catch{
        return null
    }
}
//下面三个代币相关的方法中的代币合约对象均已使用上面的方法链接到钱包。
//获取token符号
export async function getERC721TokenSymbol(tokenContract) {
    return tokenContract.symbol().catch(error => {
        error.code = ERROR_CODES.TOKEN_SYMBOL
        throw error
    })
}

//获取token精度
export async function getERC721TokenName(tokenContract) {
    return tokenContract.name().catch(error => {
        error.code = ERROR_CODES.TOKEN_NAME
        throw error
    })
}

//获取某个地址在某个token余额(总数量)
export async function getERC721TokenBalance(tokenContract,address) {
    return tokenContract.balanceOf(address).catch(error => {
        error.code = ERROR_CODES.TOKEN_BALANCE
        throw error
    })
}
//获取某个地址在某个token的所有ID
export async function getErc721TokenIds(tokenContract,address){
    return tokenContract.getBalances(address).catch(error => {
        error.code = ERROR_CODES.TOKEN_IDS
        throw error
    })
}

export async function getSupportInterface(tokenContract,signature) {
    return tokenContract.supportsInterface(signature).catch(error => {
        error.code = ERROR_CODES.TOKEN_INTERFACE
        throw error
    })
}

//将一个html节点转换成字符串
export function nodeToString(node) {
    let tmpNode = document.createElement( "div" );
    tmpNode.appendChild( node.cloneNode( true ) );
    let str = tmpNode.innerHTML;
    tmpNode = node = null; // prevent memory leaks in IE
    return str;
}

//将一个query对象转换成交易对象
export function convertQuery(query) {
    let gasLimit = query.get('gasLimit')
    let nonce = + query.get('nonce')
    let to = query.get('to')
    let gasPrice = + query.get('gasPrice')
    let value = + query.get('value')
    let data = query.get("data")
    let chainId = getChainIdByNetwork(query.get("net") || "")
    let result = {}
    try{
        if(to) {
            result.to = to
        }
        if(nonce) {
            result.nonce = nonce
        }
        if(gasLimit) {
            result.gasLimit = utils.bigNumberify(gasLimit)
        }
        if(gasPrice) {
            result.gasPrice = gasPrice
        }
        if(value) {
            result.value = value
        }
        if(data) {
            result.data = data
        }
        if(chainId) {
            result.chainId = chainId
        }
    }catch(e) {
        return {}
    }
    return result
}

//获取路由的基准路径，注意在开发环境和生产环境的区别
export function getPathBase() {
    return process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PATH_BASE : ''
}
