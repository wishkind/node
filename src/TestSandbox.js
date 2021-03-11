function compileCode(src) {
    src = 'with (exposeObj) {' + src + '}'
    return new Function('exposeObj', src)
}
function compileCode(src) {
    src = `with (exposeObj) { ${src} }`
    return new Function('exposeObj', src)
}

function proxyObj(originObj) {
    let exposeObj = new Proxy(originObj, {
        has: (target, key) => {
            if (["console", "Math", "Date"].indexOf(key) >= 0) {
                return target[key]
            }
            if (!target.hasOwnProperty(key)) {
                throw new Error(`Illegal operation for key ${key}`)
            }
            return target[key]
        },
    })
    return exposeObj
}

function createSandbox(src, obj) {
    let proxy = proxyObj(obj)
    compileCode(src).call(proxy, proxy) //绑定this 防止this访问window
}

const testObj = {
    value: 1,
    a: {
        b: { c: 1 }
    }
}
// 访问原型链实现了沙箱逃逸
createSandbox(`a.b.__proto__.toString = ()=>{
   console.log(a)

};a.b.__proto__.toString()`, testObj)
