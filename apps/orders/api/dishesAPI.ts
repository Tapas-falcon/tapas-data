import { useRouter } from "next/router";
import { ListReqParams } from "./types";
import { categories, tags, promotions, dishes } from "./mockData";
import { API_URL } from "./apiProxy";

export enum reqs {
    categoriesList = "/menuCategories/list",
    tags = "/dishes/tags",
    promotions = "/promotions/list",
    dishes = "/dishes/list",
    getDishesWithIds = "/dishes/"
}



export const queryMenuCategoriesReq = (reqBody: ListReqParams) => {
    const router = useRouter();
    // // real APi for categories
    return fetch(`${API_URL}${reqs.categoriesList}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...(reqBody ?? {}), lang: router.locale ?? 'es' }),
    })
        .then(res => res.json())
        .then(data => data);

    // // using mock data;
    // return new Promise((reslove) => {
    //     setTimeout(() => { reslove(categories) });
    // });

};

export const queryTagsReq = (reqBody: ListReqParams) => {
    const router = useRouter();
    // // real APi for categories
    return fetch(`${API_URL}${reqs.tags}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...(reqBody ?? {}), lang: router.locale ?? 'es' }),
    })
        .then(res => res.json())
        .then(data => data);

    // using mock data;
    // return new Promise((reslove) => {
    //     const tagsMap = new Map();
    //     if (!reqBody.filters?.[0]?.values[0]) {
    //         reslove({ data: [] });
    //     } else {
    //         setTimeout(() => {
    //             const data = dishes.data.filter(({ category }) => category.id === reqBody.filters?.[0]?.values[0]).map(({ tags }) => tags).reduce((arr1, arr2) => arr1 = arr1.concat(arr2), []).filter((tag) => {
    //                 if (!tagsMap.has(tag.key)) {
    //                     tagsMap.set(tag.key, tag);
    //                     return true;
    //                 }
    //                 return false;
    //             });
    //             reslove({ data })
    //         });
    //     }
    // });

};

export const queryPromotionsReq = (reqBody: ListReqParams) => {
    const router = useRouter();
    // // real APi for categories
    return fetch(`${API_URL}${reqs.promotions}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...(reqBody ?? {}), lang: router.locale ?? 'es' }),
    })
        .then(res => res.json())
        .then(data => data);

    // using mock data;

    // return new Promise((reslove) => {
    //     const dishesIds = dishes.data.filter(({ category }) => category.id === reqBody.filters?.[0]?.values[0]).map(({ id }) => id);
    //     setTimeout(() => { reslove({data: promotions.data.filter(({ targetDishes }) => dishesIds.includes(targetDishes.id))}) });
    // });

};

export const queryDishesReq = (reqBody: ListReqParams) => {
    const router = useRouter();
    const { filters } = reqBody;
    const [fCategoryId] = filters?.find(({ field }) => field === 'categoryId')?.values ?? [];
    // // real APi for categories
    return fetch(`${API_URL}${reqs.dishes}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...(reqBody ?? {}), lang: router.locale ?? 'es' }),
    })
        .then(res => res.json())
        .then(data => data);

    // using mock data;

    // let data = dishes.data;
    // if (fCategoryId) {
    //     data = dishes.data.filter(({ categoryId }) => categoryId === fCategoryId);
    // }
    // const res = {
    //     data, pageIndex: 1,
    //     totalCount: data.length,
    //     totalPages: 1
    // }
    // // dishes.totalCount = dishes.data.length;
    // return new Promise((reslove) => {
    //     setTimeout(() => { reslove(res) });
    // });

};


export const queryDishes = (ids: string) => fetch(`${API_URL}${reqs.getDishesWithIds}${ids}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(res => res.json()).then(data => data);