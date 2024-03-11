import { atom } from "recoil";
import { DishesState } from "./types";

/**************  菜品数据对象相关 State 申明  ***************/
export const dishes = atom<DishesState>({
    key: 'dishes',
    default: {
        tags: [],
        filters: [],
        categories: [],
        promotions:[],
        dishes: [],
        loading: {
            categories: false,
            dishes: false
        }
    }
});