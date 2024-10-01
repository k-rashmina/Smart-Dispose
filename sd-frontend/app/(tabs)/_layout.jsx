import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icons from "react-native-vector-icons/Ionicons";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider } from "react-redux";
import store from "../store";

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51PpYQgJ5VKYWP8GFdvyZi38GJtrBjAOppheLVAucYgpz4QqL3dO7Ra7Fhpd19Pcd1JM3wCmmbDcUL9weAKPvp3w500k7KCO1Rn";

const TabIcon = ({ icon, iconFilled, color, title, focused }) => {
  return (
    <View style={styles.tabIcon}>
      {focused ? (
        <Icons name={iconFilled} size={25} color={color} />
      ) : (
        <Icons name={icon} size={25} color={color} />
      )}
      {
        // focused &&
        <Text
          style={{ fontWeight: `${focused ? "bold" : "normal"}`, color: color }}
        >
          {title}
        </Text>
      }
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 84,
              backgroundColor: "#1DB954",
              borderTopWidth: 1,
              borderTopColor: "#EEEEEE",
            },
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#fff",
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  color={color}
                  icon={"home-outline"}
                  iconFilled={"home"}
                  title="Home"
                  focused={focused}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="bins"
            options={{
              title: "Bins",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  color={color}
                  icon={"beaker-outline"}
                  iconFilled={"beaker"}
                  title="Bins"
                  focused={focused}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="pay"
            options={{
              title: "Pay",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  color={color}
                  icon={"cash-outline"}
                  iconFilled={"cash"}
                  title="Pay"
                  focused={focused}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  color={color}
                  icon={"person-outline"}
                  iconFilled={"person"}
                  title="Profile"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      </StripeProvider>
    </Provider>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
});
