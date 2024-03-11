import React, {JSX} from "react";
import {ModalTypeMap} from "@mui/joy/Modal/ModalProps";
import {ModalDialogProps} from "@mui/joy/ModalDialog";
import BaseModal from "@/components/base/BaseModal";
import {Root} from "react-dom/client";

export interface BaseChildrenProps{
  modal?:BaseModal;
  [key: string]: any;
}
export interface BaseModalProps{
  onShow?():void;
  onHide?():void;
  onCancel?(self:BaseModal):Promise<boolean>|boolean|void;
  onOk?(self:BaseModal):Promise<boolean>|boolean|void;
  textCancel?:string;
  textOk?:string;
  hiddenCancel?:boolean;
  hiddenOk?:boolean;
  //children:JSX.Element | React.Component & ((props:any) => JSX.Element);
  children?:any;
  childrenProps?: BaseChildrenProps;
  modalProps?:ModalTypeMap;
  modalDialogProps?:ModalDialogProps;
  modalBoxClass?:string;
  modalBoxContentClass?:string;
  footer?:JSX.Element;
  root?:Root;//todo 这个参数由servies.open传入 需要在内部实现卸载 参阅 baseModal组件

}
export interface DepositDialogModalChildrenProps extends BaseChildrenProps{


}
export interface InfoDepositDialogModalChildrenProps extends BaseModalProps{
  data:any
}
