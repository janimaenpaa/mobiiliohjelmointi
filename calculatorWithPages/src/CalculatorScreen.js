import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const Calculator = ({ navigation }) => {
  const [topValue, setTopValue] = useState("");
  const [bottomValue, setBottomValue] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleAddition = () => {
    const sum = Number(topValue) + Number(bottomValue);
    setResult(sum);
    setHistory([
      ...history,
      {
        value: `${topValue} + ${bottomValue} = ${sum}`,
        key: history.length + 1,
      },
    ]);
    setTopValue("");
    setBottomValue("");
  };

  const handleSubtraction = () => {
    const difference = Number(topValue) - Number(bottomValue);
    setResult(difference);
    setHistory([
      ...history,
      {
        value: `${topValue} - ${bottomValue} = ${difference}`,
        key: history.length + 1,
      },
    ]);
    setTopValue("");
    setBottomValue("");
  };
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 60 }}>Result: {result ? result : ""}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(value) => setTopValue(value)}
        value={topValue}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(value) => setBottomValue(value)}
        value={bottomValue}
      />
      <View style={styles.buttons}>
        <Button onPress={handleAddition} title="+" />
        <Button onPress={handleSubtraction} title="-" />
        <Button
          onPress={() => navigation.navigate("History", { history })}
          title="History"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttons: {
    width: 160,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 20,
  },
  input: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
  },
});

export default Calculator;
