import { Filter } from "@/api/types";
import { Discount } from "../order/types";

export type DishesItemKey = 'categories' | 'dishes';

export interface MenuCatgorie {
    name: string;
    description: string;
    icon: string;
    id: string;
}

export interface DishesState {
    categories: Categorie[];
    dishes: DishesItem[];
    promotions: Promotion[];
    tags: Tag[];
    curDishes?: DishesItem;
    filters: Filter[];
    selectedCategorie?: Categorie;
    loading: {
        categories: boolean;
        dishes: boolean;
    }
}

export interface Tag {
    name: string;
    description: string;
    key: string;
    groupKey: string;
    icon: string;
    img: string;
    objId: string;
}

export interface Categorie {
    objId: string;
    id: string;
    name: string;
    icon: string;
    description: string;
}

export interface DishesItem {
    _id: string;
    id: string;
    name: string;
    description: string;
    ingredients: Ingredient[];
    tags: Tag[];
    options: OptionGroup[];
    allergens: Allergen[];
    price: number;
    isTaxInclude: boolean;
    taxRate: number;
    image: string;
    disabled: boolean;
    discount?: Discount;
}

export interface setOptionParam { groupKey: string; key: string, checked: boolean };

export interface OptionGroup extends Option {
    selectType: { key: SelectType };
    children: Option[];
}

export interface Option {
    id: string;
    name: string;
    description: string;
    key: string;
    state: OptionState;
    groupKey: string;
    icon: string;
    img: string;
    extra?: number;
    checked?: boolean;
}

export enum OptionState {
    Active = 'active',
    Disabled = 'disabled',
}

export enum SelectType {
    Multi = 'MULTI',
    Single = 'SINGLE'
}

export interface Allergen {
    key: string;
    name: string;
    description: string;
    icon: string;
    img: string;
    groupKey: string;
}
export interface Ingredient {
    description: string;
    icon: string;
    id: string;
    img: string;
    name: string;
    price: number;
    unit: Unit;
    weight: number;
}

export interface Unit {
    key: string;
    name: string;
    description: string;
    icon: string;
    img: string;
    groupKey: string;
}

export interface Promotion {
    id: string;
    img: string;
    name: string;
    // targetDishes: Record<string, any>;
    description: string;
    targetDishes: { id: string, price: number };
    discount: Discount;
    // discountType: DiscountType;
    // discountValue: number;
    // discountLimitType: DiscountLimitType;
    // discountLimitValue: number;
    startAt: Date;
    endAt: Date;
    // state: PromotionState;
}

export enum DiscountLimitType { // 折扣触发类型
    money = 'MONEY', // 购买金额超过最低触发线
    quantity = 'QUANTITY', // 购买数量超过最低触发线
    combo = 'COMBO', // 购买套餐
}


export enum DiscountType { // 折扣类型
    percentage = 'PERECENTAGE', // 百分比折扣
    money = 'MONEY', // 数据减折扣
}

export enum CommonState {
    DRAFT = 'DRAFT', // 默认初始状态
    ACTIVE = 'ACTIVE', // 激活状态
    INACTIVE = 'INACTIVE', // 未激活状态
    EXPIRED = 'EXPIRED', // 过期状态
    ARCHIVED = 'ARCHIVED', // 归档状态
}