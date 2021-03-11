import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
const A = (props: any) => {
  return (
    <>
      <div id="modal-root" />
      <div id="father" />
    </>
  )
}
 
export { A }

const C = () => {
  const [ show, setShow ] = useState(false)
  const onClose = () => {
    console.log("C onClose")
    setShow(false)
  }
  return (
    <div>
      C,
      <Modal show={show} onClose={onClose} />
      <button onClick={() => setShow((i) => !i)}>change展开/折叠Modal</button>
    </div>
  )
}
 
export { C }

 
const Modal = (props: any) => {  // 第一次渲染dom 走生命周期  还会在渲染拿值
  // console.log(props, 1114)
  const [ target, setTarget ] = useState(null)
  // console.log(target, 1111, target)
  useEffect(() => {
    setTarget(document.getElementById("modal-root"))
  }, [])
 
 
  useEffect(() => {
    // console.log("show change", props.show)
  }, [ props.show ])
 
  if (!props.show) return null  // false 就返回null
 
  const close = () => {
    console.log("modal close")
    props.onClose()
  }
  const children = (
    <div className={modal}>
      modal <button onClick={close}>close</button>
    </div>
  )
  // console.log("Modal", children, target)
  // target 一拿到dom 就会添加一个dom 到 target
  return target ? ReactDOM.createPortal(children, target) : <div>无父元素</div>
}
const modal = {
  width: '100%',
  height: '100%',
  position: 'fixed',
  left: 0,
  top: 0,
  background: 'red'
  }

export default class Miao extends React.Component<Props, State> {
 
  render(){
    return (
      <>
        <A/>
        <C/>
      </>
    )
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Miao />
  </React.StrictMode>, document.getElementById("root")
)
