import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import * as SQLite from "expo-sqlite";

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const db = SQLite.openDatabase("shoppinglistdb.db");

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists shoppinglist (id integer primary key not null, product text, amount text);"
        );
      },
      null,
      updateList
    );
  }, []);

  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from shoppinglist;", [], (_, { rows }) => {
        console.log(rows);
        setShoppingList(rows._array);
      });
    });
  };

  const saveProduct = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into shoppinglist (product, amount) values (?, ?);",
          [product, amount]
        );
      },
      null,
      updateList
    );
    setProduct("");
    setAmount("");
  };

  const deleteProduct = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from shoppinglist where id = ?", [id]);
      },
      null,
      updateList
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setProduct(value)}
        value={product}
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => setAmount(value)}
        value={amount}
      />
      <View style={{ flexDirection: "row" }}>
        <Button onPress={saveProduct} title="SAVE" />
      </View>
      <View style={styles.container}>
        <Text style={styles.titleText}>Shopping List</Text>
        <FlatList
          data={shoppingList}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.baseText}>
                {item.product}, {item.amount}
              </Text>
              <Pressable onPress={() => deleteProduct(item.id)}>
                <Text style={styles.bought}>Bought</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
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
    marginBottom: 5,
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
  bought: {
    color: "blue",
    marginLeft: 10,
  },
});
