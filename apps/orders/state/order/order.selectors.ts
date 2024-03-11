import { selector, selectorFamily } from "recoil";
import { currentTableState, order, order4Payment } from "./order.atoms";
import { Item, SessionKeys, SubOrder } from "./types";


/**
 * 选择器：选择/更新当前操作订单下 当前操作内容部分
 *
 * @get {} 返回当前操作订单下 当前操作内容索引
 *      当前操作订单可能为 undefined， 当前操作订单下有若干 操作内容 subOrder[];
 *      当前操作内容索引（number）：订单每次加单生成一份新的操作内容，并push进subOrder[]的数组中，且操作内容索引更新为新加入的操作内容对应的数组索引
 * @set {Item} 更新当前订单下 当前操作内容中 具体的每项菜品数据 包含 quantity （数量） options(配置项)
 */
export const selCurOrderOperate = selectorFamily({
    key: 'selCurOrderOperate',
    get: (field: 'curOrder') => ({ get }) => get(order).curOrder?.orders[get(order).curOrder?.operateIndex ?? 0] ?? {
        items: [],
        recommends: [],
        createdBy: {},
    },
    set: (field: 'curOrder') => ({ set }, newValue: any) => set(order, prevState => {
        const orders = [...prevState.curOrder?.orders ?? []];
        // 锁定操作内容在数组中索引
        const prevIndex = prevState.curOrder?.operateIndex ?? 0;
        const operateIndex = newValue.operateIndex ?? prevIndex;
        // 更新 操作订单内容块的信息
        const updateItem = {
            ...orders[operateIndex] ?? {},
            ...(newValue.order as SubOrder) ?? {}
        };

        // 更新订单内容快下具体一个单项信息
        if (newValue.item) {
            if (!updateItem.items) {
                updateItem.items = [];
            }
            if (updateItem.items.find(({ id }) => id === newValue.item.id)) {
                updateItem.items = updateItem.items.map((preItem) => ({
                    ...preItem,
                    ...(preItem.id === newValue.item.id ? newValue.item : {})
                }));
            } else {
                updateItem.items = [...updateItem.items ?? [], newValue.item];
            }
        }

        // 根据 当前订单内容索引 更新对应内容块
        orders.splice(operateIndex, 1, updateItem as SubOrder);

        return {
            ...prevState,
            curOrder: {
                ...prevState.curOrder,
                orders,
                guestsNum: newValue.guestsNum || prevState.curOrder?.guestsNum || 0,
                tableInfo: newValue.tableInfo || prevState.curOrder?.tableInfo || undefined,
                operateIndex: operateIndex
            }
        };
    })
});

/**
 * 选择器：获取当前订单下 操作部分索引
 *
 * @get {} 返回当前订单下 操作部分索引值
 * @set {Item} 更新当前订单下操作部分索引值
 */
export const selCurOperateIndex = selectorFamily({
    key: 'selCurOperateIndex',
    get: (field: 'operateIndex') => ({ get }) => get(order).curOrder?.operateIndex ?? 0,
    set: (field: 'operateIndex') => ({ set }, index: any) => set(order, prevState => ({ ...prevState, curOrder: { ...prevState.curOrder, operateIndex: index } }))
});


/**
 * 选择器：选择/更新当前操作订单 的基础信息
 *
 * @get 包含桌子信息，就餐人数 订单ID
 * @set {Item} 更新当前订单下 当前操作内容中 具体的每项菜品数据 包含 quantity （数量） options(配置项)
 */
export const selCurOrderInfo = selectorFamily({
    key: 'selCurOrderInfo',
    get: (field: 'curOrderInfo') => ({ get }) => {
        const cOrder = get(order).curOrder;
        return { id: cOrder?.id, tableInfo: cOrder?.tableInfo, guestsNum: cOrder?.guestsNum };
    }
});

/**
 * 选择器：当前订单的 total 金额
*/
export const curOrderTotal = selector({
    key: 'curOrderTotal',
    get: ({ get }) => {
        const curOrder = get(order4Payment).curOrder;
        return curOrder?.orders
            .reduce((a: Item[], o) => a.concat(o.items), [])
            .reduce((s, r) => s + r.quantity * r.price, 0) ?? 0
    }
});

// 在 Recoil 中定义一个 selector，用于从 currentTableState 中获取数据
export const currentTableDataSelector = selectorFamily({
    key: 'currentTableData',
    get: () => ({ get }) => get(currentTableState),
    set: () => ({ set }, newValues) => {
        set(currentTableState, newValues as any);
        // 缓存桌子ID 操作人ID，桌子就餐人数 避免刷新丢失
        sessionStorage.setItem(SessionKeys.Table, (newValues as any)._id);
        sessionStorage.setItem(SessionKeys.Operator, (newValues as any).operator_id);
        sessionStorage.setItem(SessionKeys.GuestNumber, (newValues as any).guestNumber);
    }
});