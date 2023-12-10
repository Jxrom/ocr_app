import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import { TotalAmountContext } from "./TotalAmountContext";
import { aggregateWeeklyTotals } from "./aggregate";

import ButtonImage1 from "./icons/scan.png";
import ButtonImage2 from "./icons/search.png";
import ButtonImage3 from "./icons/dashboard.png";
import ButtonImage4 from "./icons/user.png";

// Define an array of day labels starting from Sunday to Saturday
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardScreen({ navigation }) {
  const { totalAmount, resetTotalAmount } = useContext(TotalAmountContext);
  const { dailyTotals } = useContext(TotalAmountContext);
  const [currentDate, setCurrentDate] = useState("");
  const { width: screenWidth } = useWindowDimensions();
  const weeklyAggregatedTotals = useMemo(
    () => aggregateWeeklyTotals(dailyTotals),
    [dailyTotals]
  );

  // Function to calculate the sum of all daily totals
  const calculateTotalAmount = () => {
    return dailyTotals.reduce((sum, entry) => sum + entry.total, 0);
  };
  const maxYAxisValue = 500;

  // Calculate the total amount
  const totalAmountSum = calculateTotalAmount();

  const chartConfig = {
    barPercentage: 0.5,
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const getChartData = () => {
    const labels = [];
    const data = [];
    // Map aggregated weekly totals to day labels
    dayLabels.forEach((day) => {
      const total = weeklyAggregatedTotals[day] || 0; // Use 0 if no data available for the day
      labels.push(day); // Push the day label to the "labels" array
      data.push(total);
    });

    Object.entries(weeklyAggregatedTotals).forEach(([week, total]) => {
      // You can keep this part if needed, but it's not modifying the "labels" array
      data.push(total);
    });

    return {
      labels: labels,
      datasets: [{ data }],
    };
  };

  const barData = useMemo(() => getChartData(), [dailyTotals]);

  useEffect(() => {
    // Update currentDate every minute
    const updateCurrentDate = () => {
      const now = new Date();
      const formattedDate = now.toDateString();
      setCurrentDate(formattedDate);
    };

    updateCurrentDate();
    const intervalId = setInterval(updateCurrentDate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Reset totalAmount when the date changes
    resetTotalAmount();
  }, [currentDate]);

  const handleButtonPress = (buttonText) => {
    if (buttonText === "Button 1") {
      navigation.navigate("OCR", { activateCamera: true });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: screenWidth * 0.05 }]}>
        Dashboard
      </Text>
      <Text style={[styles.date, { fontSize: screenWidth * 0.03 }]}>
        {currentDate}
      </Text>
      <Text style={[styles.totalAmount]}>Daily Amount Total</Text>
      <Text style={[styles.totalValue]}>₱{totalAmountSum.toFixed(2)}</Text>
      <BarChart
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        data={barData}
        width={screenWidth}
        height={400}
        yAxisLabel="₱"
        chartConfig={chartConfig}
        verticalLabelRotation={75}
        fromZero={false}
        yAxisRange={[0, maxYAxisValue]}
        showValuesOnTopOfBars={false}
      />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
            onPress={() => handleButtonPress("Button 1")}
          >
            <Image
              source={ButtonImage1}
              style={[styles.buttonImage, { width: 30, height: 30 }]}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
            onPress={() => navigation.navigate("HistoryScreen")}
          >
            <Image
              source={ButtonImage2}
              style={[styles.buttonImage, { width: 30, height: 30 }]}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
            onPress={() => handleButtonPress("Button 3")}
          >
            <Image
              source={ButtonImage3}
              style={[styles.buttonImage, { width: 30, height: 30 }]}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
            onPress={() => navigation.navigate("UserScreen")}
          >
            <Image
              source={ButtonImage4}
              style={[styles.buttonImage, { width: 30, height: 30 }]}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
  },
  title: {
    margin: 10,
    fontWeight: "bold",
    color: "white",
  },
  date: {
    marginBottom: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 5,
  },
  buttonImage: {
    resizeMode: "contain",
  },
  // Add any additional styles you might need
  totalAmount: {
    margin: 10,
    fontWeight: "bold",
    color: "white",
    marginTop: 40,
  },
  totalValue: {
    fontWeight: "bold",
    color: "white",
  },
});
