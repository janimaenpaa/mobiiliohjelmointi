import React, { useState } from "react"
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native"

export default function App() {
  const [guess, setGuess] = useState()
  const [text, setText] = useState("Guess a number between 1-100")
  const [timesGuessed, setTimesGuessed] = useState(0)
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1)

  const handleGuess = () => {
    console.log({ guess: guess, number: number })
    if (Number(guess) === number) {
      Alert.alert(`You guessed the number in ${timesGuessed + 1} guesses`)
      setTimesGuessed(0)
      setGuess("")
      setText("Guess a number between 1-100")
      setNumber(Math.floor(Math.random() * 100) + 1)
    } else if (Number(guess) < number) {
      setText(`Your guess ${guess} is too low`)
      setTimesGuessed(timesGuessed + 1)
    } else {
      setText(`Your guess ${guess} is too high`)
      setTimesGuessed(timesGuessed + 1)
    }
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(value) => setGuess(value)}
        value={guess}
      />
      <Button onPress={handleGuess} title="MAKE GUESS" />
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
  input: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
  },
})
