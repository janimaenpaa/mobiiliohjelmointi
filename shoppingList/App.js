import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native"

export default function App() {
  const [shoppingList, setShoppingList] = useState([])
  const [listItem, setListItem] = useState("")

  const handleAdd = () => {
    setShoppingList([
      ...shoppingList,
      { value: listItem, key: shoppingList.length + 1 },
    ])
    setListItem("")
  }

  const handleClear = () => {
    setShoppingList([])
    setListItem("")
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setListItem(value)}
        value={listItem}
      />
      <View style={{ flexDirection: "row" }}>
        <Button onPress={handleAdd} title="ADD" />
        <Button onPress={handleClear} title="CLEAR" />
      </View>
      <View style={styles.container}>
        <Text style={styles.titleText}>Shopping List</Text>
        <FlatList
          data={shoppingList}
          keyExtractor={(item, index) => item.key.toString()}
          renderItem={({ item }) => (
            <Text style={styles.baseText}>{item.value}</Text>
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
    marginTop: 50,
  },
  input: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  baseText: {
    flexDirection: "row",
    fontSize: 15,
  },
})
