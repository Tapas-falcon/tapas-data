import { getOrderAPI } from "@/api/ordersAPI";

export const getCurrentOrderByOrderId = async (orderId: string) => {
    const orderDetail = await getOrderAPI(orderId);
    const orders: any = []; // 用于存放当前订单的所有操作记录, 每个操作记录中包含了当前订单的所有菜品信息, 从modifyHistory中获取
    for (const history of orderDetail.modifyHistory) {
        const order: any = {
            modifyHistory: [history._id],
            id: history.id,
            _id: history._id,
            createdBy: history.modifiedBy,
            items: [],
            modifyTime: history.modifyTime,
        }
        for (const content of history.modifyContent) {
            const dishes = content.dishesInfo;
            const item = {
                ...dishes,
                quantity: content.quantity,
            }
            order.items.push(item);
        }
        orders.push(order);
    }
    console.log(orderDetail)
    const curOrder = {
        ...orderDetail,
        status: orderDetail.status,
        subStatus: orderDetail.subStatus,
        guestsNum: orderDetail.gustNum,
        tableInfo: orderDetail.tableInfo,
        orders,
        operateIndex: orders.length - 1
    }
    console.log(curOrder)

    return curOrder;
}