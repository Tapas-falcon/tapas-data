import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { t } from "i18next";

import { TapasButton, TapasCustomDropdown, withTheme } from "@beppla/tapas-ui";
import { FilterKeys } from "./type";
import { isMobile } from "../../../utils/common";

const ListHeader: React.FC = ({ theme }: { theme: any }) => {
  const [visible, setVisible] = useState<keyof typeof FilterKeys | "">("");
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.content}
      style={{
        ...styles.container,
        zIndex: visible ? 1 : undefined,
      }}
    >
      <View style={styles.leftCon}>
        <View style={styles.btn}>
          <TapasCustomDropdown
            // value={time}
            onPress={() =>
              setVisible(visible === FilterKeys.store ? "" : FilterKeys.store)
            }
            onClose={() => setVisible("")}
            isVisible={visible === FilterKeys.store}
            width={123}
            // @ts-ignore
            subWidth={isMobile ? "100%" : 480}
            subContainerPosition={"left"}
          >
            <View>
              {/* <TapasCalendar languageCode="es" height={436} autoSize={false} /> */}
            </View>
          </TapasCustomDropdown>
        </View>
      </View>
      <View style={styles.rightCon}>
        <TapasButton
          // disabled={Object.values(selOption).filter((item) => item).length <= 0}
          type="clear"
        >
          {t("common.button.reset")}
        </TapasButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    height: "100%",
    paddingHorizontal: 24,
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    right: 0,
    left: 0,
  },
  content: {
    width: "100%",
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    flex: undefined,
  },
  leftCon: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    height: 40,
    justifyContent: "flex-start",
    gap: 8,
  },
  rightCon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 40,
    marginLeft: 24,
  },
});

export default withTheme(ListHeader);
