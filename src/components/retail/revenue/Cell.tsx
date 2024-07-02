import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {t} from 'i18next'

import { withTheme } from "@beppla/tapas-ui";
import { ChildrenProps } from '@beppla/tapas-ui/typescript/Grid/StaticFixedSizeGrid';
import { useRecoilValue } from 'recoil';
import { selRetailRevenue } from '../../../state/retailRevenue/selector';
import { Revenue } from '../../../state/retailRevenue/type';


const fieldKeys = [
    // "name",
    // "category",
    // "status",
    // "total",
    // "capacity",
    // "grossProfit",
    // "wholesalePrice",
    // "fixedCost",
    // "storage",
  ];
  
  interface CellProps extends ChildrenProps {
    theme?: any;
  }
  // Grid Cell
  const Cell: React.FC<CellProps> = ({ columnIndex, rowIndex, style, theme }) => {
    const list = useRecoilValue(selRetailRevenue("list"));
    const row = list[rowIndex];
  
    const renderCell = (columnIndex: number, row: Revenue) => {
      switch (fieldKeys[columnIndex]) {
        case "name":
          return (
            <View style={styles.column}>
              <Text style={{ ...styles.main, color: theme.colors.primary }}>
                {row[fieldKeys[columnIndex]] ?? ""}
              </Text>
              <Text style={{ ...styles.sub, color: theme.colors.secondary }}>
                {/* {t("tasks.label.id", { id: row.id ?? "" })} */}
              </Text>
            </View>
          );
        case "category":
          return (
            <View style={styles.column}>
              <Text style={{ ...styles.normal, color: theme.colors.primary }}>
                {row[fieldKeys[columnIndex]] ?? ""}
              </Text>
            </View>
          );
        case "status":
          let type;
        //   switch (row[fieldKeys[columnIndex]]) {
        //     case InventoryStatus.AlmostDepleted:
        //       type = 'warning';
        //       break;
        //     case InventoryStatus.Depleted:
        //       type = 'error';
        //       break;
        //     case InventoryStatus.Adequate:
        //     default:
        //       type = 'success';
        //       break;
        //   }
          return (
            <></>
            //   <StatusTag tag={row[fieldKeys[columnIndex]] ?? ""} type={type} />
          );
        case "total":
        case "capacity":
        case "grossProfit":
        case "wholesalePrice":
        case "fixedCost":
          return (
            <View style={styles.column}>
              <Text style={{ ...styles.number, color: theme.colors.primary }}>
                {row[fieldKeys[columnIndex]] ?? ""}
              </Text>
            </View>
          );
        case "storage":
          return (
            <View style={styles.column}>
              {/* <Text style={{ ...styles.main, color: theme.colors.primary }}>
                {row[fieldKeys[columnIndex]] ?? ""}
              </Text>
              {row[fieldKeys[columnIndex]] > 0 && (
                <Text style={{ ...styles.sub, color: theme.colors.secondary }}>
                  {row.unitVal}
                  {row.unit} {t("tasks.label.each")}
                </Text>
              )} */}
            </View>
          );
        default:
      }
    };
  
    return (
      <div
        key={`revenue-grid-${rowIndex}-${columnIndex}`}
        style={{ ...style, ...styles.cell, color: theme.colors.colorTextPrimary }}
      >
        {renderCell(columnIndex, row)}
      </div>
    );
  };
  
  const styles = StyleSheet.create({
    cell: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: 400,
    },
    column: {
      display: "flex",
      flexDirection: "column",
      marginLeft: 16,
      marginRight: 16,
      flexGrow: 1,
      justifyContent: "center",
    },
    normal: {
      fontSize: 14,
      fontWeight: 400,
    },
    number: {
      fontSize: 14,
      fontWeight: 400,
      alignSelf: "flex-end",
    },
    main: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 17,
    },
    sub: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 14,
    },
  });
  
  export default withTheme(Cell);