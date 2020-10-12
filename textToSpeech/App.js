import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as Speech from "expo-speech";

export default function App() {
  const [text, setText] = useState("");

  const handleSpeech = () => {
    Speech.speak(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setText(value)}
      />
      <Button title="PRESS TO HEAR TEXT" onPress={handleSpeech} />
      <StatusBar style="auto" />
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
  input: {
    width: "70%",
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  },
});
