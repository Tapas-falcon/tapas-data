import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { t } from "i18next";

import {
  TapasButton,
  TapasCheckBox,
  withTheme,
  Input,
  TapasIcon,
} from "@beppla/tapas-ui";
import { useRecoilValue } from "recoil";
import { selRetailRevenue } from "../../../../state/retailRevenue/selector";
import { groupBy } from "../../../../utils/common";
import { Store } from "../../../../state/retailRevenue/type";

const StoreList: React.FC = ({ theme }: { theme: any }) => {
  const [search, setSearch] = React.useState("");
  const [groupObj, setGroupObj] = React.useState<Record<string, Store[]>>({});
  const stores = useRecoilValue(selRetailRevenue("stories")) as Store[];
  useEffect(() => {
    console.log(stores);
    setGroupObj(groupBy(stores, (item: any) => item?.city ?? ""));
  }, [stores]);
  return (
    <div style={{ ...styles.con, boxShadow: theme.colors.boxShadow }}>
      <View style={styles.headerLine}>
        <TapasCheckBox
          mode="light"
          label={t("retail.revenue.label.allStores")}
        />
        <TapasButton type="clear">{t("common.button.clearAll")}</TapasButton>
      </View>
      <Input
        placeholder={t("common.placeholder.search")}
        leftIcon={
          <TapasIcon name="search" size={24} color={theme.colors.grey1} />
        }
        containerStyle={{
          ...styles.searchContainer,
          borderTopColor: theme.colors.greyOutline,
          borderBottomColor: theme.colors.greyOutline,
        }}
        inputContainerStyle={styles.searchInputContainer}
        onChangeText={() => {}}
      />
      {Object.entries(groupObj).map(([key, stores]) => (
        <View key={key} style={styles.group}>
          <Text>{key}</Text>
          {stores.map((store) => (
            <TapasCheckBox key={store.id} mode="light" label={store.name} />
          ))}
        </View>
      ))}
    </div>
  );
};

const styles = StyleSheet.create({
  con: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
    height: 336,
    width: 480,
    borderRadius: 12,
  },
  headerLine: {
    marginTop: 16,
    marginLeft: 4,
    marginRight: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  group: {
    display: "flex",
    flexDirection: "column",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginRight: 8,
    paddingLeft: 16,
    paddingRight: 40,
    paddingVertical: 8,
    height: 48,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  searchInputContainer: {
    borderBottomWidth: 0,
    height: "100%",
    width: "100%",
  },
});

export default withTheme(StoreList);
