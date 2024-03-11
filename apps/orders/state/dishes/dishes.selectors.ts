import { selectorFamily } from "recoil";
import { queryDishesReq, queryMenuCategoriesReq, queryPromotionsReq, queryTagsReq } from "@/api/dishesAPI";

import { DishesItem, DishesItemKey, DishesState, Option, OptionGroup, SelectType, setOptionParam } from "./types";
import { dishes } from "./dishes.atoms";
import { ListReqParams } from "@/api/types";

/**************  选择器  ***************/
// 触发请求获取餐品类别列表
export const queryMenuCategories = selectorFamily({
    key: 'queryMenuCategories',
    get: (queryParameters: ListReqParams) => async ({ get }) => {
        try {
            const res: any = await queryMenuCategoriesReq(queryParameters);
            if (res.error) {
                throw res.error;
            }
            return res.data;
        } catch (error) {
            console.error("Error fetching menu categories:", error);
            throw new Error("Failed to fetch menu categories");
        }
    },
});

// 触发请求获取列表Tag列表
export const queryTags = selectorFamily({
    key: 'queryTags',
    get: (queryParameters: ListReqParams) => async ({ get }) => {
        try {
            const res: any = await queryTagsReq(queryParameters);
            if (res.error) {
                throw res.error;
            }
            return res.data;
        } catch (error) {
            console.error("Error fetching tags:", error);
            throw new Error("Failed to fetch tags");
        }
    },
});

// 触发请求 返回促销活动列表
export const queryPromotions = selectorFamily({
    key: 'queryPromotions',
    get: (queryParameters: ListReqParams) => async ({ get }) => {
        try {
            const res: any = await queryPromotionsReq(queryParameters);
            if (res.error) {
                throw res.error;
            }
            return res.data;
        } catch (error) {
            console.error("Error fetching promotions:", error);
            throw new Error("Failed to fetch promotions");
        }
    },
});

// 触发请求 返回促销活动列表
export const queryDishes = selectorFamily({
    key: 'queryDishes',
    get: (queryParameters: ListReqParams) => async ({ get }) => {
        try {
            const res: any = await queryDishesReq(queryParameters);
            if (res.error) {
                throw res.error;
            }
            return res.data;
        } catch (error) {
            console.error("Error fetching dishes:", error);
            throw new Error("Failed to fetch dishes");
        }
    },
});

// 选择菜品下的不同级别数据， categories： 类别， items: 当前类别的菜品列表
export const selDishesState = selectorFamily({
    key: 'selDishesState',
    get: (field: keyof DishesState) => ({ get }) => get(dishes)[field],
    set: (field: keyof DishesState) => ({ set }, newValue) =>
        set(dishes, prevState => ({ ...prevState, [field]: newValue })),
});

// 选择菜品下不同级别数据集合的加载状态， true： 加载中， false： 加载完毕
export const selDishesLoadingState = selectorFamily({
    key: 'selDishesLoadingState',
    get: (field: DishesItemKey) => ({ get }) => get(dishes).loading[field],
    set: (field: DishesItemKey) => ({ set }, newValue) =>
        set(dishes, prevState => ({ ...prevState, loading: { ...prevState.loading, [field]: newValue } })),
});

// 选择菜品下配置项状态
export const selectedDishesOptionsState = selectorFamily<setOptionParam | Option[], 'options'>({
    key: 'selectedDishesOptionsState',
    get: (field: 'options') => ({ get }) => {
        let res: Option[] = [];
        get(dishes).curDishes?.options.forEach(({ children }) => {
            res = res.concat(children);
        });
        return res.filter((item) => item?.checked);
    },
    set: (field: 'options') => ({ set }, newValue) => {
        const { groupKey, key, checked } = newValue as setOptionParam;
        if (!groupKey || !key) {
            return;
        }
        set(dishes, prevState => {
            const item = prevState.curDishes;
            if (!item) {
                return ({ ...prevState, });
            }
            const options = item.options.map((group) => ({
                ...group,
                children: group.key === groupKey ? group.children.map((child) => ({
                    ...child,
                    checked: child.key === key ? checked : (group.selectType.key === SelectType.Single ? false : child.checked)
                })) : group.children
            }));
            const res = { ...item, options };   
            const dishes = prevState.dishes.map((dishesItem) => (dishesItem.id === res.id ? res : dishesItem));   
            return ({ ...prevState, dishes, curDishes: res });
        });
    }
});
