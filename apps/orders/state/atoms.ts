import { atom } from 'recoil'
import { AlertState, DrawerShowType, Shell, User } from './type';


export * from './dishes/dishes.atoms';
export * from './roles/roles.atoms';
export * from './order/order.atoms';
export * from './dailySettlement/dailySettlement.atoms';

export const countState = atom({
  key: 'count',
  default: 0,
});

export const headerState = atom({
  key: 'header',
  default: {
    title: '',
    showBack: false,
    showSearch: true,
  },
});

// shell State
export const shellState = atom<Shell>({
  key: 'shell',
  default: {
    secondExpand: true,
    showActionBar: false,
    drawerOpen: false,
    cartOpen: false,
    drawerShowType: DrawerShowType.Null,
    drawerContentModified: false,
    promo: ''
  }
});

export const usersState = atom<User[]>({
  key: 'users',
  default: [],
})

export const curMemberState = atom<User | undefined>({
  key: 'curMember',
  default: undefined
})

export const alertState = atom<AlertState>({
  key: 'alert',
  default: {
    show: false,
    type: 'success',  // success | fail | warn | info
    title: '',
    desc: '',
    hasView: false,
    action: () => {}
  },
});

