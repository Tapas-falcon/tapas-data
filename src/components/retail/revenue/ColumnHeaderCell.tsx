import { View, Text, StyleSheet } from "react-native";
import { t } from "i18next";

import { TapasIcon, withTheme } from "@beppla/tapas-ui";
import { ChildrenProps } from "@beppla/tapas-ui/typescript/Grid/StaticFixedSizeGrid";

const columnHeaderLabels = [
  "colProuctName",
  "colCategory",
  "colStatus",
  "colTotalOrderQuantity",
  "colDailyManufacturingCapacity",
  "colGrossProfit",
  "colWholesalePrice",
  "colFixedCost",
  "colRemainingStorage",
];

const numberColumns = [3, 4, 5, 6, 7];

const sortableColumns = [3, 4, 5, 6, 7, 8];

interface ColumnHeaderCellProps extends ChildrenProps {
  theme?: any;
}

const ColumnHeaderCell: React.FC<ColumnHeaderCellProps> = ({
  columnIndex,
  style,
  theme,
}) => (
  <div
    style={{
      ...style,
      ...styles.columnHeaderCell,
      zIndex: 5,
      color: theme.colors.colorTextSecondary,
    }}
  >
    <View
      style={{
        ...styles.inner,
        justifyContent: numberColumns.includes(columnIndex)
          ? "flex-end"
          : "flex-start",
      }}
    >
      <Text>{t(`tasks.label.${columnHeaderLabels[columnIndex]}`)}</Text>
      {sortableColumns.includes(columnIndex) && (
        <View style={styles.sort}>
          <TapasIcon style={styles.arrowTop} name="arrow_drop_up" size={16} />
          <TapasIcon
            style={styles.arrowBottom}
            name="arrow_drop_down"
            size={16}
          />
        </View>
      )}
    </View>
  </div>
);

const styles = StyleSheet.create({
  columnHeaderCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
    lineHeight: 20,
  },
  sort: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: 20,
    position: "relative",
    width: 14,
    overflow: "hidden",
  },
  arrowTop: {
    position: "absolute",
    top: -2,
    right: -4,
  },
  arrowBottom: {
    position: "absolute",
    bottom: -4,
    right: -4,
  },
});

export default withTheme(ColumnHeaderCell);
