import React, {JSX} from "react";
import {ModalTypeMap} from "@mui/joy/Modal/ModalProps";
import {ModalDialogProps} from "@mui/joy/ModalDialog";
import BaseModal from "@/components/base/BaseModal";
import {Root} from "react-dom/client";
import {IOrderListTablePropsColumns} from "@/components/OrderListTable";

export interface BaseChildrenProps{
  modal?:BaseModal;
  ref?:React.MutableRefObject<any>;
  [key: string]: any;
}
export interface BaseModalProps<T>{
  onShow?():void;
  onHide?():void;
  onCancel?(self:BaseModal):Promise<boolean>|boolean|void;
  onOk?(self:BaseModal):Promise<boolean>|boolean|void;
  modalRef?:React.MutableRefObject<BaseModal>;
  textCancel?:string;
  textOk?:string;
  hiddenCancel?:boolean;
  hiddenOk?:boolean;
  cancelProps?:Record<string, any>;
  okProps?:Record<string, any>;
  //children:JSX.Element | React.Component & ((props:any) => JSX.Element);
  children?:any;
  childrenProps?: T & BaseChildrenProps;
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

export interface ConfirmModalProps extends BaseChildrenProps{
  title:string|React.ReactElement;
  desc:string|React.ReactElement;
}
export interface DetailsModalPropsTableColumns extends IOrderListTablePropsColumns{
}
export interface DetailsModalPropsTable{
  columns:DetailsModalPropsTableColumns[];
  data:any[]
}
export interface DetailsModalProps extends BaseChildrenProps{
  name:string;
  status:string;
  desc:string;
  tableList:DetailsModalPropsTable[]

}

