import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Layout from "@/components/Layout";
import clsx from "clsx";
import { Box, Sheet } from "@mui/joy";
import { ReactElement } from "react";
import { useRecoilState } from "recoil";

import { selCurOperator, selCurOrderOperate, selShellState } from "@/state/selectors";
import DishesContainer from "@/components/Dishes/dishes-con";
import Categories from "@/components/Dishes/categories";
import ActionBar from "@/components/ActionBar";
import OrderingBar from "@/components/OrderingBar";
import PageTransition from "@/components/PageTransition";
import DishesOptions from "@/components/Dishes/dishes-options";
import { Item, SubOrder } from "@/state/order/types";
import { calcFinalPriceForOrderItem } from "@/components/Dishes/util";
import getSwitchUserModal from "@/components/SwitchUser";
import Cart from "@/components/Dishes/cart";

export default function Dishes() {
  const t = useTranslations("common");

  const [curOrder, setCurOrder] = useRecoilState(selCurOrderOperate("curOrder"));

  // 订阅购物车列表开启状态
  const [, setCartOpen] = useRecoilState(selShellState("cartOpen"));

  const [operator, setOperator] = useRecoilState(
    selCurOperator("selCurOperator")
  );

  const { modal, openModal, setModelOpen } = getSwitchUserModal();

  // if (!operator) {
  //   openModal({
  //     initialVal: "",
  //     onCancel: () => {
  //       setModelOpen(false);
  //     },
  //     onSwitched: (users) => {
  //       const choosedUser = users.find((u) => u.selected) ?? users[0];
  //       setOperator(choosedUser);
  //       setModelOpen(false);
  //     },
  //   });
  // }
  
  // if (!curOrder) {
  //   setCurOrder({
  //     order: {
  //       items: [],
  //       recommends: [],
  //       createdBy: operator,
  //     },
  //   });
  // }

  const [showActionBar, setShowActionBar] = useRecoilState(
    selShellState("showActionBar")
  );

  const sum = (items: Item[]): number =>
    items
      .map(({ quantity }) => quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const total = (items: Item[]): number =>
    items
      .map((item): number =>
        parseFloat(calcFinalPriceForOrderItem(item, item.quantity))
      )
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <PageTransition className="w-full h-full">
      <Box className="flex w-full flex-col grow relative overflow-hidden">
        <DishesContainer></DishesContainer>
        <Box className="absolute inset-x-6 bottom-4">
          {showActionBar && (
            <ActionBar
              text="Get €3.00 off, when you spend €1.50 more!"
              secondaryText="Available date: Dec 20 - 25, 2023"
            />
          )}
          <OrderingBar
            total={total((curOrder as SubOrder)?.items ?? [])}
            secondaryText={t("Cancel")}
            confirmText={t("Confirm")}
            disabled={sum((curOrder as SubOrder)?.items ?? []) === 0}
            cartCount={sum((curOrder as SubOrder)?.items ?? [])}
            className="relative z-20"
            onSecondary={() => setShowActionBar((show) => !show)}
            onConfirm={() => setCartOpen(true)} //router.push("/ordering/payment-detail")}
          />
        </Box>
        <DishesOptions></DishesOptions>
        <Cart></Cart>
      </Box>
    </PageTransition>
  );
}

function OrderNav() {
  const [secondExpand, setSecondExpand] = useRecoilState(
    selShellState("secondExpand")
  );

  return (
    <Sheet
      variant="soft"
      color="primary"
      className={clsx("h-full", {
        "w-full": true
        // "w-14": !secondExpand,
        // "w-56": secondExpand,
      })}
    >
      <Categories></Categories>
    </Sheet>
  );
}
Dishes.getLayout = function getLayout(page: ReactElement) {
  return <Layout secondaryNav={<OrderNav />}>{page}</Layout>;
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
    },
  };
}
