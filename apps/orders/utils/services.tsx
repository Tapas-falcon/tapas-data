import ReactDOM from "react-dom/client";
import React from "react";

export default class {
  /**
   * 在全局范围内调用 但是需要自己实现卸载钩子
   * @param Component
   * @param props
   */
  static open(Component:any,props:any){
    let el=document.createElement('div');
    let root=document.getElementById('modal-root');
    root.appendChild(el);
    let node=ReactDOM.createRoot(el);
    let jsx=<Component {...props} root={node}/>;
    node.render(jsx);
    let unmount=node.unmount;
    node.unmount=function (){
      unmount.apply(this);
      el.remove();
    }
    return node;
  }
}