import openConfirmModal from "@/components/base/ConfirmModal";
import {Checkbox} from "@mui/joy";
import {useRecoilState} from "recoil";
import {orderDataParamsState} from "@/state/order/order.atoms";

const Desc=()=>{
  return (
    <>
      <p className={`m-0`}>This table contains different units,  one or more values are excluded in current formula.</p>
      <p className="m-0 mt-3"><Checkbox  variant="outlined" size={`sm`} label={`Do not show it again`}/></p>
    </>
  )
}
export const openValuesExcludedModal=()=>{
  return openConfirmModal({
    textOk:"Got it",
    childrenProps:{
      title:"One or more values are excluded",
      desc:<Desc/>
    }
  });
}
