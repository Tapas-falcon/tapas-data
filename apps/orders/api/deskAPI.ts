import { DeskStatus, SessionKeys, TableBase, TableType } from "@/state/order/types";
import { API_URL } from "./apiProxy";
// import { deskCountEachStatus, deskTypes, desks } from "./mockData";

const moduleName = '/desk';

export const getCommonHeaders = () => {
    return {
        'Content-Type': 'application/json',
        "x-custom-lang": sessionStorage.getItem(SessionKeys.Language) || 'es'
    };
}

export const queryDeskTypes = (): Promise<TableType[]> => {
    // return new Promise((reslove) => reslove(deskTypes)); // Mock data;
    return fetch(`${API_URL}${moduleName}/deskTypes`, {
        headers: {
            ...getCommonHeaders()
        }
    }).then(res => res.json());
}

export const queryMaxDeskCapactity = (): Promise<number> => {
    // return new Promise((reslove) => reslove(10)); // Mock data;
    return fetch(`${API_URL}${moduleName}/maxDeskCapacity`, {
        headers: {
            ...getCommonHeaders()
        }
    }).then(res => res.json());
}

export const queryDesks = (params: string): Promise<TableBase[]> => {
    // return new Promise((reslove) => reslove(desks as unknown as TableBase[])); // Mock data;
    return fetch(`${API_URL}${moduleName}/desks${params}`, {
        headers: {
            ...getCommonHeaders()
        }
    }).then(res => res.json());
}

export const queryDeskCountEachStatus = (): Promise<any> => {
    // return new Promise((reslove) => reslove(deskCountEachStatus)); // Mock data;   
    return fetch(`${API_URL}${moduleName}/deskCountEachStatus`, {
        headers: {
            ...getCommonHeaders()
        }
    }).then(res => res.json());
}

export const updateDeskStatus = (deskId: string, status: DeskStatus): Promise<any> => {
    // const choosedDesk = desks.find((desk) => desk._id === deskId);
    // if (choosedDesk) {
    //     choosedDesk.status = status.toLowerCase();
    // }
    // return new Promise((reslove) => reslove(true)); // Mock data;
    const data = {
        _id: deskId || sessionStorage.getItem(SessionKeys.Table),
        status
    };
    return fetch(`${API_URL}${moduleName}/desks`, {
        method: 'POST',
        headers: {
            ...getCommonHeaders()
        },
        body: JSON.stringify(data),
    }).then(res => res.json());
}