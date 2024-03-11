export interface UserInfo {
    id: string;
    storeId: string;
    name: string;
    phone: number;
    role: string;
    curOperator?: {
        id: string;
        name: string;
    };
}