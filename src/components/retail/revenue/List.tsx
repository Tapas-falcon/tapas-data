import React, { useState } from "react";
import { View, StyleSheet, Text, LayoutChangeEvent } from "react-native";

import {
  Divider,
  TapasIcon,
  TapasStaticFixedSizeGrid,
  withTheme,
} from "@beppla/tapas-ui";
import { t } from "i18next";
import ListHeader from "./ListHeader";
import PageInfo from "./PageInfo";
import { useRecoilValue } from "recoil";
import { selRetailRevenue } from "../../../state/retailRevenue/selector";
import { Revenue } from "../../../state/retailRevenue/type";
import { Filter, pageInfo } from "../../../state/common";
import ColumnHeaderCell from "./ColumnHeaderCell";
import Cell from "./Cell";

const columnWidths = [280, 168, 168, 200, 280, 200, 200, 168, 168];

const List: React.FC = ({ theme }: { theme: any }) => {
  const list = useRecoilValue(selRetailRevenue("list")) as Revenue[];
  const filters = useRecoilValue(selRetailRevenue("filters")) as Filter[];
  const pageInfo = useRecoilValue(selRetailRevenue("pageInfo")) as pageInfo;

  const [innerConHeight, setInnerConHeight] = useState<number>(0);
  const [innerConWidth, setInnerConWidth] = useState<number>(0);

  // Inner Container Layout Event to set grid width and height
  const handleInnerConLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (innerConWidth === 0) {
      setInnerConWidth(width);
    }
    if (innerConHeight === 0) {
      setInnerConHeight(height);
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        justifyContent:
          list.length === 0 && filters.length === 0 ? "center" : "flex-start",
      }}
    >
      {list.length === 0 && filters.length === 0 ? (
        <View style={styles.noData}>
          <TapasIcon
            style={styles.noDataIcon}
            name="emoticon_down"
            size={56}
            color={theme.colors.secondary}
          />
          <Text style={{ ...styles.noDataText, color: theme.colors.secondary }}>
            {t("common.label.noData")}
          </Text>
        </View>
      ) : (
        <>
          <ListHeader />
          <View
            style={{
              ...styles.innerListCon,
              backgroundColor: theme.colors.background,
            }}
            onLayout={handleInnerConLayout}
          >
            <TapasStaticFixedSizeGrid
              columnCount={9}
              columnWidth={(index: number) => columnWidths[index]}
              height={innerConHeight}
              rowCount={pageInfo.totalItems}
              border={true}
              rowHeight={(index: number) => 56}
              width={innerConWidth - 2}
              headersRender={({ columnIndex, style }) => (
                <ColumnHeaderCell
                  key={`revenue-column-header-${columnIndex}`}
                  theme={theme}
                  style={style}
                  columnIndex={columnIndex}
                />
              )}
            >
              {Cell as any}
            </TapasStaticFixedSizeGrid>
          </View>
          <Divider />
          <PageInfo />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
    flex: 1,
    position: "relative",
  },
  innerListCon: {
    display: "flex",
    flexDirection: "column",
    marginTop: 60,
    paddingTop: 4,
    flexGrow: 1,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 16,
    overflow: "hidden",
  },
  noData: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
  },
  noDataText: {
    fontSize: 16,
    fontWeight: 700,
  },
  noDataIcon: {
    alignSelf: "center",
  },
});

export default withTheme(List);
