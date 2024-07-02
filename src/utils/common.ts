import { Platform } from 'react-native';

export const isMobile = Platform.OS !== 'web' || (Platform.OS === 'web' && window.innerWidth <= 430);

export const groupBy = (array: any[], getKey: (item: any) => string) => {
    const res = {};
    array.forEach((item) => {
        console.log(item);
        const key = getKey(item);
        if (!res[item[key]]) {
            res[item[key]] = [];
        }
        res[item[key]].push(item);
        res[item[key]] = res[item[key]].sort();
    });
    return res;
};
