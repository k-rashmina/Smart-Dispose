import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
  Switch,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePaymentIntentMutation } from "../../store/apiSlice";
import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";

const PaymentSummary = () => {
  // Initialize state variables
  const [customerName, setCustomerName] = useState("Michel Esther");
  const [billingPeriod, setBillingPeriod] = useState("01 Jul - 31 Jul 2024");
  const [organicWasteCost, setOrganicWasteCost] = useState(520.45);
  const [hazardousWasteCost, setHazardousWasteCost] = useState(360.0);
  const [plasticWasteCost, setPlasticWasteCost] = useState(580.35);
  const [subtotal, setSubtotal] = useState(1460.8);
  const [tax, setTax] = useState(116.86);
  const [serviceFee, setServiceFee] = useState(500.0);
  const [recyclingPayback, setRecyclingPayback] = useState(-383.5);
  const [totalAmountDue, setTotalAmountDue] = useState(1694.16);
  const [points, setPoints] = useState(2000);
  const [redeemPoints, setRedeemPoints] = useState(false);

  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const router = useRouter();

  // Calculate the updated total amount due after applying discount
  const discountAmount = 346;
  const finalAmountDue = redeemPoints
    ? totalAmountDue - discountAmount
    : totalAmountDue;

  // Disable switch if points are equal to or less than zero
  const isSwitchDisabled = points <= 0;

  const handleRedeemToggle = (value) => {
    setRedeemPoints(value);
  };

  const { isLoading, isError, isSuccess, error } = useSelector(
    (state) => state.api
  );

  const dispatch = useDispatch();

  const onCheckout = async () => {
    // 1. Create Payment Intent
    const response = await createPaymentIntent({
      amount: Math.floor(finalAmountDue * 100),
    });
    console.log(response);
    if (response.error) {
      Alert.alert("Something went wrong");
      return;
    }

    // 2. Initialize Payment Sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "Smart Dispose",
      customerName: customerName,
      paymentIntentClientSecret: response.data.paymentIntent,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert("Something went wrong");
      return;
    }

    // 3. Present Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      console.log(paymentResponse.error);
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    } else {
      Alert.alert("Payment Successful");
      // router.push("/paymentHistory");
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={styles.circleFilled} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>

      {/* Payment Summary */}
      <View style={styles.summaryTitleContainer}>
        <Text style={styles.summaryTitle}>Payment Summary</Text>
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Customer Name</Text>
          <Text style={styles.value}>{customerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Billing Time Period</Text>
          <Text style={styles.value}>{billingPeriod}</Text>
        </View>

        <View style={styles.horizontalLine} />

        {/* Charges */}
        <View style={styles.row}>
          <Text style={styles.label}>Organic Waste Collection</Text>
          <Text style={styles.value}>Rs.{organicWasteCost.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Hazardous Waste Collection</Text>
          <Text style={styles.value}>Rs.{hazardousWasteCost.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Plastic Waste Collection</Text>
          <Text style={styles.value}>Rs.{plasticWasteCost.toFixed(2)}</Text>
        </View>

        <View style={styles.horizontalLine} />

        {/* Subtotal, Tax, and Fees */}
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>Rs.{subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.horizontalLine} />

        <View style={styles.row}>
          <Text style={styles.label}>Tax (8%)</Text>
          <Text style={styles.value}>Rs.{tax.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Service Fee</Text>
          <Text style={styles.value}>Rs.{serviceFee.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Recycling Payback</Text>
          <Text style={styles.valueGreen}>
            -Rs.{Math.abs(recyclingPayback).toFixed(2)}
          </Text>
        </View>

        <View style={styles.horizontalLine} />

        {/* Redeem Points Toggle */}
        <View style={styles.redeemRow}>
          <Text style={styles.redeemText}>Redeem My Point</Text>
          <Switch
            value={redeemPoints}
            onValueChange={handleRedeemToggle}
            trackColor={{ false: "#767577", true: "#1DB954" }}
            thumbColor={redeemPoints ? "#1DB111" : "#f4f3f4"}
            disabled={isSwitchDisabled}
          />
        </View>

        <View style={styles.horizontalLine} />

        {/* Total */}
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total Amount Due</Text>
          <Text style={styles.totalValue}>Rs.{finalAmountDue.toFixed(2)}</Text>
        </View>

        <View style={styles.horizontalLine} />

        {/* Continue Button */}
        <Pressable onPress={onCheckout} style={styles.button}>
          <Text style={styles.buttonText}>
            Checkout
            {isLoading && <ActivityIndicator />}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  goBackButton: {
    width: 50,
    height: 50,
  },

  progressBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 2,
    borderColor: "#1DB954",
    marginHorizontal: 5,
  },
  circleFilled: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#1DB954",
    marginHorizontal: 5,
  },
  summaryTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1DB954",
  },
  detailsContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
  },
  horizontalLine: {
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    marginVertical: 12.5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3.5,
  },
  label: {
    fontSize: 16,
    color: "#777",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  redeemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  redeemText: {
    fontSize: 16,
    color: "#333",
  },
  valueGreen: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1DB954",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  cardImage: {
    width: 50,
    height: 30,
  },
  changePayment: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1DB954",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default PaymentSummary;
