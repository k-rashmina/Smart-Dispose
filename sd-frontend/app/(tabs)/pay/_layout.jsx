import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const PayLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Payment",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="paymentSummary"
        options={{
          headerShown: true,
          title: "Pay Bill",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="currentGarbageCollection"
        options={{
          headerShown: true,
          title: "Current Garbage Collection",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="paymentHistory"
        options={{
          headerShown: true,
          title: "History",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default PayLayout;

const styles = StyleSheet.create({});
