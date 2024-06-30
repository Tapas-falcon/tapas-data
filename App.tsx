import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { getHeaderTitle } from "@react-navigation/elements";
import { RecoilRoot } from "recoil";
import { useTranslation } from "react-i18next";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  TapasThemeProvider as ThemeProvider,
  Button,
  TapasHeader,
  TapasNavigation,
  NavItemType,
} from "@beppla/tapas-ui";
import { getAuthToken } from "./src/apis/auth";
import Retail from "./src/screens/Retail";
import "./i18n";

const Drawer = createDrawerNavigator();

const navItems: any[] = [{ name: "Retail", iconName: "product_items" }];

const systemItems: any[] = [{ name: "Home", iconName: "home" }];

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const { t } = useTranslation();
  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        customfont: require("@beppla/tapas-ui/assets/fonts/customfont.ttf"),
      });

      setFontsLoaded(true);
    }
    loadFonts();
    getAuthToken();
  }, []);
  // @ts-ignore
  return (
    fontsLoaded && (
      <RecoilRoot>
        <View style={{ width: "100%", height: "100vh" } as any}>
          <ThemeProvider mode="dark">
            <NavigationContainer>
              <Drawer.Navigator
                screenOptions={{
                  drawerStyle: {
                    backgroundColor: "#c6cbef",
                    width: "auto",
                  },
                  sceneContainerStyle: {
                    marginLeft: 56,
                  },
                  header: ({ navigation, route, options }) => {
                    const title = getHeaderTitle(options, route.name);
                    return (
                      <TapasHeader
                        headerContainerStyle={{ paddingLeft: 24 }}
                        title={title}
                        searchPlaceholderText="Search"
                      />
                    );
                  },
                }}
                drawerContent={(props) => (
                  <TapasNavigation
                    {...props}
                    navItems={navItems}
                    systemItems={systemItems}
                    logoImg={require("./assets/logo_transparent_white.png")}
                    defaultSelectedItem={{
                      type: NavItemType.Nav,
                      selectedItemIndex: 0,
                    }}
                  />
                )}
              >
                <Drawer.Screen
                  options={{ title: t("retail.label.retailAnalytics") }}
                  name="Retail"
                  component={Retail}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </View>
      </RecoilRoot>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
