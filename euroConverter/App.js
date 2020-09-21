import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Picker,
  Button,
} from "react-native";

export default function App() {
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState("");
  const [selectedValue, setSelectedValue] = useState("GBP");
  const [euroAmount, setEuroAmount] = useState("");

  useEffect(() => {
    const url = `http://data.fixer.io/api/latest?access_key=f64e97b8059c2a0b6e70c53ff508832b`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCurrencies(data.rates))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }, []);

  const handleButton = () => {
    const rate = currencies[selectedValue];
    setResult((euroAmount / rate).toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>€€</Text>
      <Text style={{ fontSize: 30 }}>{result} €</Text>
      <View style={{ flexDirection: "row", margin: 16 }}>
        <TextInput
          style={{ borderBottomWidth: 1, width: 100 }}
          value={euroAmount}
          onChangeText={(value) => setEuroAmount(value)}
        />
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {Object.keys(currencies).map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>
      <Button title="CONVERT" onPress={handleButton} />
    </View>
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
