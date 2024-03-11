
export interface RoleInfo {
    MainPERMS: MainPERMS[];                    // 一级功能菜单功能权限
    SecondaryPERMS: DishesPERMS[];          // 次级功能权限集合
};

export type MainPERMS =  // 一级菜单功能权限
    "Ordering" |  // 点餐
    "OrderList" | // 订单列表
    "OperationSettlement" |  // 当日营收结算
    "CashierDrawer" | // 现金抽屉
    "DataAnalysis" |  // 数据分析
    "System" // 系统设置
    ;

export type DishesPERMS = // 点餐次级权限集合
    "Promotion" | // 营销推广功能(广告)
    "DataAlgorithmPush" | // 数据算法推送
    "TableSetStep" // 是否需要桌子配置步骤
    ;