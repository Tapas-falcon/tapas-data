import React from "react";
import { View, StyleSheet } from "react-native";
import { t } from "i18next";
import { useRecoilState } from "recoil";

import { Tab, Text, TabView, withTheme, Divider } from "@beppla/tapas-ui";
import { selRetailAnalyticsState } from "../state/selector";
import RevenueContainer from "../components/revenue/RevenueContainer";
import OrdersContainer from "../components/orders/OrdersContainer";
import ConsumptionCostContainer from "../components/consumption/ConsumptionCostContainer";
import LaborCostContainer from "../components/labor/LaborCostContainer";
import PurchaseCostContainer from "../components/purchase/PurchaseCostContainer";
import ProfitContainer from "../components/profit/ProfitContainer";
import FixedCostContainer from "../components/fixed/FixedCostContainer";
import AccountingErrorsContainer from "../components/accountingErrors/AccountingErrorsContainer";

const TabTtile = withTheme(
  ({ theme, text }: { theme?: any; text?: string }) => (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={{
        fontSize: theme.fonts.sizeM,
        fontWeight: 600,
        color: theme.colors.colorTextPrimary,
      }}
    >
      {text}
    </Text>
  )
);

const Retail: React.FC = ({ theme }: { theme: any }) => {
  const [tabIndex, setTabIndex] = useRecoilState(
    selRetailAnalyticsState("selTabIndex")
  );
  const tabs = [
    t("retail.revenue.label.tabTitle"),
    t("retail.orders.label.tabTitle"),
    t("retail.consumptionCost.label.tabTitle"),
    t("retail.laborCost.label.tabTitle"),
    t("retail.purchaseCost.label.tabTitle"),
    t("retail.profit.label.tabTitle"),
    t("retail.fixedCost.label.tabTitle"),
    t("retail.accountingErrors.label.tabTitle"),
  ];
  return (
    <View style={styles.con}>
      <View style={styles.tabCon}>
        <Tab
          style={styles.tabInner}
          value={tabIndex as number}
          onChange={(e) => setTabIndex(e)}
          indicatorStyle={{
            backgroundColor: theme.colors.colorTextAccent,
            height: 3,
          }}
          containerStyle={styles.tabContainer}
          buttonStyle={styles.h48}
        >
          {tabs.map((tab) => (
            <Tab.Item title={<TabTtile text={tab} />} />
          ))}
        </Tab>
      </View>
      <Divider />
      <TabView
        value={tabIndex as number}
        onChange={setTabIndex}
        animationType="spring"
      >
        <TabView.Item style={styles.wFull}>
          <RevenueContainer />
        </TabView.Item>
        <TabView.Item style={styles.wFull}>
          <OrdersContainer />
        </TabView.Item>
        <TabView.Item style={styles.wFull}>
          <ConsumptionCostContainer />
        </TabView.Item>
        <TabView.Item style={styles.wFull}>
          <LaborCostContainer />
        </TabView.Item>
        <TabView.Item style={styles.wFull}>
          <PurchaseCostContainer />
        </TabView.Item>
        <TabView.Item style={styles.wFull}>
          <ProfitContainer />
        </TabView.Item>
        <TabView.Item style={styles.wFull}>
          <FixedCostContainer />
        </TabView.Item>
        <TabView.Item style={styles.wFull}>
          <AccountingErrorsContainer />
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  h48: { height: 48 },
  wFull: { width: "100%" },
  tabContainer: {
    height: 48,
    width: 170,
  },
  tabInner: { marginLeft: 16 },
  tabCon: {
    display: "flex",
    flexDirection: "row",
  },
});

export default withTheme(Retail);
