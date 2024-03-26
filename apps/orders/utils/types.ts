import React from "react";
import ReactDOM from "react-dom/client";

export interface OpenResult extends ReactDOM.Root{
  ref:any;
  //如果没有这个更新 useRecoilState组件数据间的共享 会在打开后调用事件使用的依然是旧数据
  hookUpdate(props:Record<any, any>):void;
  Component:any
}
