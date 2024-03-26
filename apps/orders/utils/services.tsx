import ReactDOM from "react-dom/client";
import React from "react";
import {OpenResult} from "@/utils/types";
import merge from "lodash.merge";
export default class {
  /**
   * 在全局范围内调用 但是需要自己实现卸载钩子
   * @param Component
   * @param props
   */
  static open(Component:any,props:any):OpenResult{
    let el=document.createElement('div');
    let root=document.getElementById('modal-root');
    root.appendChild(el);
    let node:OpenResult=ReactDOM.createRoot(el) as OpenResult;
    let unmount=node.unmount;
    node.unmount=function (){
      unmount.apply(this);
      el.remove();
    }
    node.ref=null;
    node.Component=Component;
    node.hookUpdate=function (newProps) {
      newProps=merge({},props,newProps);
      node.render(<Component {...newProps} root={node}/>);
    }
    node.hookUpdate(props);
    return node;
  }
  static locale:string='es';
}
