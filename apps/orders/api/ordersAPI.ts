import { SessionKeys } from "@/state/order/types";
import { Option } from "@/state/dishes/types";
import { API_URL } from "./apiProxy";
import { createOrderParams, updateDishesParams, updateDishesWithNewOperateParams, updateOrderStatusParams } from "./types";
import * as qs from 'qs';
import { ISelectItem } from "@tapas/ui/Select";

const moduleName = '/orders';

export const createOrderAPI = (req: createOrderParams): Promise<any> => {
  const header = new Headers();
  header.append("Content-Type", "application/json");
  return fetch(`${API_URL}${moduleName}/create`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(req),
  }).then(res => res.json()).then((data) => data);
}

export const addDishesAPI = (req: any): Promise<any> => {
  const header = new Headers();
  header.append("Content-Type", "application/json");
  return fetch(`${API_URL}${moduleName}/addDishes`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(req),
  }).then(res => res.json());
}

export const addDishesWithNewOperateAPI = (req: any): Promise<any> => {
  const header = new Headers();
  header.append("Content-Type", "application/json");
  return fetch(`${API_URL}${moduleName}/addDishesWithNewOperate`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(req),
  }).then(res => res.json());
}

export const updateOrderStatusAPI = (req: any): Promise<any> => {
  const header = new Headers();
  header.append("Content-Type", "application/json");
  return fetch(`${API_URL}${moduleName}/updateOrderStatus`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(req),
  }).then(res => res.json());
}

export type OrderQueryParams = {
  status?: string;
  subStatus?: string;
  orderType?: string;
  createdAt?: string | string[];
  createdBy?: string;
  checkoutBy?: string;
  cancelBy?: string;
  page?: number;
  stores?:string;
}

export const getOrdersAPI = ({
  status='default',
  subStatus='default',
  orderType='default',
  createdAt='default',
  createdBy='default',
  checkoutBy='default',
  cancelBy='default',
  page=1,
  stores
}: OrderQueryParams): Promise<any> => {
  const query = qs.stringify({
    status,
    subStatus,
    orderType,
    createdAt,
    createdBy,
    checkoutBy,
    cancelBy,
    page,
    stores
  })
  const header = new Headers();
  header.append("Content-Type", "application/json");
  return fetch(`${API_URL}${moduleName}/list?${query}`, {
    method: 'GET',
    headers: header,
  }).then(res => res.json());
}

export const getOrderAPI = (id: string): Promise<any> => {
  const query = new URLSearchParams({
    id
  })
  const header = new Headers();
  header.append("Content-Type", "application/json");
  return fetch(`${API_URL}${moduleName}/get?${query}`, {
    method: 'GET',
    headers: header,
  }).then(res => res.json());
}

export const getOrdersCreateByAPI = async (translation: any) => {
  const createdByList: ISelectItem[] = [
    {
      key: 'default',
      text: translation('CreatedByAnyone')
    },
  ]

  return createdByList;
}

export const getOrdersCheckoutByAPI = async (translate: any) => {
  const checkoutByList: ISelectItem[] = [
    {
      key: 'default',
      text: translate('CheckoutByAnyone')
    },
  ]

  return checkoutByList;
}

export const getOrdersCancelByAPI = async (translate: any) => {
  const cancelByList: ISelectItem[] = [
    {
      key: 'default',
      text: translate('CancelledByAnyone')
    },
  ]

  return cancelByList;
}

// 初始化创建新的订单，同时生成创建操作记录，
export const reqGenerateNewOrder = async (queryParameters: createOrderParams) => {
  try {
    if (!queryParameters.tableId && sessionStorage.getItem(SessionKeys.Table)) {
      queryParameters.tableId = sessionStorage.getItem(SessionKeys.Table);
    }
    if (!queryParameters.createdBy && sessionStorage.getItem(SessionKeys.Operator)) {
      queryParameters.createdBy = sessionStorage.getItem(SessionKeys.Operator);
    }
    if (!queryParameters.gustNum && sessionStorage.getItem(SessionKeys.GuestNumber)) {
      queryParameters.gustNum = parseInt(sessionStorage.getItem(SessionKeys.GuestNumber));
    }
    if (queryParameters.options) {
      queryParameters.options = (queryParameters.options as Option[]).map(({ id, extra }) => ({ optionId: id, extra }));
    }
    const res: any = await createOrderAPI(queryParameters);
    if (res.error) {
      throw res.error;
    }
    sessionStorage.setItem(SessionKeys.OrderId, res._id);
    sessionStorage.setItem(SessionKeys.OrderObjId, res.id);
    sessionStorage.setItem(SessionKeys.OperateId, res.modifyHistory[0]);
    return res;
  } catch (error) {
    console.error("Failed to generate/update new order:", error);
    throw new Error("Failed to generate/update new order");
  }
};

// 更新订单对应的创建操作记录中的菜品信息
export const updateDishesForUnSubmitOrder = async (params: updateDishesParams) => {
  try {
    if (!params.operateId && sessionStorage.getItem(SessionKeys.OperateId)) {
      params.operateId = sessionStorage.getItem(SessionKeys.OperateId);
    }
    if (!params.createdBy && sessionStorage.getItem(SessionKeys.Operator)) {
      params.createdBy = sessionStorage.getItem(SessionKeys.Operator);
    }
    if (params.options) {
      params.options = (params.options as Option[]).map(({ id, extra }) => ({ optionId: id, extra }));
    }
    const res: any = await addDishesAPI(params);
    if (res.error) {
      throw res.error;
    }
  } catch (error) {
    console.error("Failed to add dishes into the operate:", error);
    throw new Error("Failed to add dishes into the operate");
  }
};

// 更新订单的主状态与副状态
export const updateOrderStatus = async (params: updateOrderStatusParams) => {
  try {
    if (!params.orderId && sessionStorage.getItem(SessionKeys.OrderId)) {
      params.orderId = sessionStorage.getItem(SessionKeys.OrderId);
    }
    if (!params.status && !params.subStatus) {
      throw new Error("Could not found the status/subStatus value in request body");
    }
    const res: any = await updateOrderStatusAPI(params);
    if (res.error) {
      throw res.error;
    }
    return { id: params.orderId, _id: sessionStorage.getItem(SessionKeys.OrderObjId) }
  } catch (error) {
    console.error("Failed to update the order status:", error);
    throw new Error("Failed to update status/subStatus for order");
  }
};

// 更新已存在订单中的操作记录
export const updateDishesForSubmitedOrder = async (params: updateDishesWithNewOperateParams) => {
  try {
    if (!params.orderId && sessionStorage.getItem(SessionKeys.OrderId)) {
      params.orderId = sessionStorage.getItem(SessionKeys.OrderId);
    }
    const res: any = await addDishesWithNewOperateAPI(params);
    if (res.error) {
      throw res.error;
    }
  } catch(error){
    console.error("Failed to update the dishes with new operate to existed order!");
    throw new Error("Failed to update the dishes with new operate to existed order!");
  }
}
