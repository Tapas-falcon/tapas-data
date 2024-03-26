import React from "react";
import {BaseModalProps, ConfirmModalProps} from "@/components/base/types";
import BaseModal from "@/components/base/BaseModal";

export const ConfirmModal:React.FC<ConfirmModalProps>=(props)=>{
  const {title,desc}=props;
  return (
    <div className={`w-80`}>
      <h1 className="m-0 text-base">{title}</h1>
      <div className={`text-sm mt-3 text-neutral-500`}>{desc}</div>
    </div>
  );
}
export const openConfirmModal=(props:BaseModalProps<ConfirmModalProps>)=>{
  return BaseModal.open({
    children:ConfirmModal,
    modalBoxClass:"confirm-modal",
    ...props
  });
}
export default openConfirmModal;
