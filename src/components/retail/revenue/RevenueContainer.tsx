import React from "react";
import { View, StyleSheet } from "react-native";

import { withTheme } from "@beppla/tapas-ui";
import ListHeader from "./ListHeader";
import List from "./List";
import PageInfo from "./PageInfo";

const RevenueContainer: React.FC = ({ theme }: { theme: any }) => {
  return (
    <View style={styles.con}>
      <ListHeader />
      <List />
      <PageInfo />
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
