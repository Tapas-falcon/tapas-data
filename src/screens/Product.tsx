import React from "react";
import { View, StyleSheet } from "react-native";
import { t } from "i18next";
import { useRecoilState } from "recoil";

import { Tab, Text, TabView, withTheme, Divider } from "@beppla/tapas-ui";
import { selProductAnalyticsState } from "../state/selector";
import SalesVolumeContainer from "../components/prouct/sales/SalesVolumeContainer";
import RevenueContainer from "../components/prouct/revenue/RevenueContainer";
import ConsumptionCostContainer from "../components/prouct/consumption/ConsumptionCostContainer";
import ProfitContainer from "../components/prouct/profit/ProfitContainer";

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

const Product: React.FC = ({ theme }: { theme: any }) => {
  const [tabIndex, setTabIndex] = useRecoilState(
    selProductAnalyticsState("selTabIndex")
  );
  const tabs = [
    t("product.salesVolume.label.tabTitle"),
    t("product.revenue.label.tabTitle"),
    t("product.consumptionCost.label.tabTitle"),
    t("product.profit.label.tabTitle"),
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
        <TabView.Item style={styles.wFull}><SalesVolumeContainer /></TabView.Item>
        <TabView.Item style={styles.wFull}><RevenueContainer /></TabView.Item>
        <TabView.Item style={styles.wFull}><ConsumptionCostContainer /></TabView.Item>
        <TabView.Item style={styles.wFull}><ProfitContainer /></TabView.Item>
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

export default withTheme(Product);
