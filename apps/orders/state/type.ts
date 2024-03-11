export type AlertState = {
  show?: boolean,
  type?: 'success' | 'fail' | 'warn' | 'info',
  title?: string,
  desc?: string,
  hasView?: boolean,
  action?: () => void
}

export interface Shell {
  secondExpand: boolean;
  showActionBar: boolean;
  drawerOpen: boolean;
  cartOpen: boolean;
  drawerShowType: DrawerShowType,
  drawerContentModified: boolean;
  promo: string;
}

export enum DrawerShowType {
  Null,
  DishesItemDetail,
  OrderDetail
}

export interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
  selected?: boolean;
}

export * from './dailySettlement/types';