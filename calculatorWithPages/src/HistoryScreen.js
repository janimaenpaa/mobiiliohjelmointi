import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const History = ({ route, navigation }) => {
  const { history } = route.params;
  return (
    <View style={styles.container}>
      <Text>History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => item.key.toString()}
        renderItem={({ item }) => (
          <Text style={{ flexDirection: "row" }}>{item.value}</Text>
        )}
      />
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
});

export default History;
