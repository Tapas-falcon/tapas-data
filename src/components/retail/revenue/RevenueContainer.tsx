import React from "react";
import { View, StyleSheet } from "react-native";
import { useRequest } from "ahooks";
import { useRecoilState } from "recoil";
import i18next from 'i18next';

import { withTheme } from "@beppla/tapas-ui";
import List from "./List";
import { getStoreList } from "../../../apis/store";
import { selRetailRevenue } from "../../../state/retailRevenue/selector";
import { LanguageCode } from "@beppla/tapas-ui/typescript/Calendar/types";

const RevenueContainer: React.FC = ({ theme }: { theme: any }) => {
  const [, setStories] = useRecoilState(selRetailRevenue('stories'));
  const { loading: productListLoading, run: queryStore } = useRequest(getStoreList, {
    manual: true,
    onSuccess: (data) => {
      console.log(data);
      setStories(data);
    },
    onError: (error) => {
      console.error("error", error);
    },
  });
  // console.log(i18next.language);
  queryStore({
    pageInfo: {
      pageSize: 10,
      pageIndex: 0
    },
    lang: i18next.language as LanguageCode
  });
  return (
    <View style={styles.con}>
      <List />
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
  },
});

export default withTheme(RevenueContainer);
