import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native"

export default function App() {
  const [topValue, setTopValue] = useState("")
  const [bottomValue, setBottomValue] = useState("")
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  const handleAddition = () => {
    const sum = Number(topValue) + Number(bottomValue)
    setResult(sum)
    setHistory([
      ...history,
      { value: `${topValue} + ${bottomValue} = ${sum}`, key: history.length + 1 },
    ])
    setTopValue("")
    setBottomValue("")
  }

  const handleSubtraction = () => {
    const difference = Number(topValue) - Number(bottomValue)
    setResult(difference)
    setHistory([
      ...history,
      {
        value: `${topValue} - ${bottomValue} = ${difference}`,
        key: history.length + 1,
      },
    ])
    setTopValue("")
    setBottomValue("")
  }

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
      </View>
      <View style={styles.history}>
        <Text>History</Text>
        <FlatList
          data={history}
          keyExtractor={(item, index) => item.key.toString()}
          renderItem={({ item }) => (
            <Text style={{ flexDirection: "row" }}>{item.value}</Text>
          )}
        />
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
    marginTop: 10,
  },
  history: {
    flex: 1,
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
