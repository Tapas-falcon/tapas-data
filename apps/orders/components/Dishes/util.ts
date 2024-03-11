import { DiscountLimitType, DiscountType, DishesItem } from "@/state/dishes/types";
import { Item, SubOrder, TableBase } from "@/state/order/types";

export enum SumType {
    OriginalPrice, // 原价进行 合算
    WithOptions,  // 原件+选项价 合算
    WithTax, // 原价+选项价+税率 合算
    OnlyTax, // 仅输出税率 价格
}

/**
 * 根据折扣百分比 返回扣除的折扣值 （！不四舍五入）
 *
 * @param {number} num 原价格值
 * @param {number} percentage 百分比小数
 * @return {number} 返回折扣减除的值
 */
export const discountValFormat = (num: number, percentage: number): number => Math.floor(num * percentage * 100) / 100;

/**
 * 小数补位
 *
 * @param {number} num 浮点数原值
 * @param {number} padEnd 保留小数位数 默认为2位
 * @param {string} str 小数位数补位值 默认为 ’0‘
 * @return {string} 返回最终显示文本
 */
export const padEnd = (num: number, padEnd?: number, str?: string): string => {
    const n = padEnd ?? 2;
    const fStr = str ?? '0';
    const [integer, decimal] = (Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toString().split('.'); // 在计算前需要四舍五入计算一个保留n位的小鼠位数，避免计算差值位数过多
    return `${integer}.${(decimal ?? '').padEnd(n, fStr)}`;
};

/**
 * 换算订单中单项的最终价格
 * ((原单价-折扣价)+（配置项价))*数量
 * 折扣：
 *   触发条件： A. 购买数量， B: 购买金额
 *   折扣方式： A. 半分比折扣，B： 金额抵扣
 * 配置项：附加金额
 *
 * @param {dishesItem} DishesItem 菜品基础信息（含折扣，原单价，配置项）
 * @param {quantity} number 购买单项的数量
 * @return {string} 返回最终金额（保留小数后两位，四舍五入）
 */
export const calcFinalPriceForOrderItem = ({ discount, price, options, taxRate }: DishesItem | Item, quantity: number, type?: SumType): string => {
    let res = price * quantity;
    if (discount) {
        // 单品上是否存在折扣规则
        let metDiscountLimit = false;
        switch (
        discount.limitType.key // 是否满足折扣规则触发条件
        ) {
            case DiscountLimitType.quantity: // 数量出发条件
                metDiscountLimit = quantity >= discount.limitValue;
                break;
            case DiscountLimitType.money: // 购买总价格触发条件
                metDiscountLimit =
                    price * quantity >= discount.limitValue;
                break;
            default:
                break;
        }
        if (quantity > 0 && metDiscountLimit) {
            res = 0;
            // 满足触发条件
            switch (
            discount.type.key // 折扣抵扣类型
            ) {
                case DiscountType.percentage: // 百分比
                    res += (price - discountValFormat(price, discount.value)) * quantity;
                    break;
                case DiscountType.money: // 数额
                default:
                    res += (price - discount.value) * quantity;
                    break;
            }
        }
    }

    const optionsValue = options.map(({ children }) => children.map(({ checked, extra }) => checked ? (extra ?? 0) : 0).reduce((accumulator, currentValue) => accumulator + currentValue, 0)).reduce((accumulator, currentValue) => accumulator + currentValue, 0) * quantity;

    switch (type) {
        case SumType.OriginalPrice:
            return padEnd(res);
        case SumType.WithTax:
            return padEnd((res + optionsValue) * (1 + taxRate));
        case SumType.OnlyTax:
            return padEnd((res + optionsValue) * taxRate);
        case SumType.WithOptions:
        default:
            return padEnd(res + optionsValue);
    }
}

export type OrderTotalItem = {
    iva: number,
    baseImp: number
    impIva: number,
    total: number,
}

export const calcOrdersTotalTable = (orders: SubOrder[] = []): OrderTotalItem[] => {
    const allRates: number[] = []
    const orderByTaxRate = orders.reduce((acc, order) => {
        order.items.forEach((item) => {
            const rate = item.taxRate
            const itemTotal = item.price * item.quantity
            if (!acc[rate]) {
                acc[rate] = {
                    rate: rate,
                    total: 0,
                    tax: 0,
                    beforeTax: 0,
                }
                allRates.push(rate)
            }
            acc[rate].total += itemTotal
            acc[rate].tax += itemTotal * rate
            acc[rate].beforeTax += itemTotal - itemTotal * rate
        })

        return acc
    }, ({} as any))

    const result = allRates.sort((a, b) => b - a).map((rate) => {
        return {
            iva: rate * 100,
            baseImp: Number(orderByTaxRate[rate].beforeTax.toFixed(2)),
            impIva: Number(orderByTaxRate[rate].tax.toFixed(2)),
            total: Number(orderByTaxRate[rate].total.toFixed(2))
        }
    })
    if (!allRates.includes(0)) {
        result.push({
            iva: 0,
            baseImp: 0,
            impIva: 0,
            total: 0
        })
    }
    return result
}

/**
 * 桌子基础信息格式化文本
 *
 * @param {tableInfo} TableBase 桌子基础信息（桌号，桌子大小（人数），桌子附属标签集合（用于描述桌子））
 * @return {string|undefined} 返回结合桌子的基础信息最终的显示文本, 若桌子无任何信息则返回 undefined
 */
export const formatTableInfo = (t:any, tableInfo?: TableBase): string | undefined => {
    const res = [];
    if (tableInfo?.size) {
        res.push(t('tableSize', { size: tableInfo.size }));
    }
    if (tableInfo?.type) {
        res.push(tableInfo?.type.map(({ name }) => name).join(", "));
    }
    if (res.length <= 0) {
        return undefined;
    }
    return res.join(', ')
}
