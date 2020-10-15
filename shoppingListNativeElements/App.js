import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import * as SQLite from "expo-sqlite";
import { Button, Header, Input, ListItem } from "react-native-elements";

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

  const renderItem = ({ item }) => {
    return (
      <ListItem
        key={item.id}
        bottomDivider
        containerStyle={{
          width: 400,
        }}
      >
        <ListItem.Content
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ListItem.Content>
            <ListItem.Title>{item.product}</ListItem.Title>
            <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Subtitle onPress={() => deleteProduct(item.id)}>
              bought
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        style={{ marginBottom: 10 }}
        centerComponent={{ text: "Shopping List", style: { color: "#fff" } }}
      />
      <Input
        placeholder="Product"
        label="Product"
        onChangeText={(value) => setProduct(value)}
        value={product}
      />
      <Input
        placeholder="Amount"
        label="Amount"
        onChangeText={(value) => setAmount(value)}
        value={amount}
      />
      <Button
        raised
        containerStyle={{ width: "96%" }}
        onPress={saveProduct}
        title="SAVE"
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={shoppingList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
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
