import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  Image,
} from "react-native";

const RecipeItem = ({ title, thumbnail }) => (
  <View>
    <Text>{title}</Text>
    <Image
      style={{ width: 50, height: 50 }}
      source={{
        uri: thumbnail,
      }}
    />
  </View>
);

export default function App() {
  const [recipe, setRecipe] = useState("");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    const url = `http://www.recipepuppy.com/api/?i=${recipe}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRecipes(data.results))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%", height: "70%" }}
        keyExtractor={(item) => item.href}
        renderItem={({ item }) => <RecipeItem {...item} />}
        ItemSeparatorComponent={listSeparator}
        data={recipes}
      />
      <View style={{ height: 100, padding: 12 }}>
        <TextInput
          style={styles.input}
          value={recipe}
          onChangeText={(value) => setRecipe(value)}
        />
        <Button title="Find" onPress={() => getRecipes()} />
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
  button: {
    fontSize: 18,
    width: 200,
  },
  input: {
    marginBottom: 5,
    fontSize: 18,
    width: 200,
    borderWidth: 1,
  },
});
