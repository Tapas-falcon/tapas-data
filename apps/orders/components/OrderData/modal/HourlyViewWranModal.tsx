import React from "react";
import openConfirmModal from "@/components/base/ConfirmModal";

export const openHourlyViewWarnModal=()=>{
  return 	openConfirmModal({
    textOk:"Update filter",
    childrenProps:{
      title:"Hourly view can only view one month",
      desc:"To avoid a table is too long, hourly view can only view one month. Your filter will be updated to past 1 month."
    }
  });
}
export default openHourlyViewWarnModal;
