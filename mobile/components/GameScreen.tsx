import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";

const GameScreen = () => {
  const [target] = useState(parseFloat((Math.random() * 100).toFixed(2)));
  const [guess, setGuess] = useState("");
  const [guessList, setGuessList] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  const handleChange = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    setGuess(sanitizedValue);
  };

  const handleGuess = () => {
    if (guess === "") return;

    const numGuess = parseFloat(guess).toFixed(2);
    setGuessList(currentList => [...currentList, numGuess]);

    if (parseFloat(numGuess) === target)
      setResponses(currentList => [...currentList, "Congratulations!"]);
    else if (parseFloat(numGuess) > target)
      setResponses(currentList => [...currentList, "Too high!"]);
    else
      setResponses(currentList => [...currentList, "Too low!"]);

    setGuess("");
    console.log(target);
    console.log(numGuess);
  };

  const getColor = (value: number, ideal: number, range: number): string => {
    const distance = Math.abs(value - ideal);
    const normalizedDistance = Math.min(distance / range, 1);
    let color = "red";

    if (normalizedDistance < 0.1) {
      color = "green";
    } else if (normalizedDistance < 0.5) {
      const ratio = (normalizedDistance - 0.05) / 0.15;
      const green = 255;
      const red = Math.round(255 * ratio);
      color = `rgb(${red}, ${green}, 0)`;
    } else {
      const ratio = (normalizedDistance - 0.2) / 0.8;
      const green = Math.round(255 * (1 - ratio));
      const red = 255;
      color = `rgb(${red}, ${green}, 0)`;
    }

    return color;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <Text style={styles.title}>Price Guesser</Text>
      <ScrollView style={styles.scrollView}>
        {guessList.map((g, i) => (
          <Text
            key={i}
            style={[styles.guess, { backgroundColor: getColor(parseFloat(g), target, target * 2) }]}
          >
            {g}: {responses[i]}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter your guess"
          value={guess}
          onChangeText={handleChange}
        />
        <TouchableOpacity style={styles.button} onPress={handleGuess}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollView: {
    width: "100%",
    marginBottom: 20,
  },
  guess: {
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GameScreen;