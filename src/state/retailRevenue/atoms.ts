import { atom } from "recoil";
import { RetailRevenueState } from "./type";

export const retailRevenue = atom<RetailRevenueState>({
    key: 'retailRevenue',
    default: {
        stories: [
            {id: "0001", name:"store_a", address:"store_a_address", manager: "user_001"},
            {id: "0002", name:"store_b", address:"store_b_address", manager: "user_002"},
            {id: "0003", name:"store_c", address:"store_c_address", manager: "user_003"},
            {id: "0004", name:"store_d", address:"store_d_address", manager: "user_004"},
            {id: "0005", name:"store_e", address:"store_e_address", manager: "user_005"},
            {id: "0006", name:"store_f", address:"store_f_address", manager: "user_006"},            
            {id: "0007", name:"store_g", address:"store_g_address", manager: "user_007"},            
            {id: "0008", name:"store_h", address:"store_h_address", manager: "user_008"},            
            {id: "0009", name:"store_i", address:"store_i_address", manager: "user_009"},
        ],
        list: [
            {date: new Date("2024-06-01"), stores: [100, 200, 300,400, 500, 600, 700, 800, 900]},
            {date: new Date("2024-06-02"), stores: [100, 200, 300,400, 500, 600, 700, 800, 900]},
            {date: new Date("2024-06-02"), stores: [100, 200, 300,400, 500, 600, 700, 800, 900]},
            {date: new Date("2024-06-02"), stores: [100, 200, 300,400, 500, 600, 700, 800, 900]},
            {date: new Date("2024-06-02"), stores: [100, 200, 300,400, 500, 600, 700, 800, 900]},
            {date: new Date("2024-06-02"), stores: [100, 200, 300,400, 500, 600, 700, 800, 900]},
            {date: new Date("2024-06-02"), stores: [100, 200, 300,400, 500, 600, 700, 800, 900]},
            {date: new Date("2024-06-02"), stores: [100, 200, 300,400, 500, 600, 700, 800, 900]},
        ],
        selectedOptions: {},
        filters: [],
        sorts: [],
        pageInfo: {
            totalItems: 2,
            pageSize: 10,
            page: 1,
            totalPage: 1,
        }
    }
});