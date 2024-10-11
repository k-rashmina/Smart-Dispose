import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
  Switch,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePaymentIntentMutation } from "../../store/apiSlice";
import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";
import {
  generateMonthlyBill,
  markBillsAsPaid,
} from "../../library/apiRequests/monthlyBillClient";
import { getCustomerByEmail } from "../../library/apiRequests/customerDetailsClient";
import { formatDateRange } from "../../utils/common/dateFormat";
import {
  getCustomerPoints,
  updateCustomerPoints,
} from "../../library/apiRequests/customerPointsClient";
import { savePayment } from "../../library/apiRequests/paymentClient";
import { ConvertToUTC } from "../../utils/common/timeUtil";

const paymentSummary = () => {
  // Initialize state variables
  const [customerName, setCustomerName] = useState();
  const [totalAmountDue, setTotalAmountDue] = useState();
  const [points, setPoints] = useState({});
  const [redeemPoints, setRedeemPoints] = useState();
  const [customerDetails, setCustomerDetails] = useState({});
  const [monthlyBill, setMonthlyBill] = useState({});
  const [loading, setLoading] = useState(true);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmountDue, setFinalAmountDue] = useState(0);
  const [peneltyAmount, setPeneltyAmount] = useState(0);
  const [allBillsPaid, setAllBillsPaid] = useState(true);

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const router = useRouter();

  // Fetch customer details on component mount
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const customer = await getCustomerByEmail();
        setCustomerDetails(customer);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerDetails();
  }, []);

  // Fetch monthly bill and points
  useEffect(() => {
    const fetchMonthlyBillWithPoints = async () => {
      try {
        const bill = await generateMonthlyBill();
        if (bill === true) {
          setAllBillsPaid(true);
        } else {
          setMonthlyBill(bill);
        }

        if (typeof bill === "object") {
          setAllBillsPaid(false);
        }

        console.log(allBillsPaid);

        const initialTotalAmount =
          bill.monthlyCharge + bill.totalOutstandingAmount;
        setTotalAmountDue(initialTotalAmount);

        const pointsResponse = await getCustomerPoints();
        setPoints(pointsResponse.points);

        const calculatedDiscount =
          (pointsResponse.points / 100) * bill.monthlyCharge;

        if (calculatedDiscount < 0) {
          setPeneltyAmount(-calculatedDiscount);

          setFinalAmountDue(initialTotalAmount + calculatedDiscount);
        } else {
          setDiscountAmount(calculatedDiscount);
        }
      } catch (error) {
        console.error("Error fetching bill or points:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyBillWithPoints();
  }, []);
  const billingTimePeriod = formatDateRange(
    monthlyBill.startDate,
    monthlyBill.endDate
  );

  useEffect(() => {
    // Calculate the final amount due, including penalty fee if applicable
    const amountAfterDiscount = redeemPoints
      ? totalAmountDue - discountAmount
      : totalAmountDue;

    setFinalAmountDue(amountAfterDiscount + peneltyAmount); // Add penalty amount
  }, [redeemPoints, totalAmountDue, discountAmount, peneltyAmount]);

  // Disable switch if points are equal to or less than zero
  const isSwitchDisabled = points <= 0;

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

    // 4. Save payment to database
    const paymentData = {
      email: customerDetails.cusMail,
      amount: finalAmountDue,
      paymentDate: ConvertToUTC(new Date().toISOString()),
      paymentTime: new Date().toLocaleTimeString(),
    };

    console.log(paymentData);
    try {
      await savePayment(paymentData);
    } catch (error) {
      console.error("Error saving payment:", error);
    }

    // 5. Mark bills as paid
    try {
      await markBillsAsPaid();
    } catch (error) {
      console.error("Error marking bills as paid:", error);
    }

    // 6. Update customer points
    if (redeemPoints || peneltyAmount > 0) {
      try {
        await updateCustomerPoints(0);
      } catch (error) {
        console.error("Error updating customer points:", error);
      }
    }

    router.push("/pay");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Payment Summary */}
        <View style={styles.summaryTitleContainer}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
        </View>

        {/* Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Customer Name</Text>
            <Text
              style={styles.value}
            >{`${customerDetails.cusFname} ${customerDetails.cusLname}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Billing Time Period</Text>
            <Text style={styles.value}>{billingTimePeriod}</Text>
          </View>

          <View style={styles.horizontalLine} />

          {/* Charges */}
          <View style={styles.row}>
            <Text style={styles.label}>Organic Waste Cost</Text>
            <Text style={styles.value}>
              Rs.{" "}
              {monthlyBill.totalCostForOrganic
                ? monthlyBill.totalCostForOrganic.toFixed(2)
                : "0.00"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Non-organic Waste Cost</Text>
            <Text style={styles.value}>
              Rs.{" "}
              {monthlyBill.totalCostForNonOrganic
                ? monthlyBill.totalCostForNonOrganic.toFixed(2)
                : "0.00"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Polythene Waste Cost</Text>
            <Text style={styles.value}>
              <Text style={styles.value}>
                Rs.{" "}
                {monthlyBill.totalCostForPolythenePlastic
                  ? monthlyBill.totalCostForPolythenePlastic.toFixed(2)
                  : "0.00"}
              </Text>
            </Text>
          </View>

          <View style={styles.horizontalLine} />

          {/* Subtotal, Tax, and Fees */}
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>
              Rs.{" "}
              {monthlyBill.subTotalCost
                ? monthlyBill.subTotalCost.toFixed(2)
                : "0.00"}
            </Text>
          </View>

          <View style={styles.horizontalLine} />

          <View style={styles.row}>
            <Text style={styles.label}>Tax (7.5%)</Text>
            <Text style={styles.value}>
              Rs. {monthlyBill.tax ? monthlyBill.tax.toFixed(2) : "0.00"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Service Fee</Text>
            <Text style={styles.value}>
              Rs.{" "}
              {monthlyBill.serviceCharge
                ? monthlyBill.serviceCharge.toFixed(2)
                : "0.00"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Recycling Payback</Text>
            <Text style={styles.valueGreen}>
              Rs.{" "}
              {monthlyBill.totalPaybackForRecyclable
                ? monthlyBill.totalPaybackForRecyclable.toFixed(2)
                : "0.00"}
            </Text>
          </View>

          <View style={styles.horizontalLine} />

          {monthlyBill.totalOutstandingAmount > 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>Outstanding Balance</Text>
              <Text style={styles.value}>
                Rs.{" "}
                {monthlyBill.totalOutstandingAmount
                  ? monthlyBill.totalOutstandingAmount.toFixed(2)
                  : "0.00"}
              </Text>
            </View>
          )}

          {monthlyBill.totalOutstandingAmount == 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>Monthly Charge</Text>
              <Text style={styles.value}>
                Rs.{" "}
                {monthlyBill.monthlyCharge
                  ? monthlyBill.monthlyCharge.toFixed(2)
                  : "0.00"}
              </Text>
            </View>
          )}

          <View style={styles.horizontalLine} />

          {peneltyAmount > 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>Penalty Fee</Text>
              <Text style={styles.value}>
                Rs. {peneltyAmount ? peneltyAmount.toFixed(2) : "0.00"}
              </Text>
            </View>
          )}

          {discountAmount > 0 && (
            <View style={styles.redeemRow}>
              <Text style={styles.redeemText}>
                Redeem {typeof points === "number" ? points : 0} points for Rs.{" "}
                {typeof discountAmount === "number"
                  ? discountAmount.toFixed(2)
                  : "0.00"}
              </Text>
              <Switch
                value={redeemPoints}
                onValueChange={setRedeemPoints}
                trackColor={{ false: "#767577", true: "#1DB954" }}
                thumbColor={redeemPoints ? "#1DB111" : "#f4f3f4"}
                disabled={isSwitchDisabled}
              />
            </View>
          )}

          <View style={styles.horizontalLine} />

          {/* Total */}
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total Amount Due</Text>
            <Text style={styles.totalValue}>
              Rs.{finalAmountDue.toFixed(2)}
            </Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  summaryTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1DB954",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 20,
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

export default paymentSummary;
