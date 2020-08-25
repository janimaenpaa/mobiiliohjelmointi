import React, { useState } from "react"
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native"

export default function App() {
  const [topValue, setTopValue] = useState("")
  const [bottomValue, setBottomValue] = useState("")
  const [result, setResult] = useState(null)

  const handleAddition = () => {
    setResult(Number(topValue) + Number(bottomValue))
    setTopValue("")
    setBottomValue("")
  }

  const handleSubtraction = () => {
    setResult(Number(topValue) - Number(bottomValue))
    setTopValue("")
    setBottomValue("")
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result ? result : ""}</Text>
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
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    width: 80,
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
})
