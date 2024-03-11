import { selector, selectorFamily } from 'recoil'

import { countState, shellState, usersState } from './atoms'
import { Shell, User } from './type';
import { ListReqParams } from '@/api/types';
import { queryUsers } from '@/api/usersAPI';

export const incrementCount = selector({
  key: 'incrementCount',
  get: ({ get }) => get(countState),
  set: ({ set }) => set(countState, (currCount) => currCount + 1),
});

export const decrementCount = selector({
  key: 'decrementCount',
  get: ({ get }) => get(countState),
  set: ({ set }) => set(countState, (currCount) => currCount - 1),
});

// 选择菜品下的不同级别数据， categories： 类别， items: 当前类别的菜品列表
export const selShellState = selectorFamily({
  key: 'selShellState',
  get: (field: keyof Shell) => ({ get }) => get(shellState)[field],
  set: (field: keyof Shell) => ({ set }, newValue) =>
    set(shellState, prevState => ({ ...prevState, [field]: newValue })),
});

/**
 * 选择器：选择/更新当前操作人
 *
 * @get {} 返回当前操作人用户信息，无绑定当前操作人时 返回 undefined
 * @set {inputIndex} number | string  更新操作人为当前操作人 用户列表索引或用户ID
 */
export const selCurOperator = selectorFamily({
  key: "selCurOperator",
  get: () => ({ get }) => get(usersState).find(({ selected }) => selected),
  set: () => ({ set }, user) => {
    set(usersState, prevState => prevState.map((item) => ({ ...item, selected: (`${item.id}` === `${(user as User).id}`) })))
  }
});


// 触发请求 返回促销活动列表
export const queryOperators = selectorFamily({
  key: 'queryOperators',
  get: (queryParameters: ListReqParams) => async ({ get }) => {
      try {
          const res: any = await queryUsers(queryParameters);
          if (res.error) {
              throw res.error;
          }
          return res;
      } catch (error) {
          console.error("Error fetching users:", error);
          throw new Error("Failed to fetch users");
      }
  },
});

export * from './dishes/dishes.selectors';
export * from './roles/roles.selectors';
export * from './order/order.selectors';
export * from './dailySettlement/dailySettlement.selectors';