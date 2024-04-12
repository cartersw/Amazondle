import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from "react-native";

const GameScreen = () => {
  const [target, setTarget] = useState(parseFloat((Math.random() * 100).toFixed(2)));
  const [guess, setGuess] = useState("");
  const [guessList, setGuessList] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  

  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [guessList]);


  const handleChange = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    setGuess(sanitizedValue);
  };

  const [isGameOver, setIsGameOver] = useState(false);

  const handleGuess = () => {
    if (guess === "") return;

    const numGuess = parseFloat(guess).toFixed(2);
    setGuessList(currentList => [numGuess, ...currentList]);

    if (parseFloat(numGuess) === target) {
      setResponses(currentList => ["Correct!", ...currentList]);
      setIsGameOver(true);
    } else if (parseFloat(numGuess) > target) {
      setResponses(currentList => ["Too high", ...currentList]);
    } else {
      setResponses(currentList => ["Too low", ...currentList]);
    }

    setGuess("");
    console.log(target);
    console.log(numGuess);
  };

  const handleStartOver = () => {
    setGuessList([]);
    setResponses([]);
    setIsGameOver(false);
    setGuess("");
    setTarget(parseFloat((Math.random() * 100).toFixed(2)));
  };


  const getColor = (value: number, ideal: number, range: number, isCorrect: boolean): string => {
    if (isCorrect) {
      return "#FFD700"; // Gold color for correct guess
    }

    const distance = Math.abs(value - ideal);
    const normalizedDistance = Math.min(distance / range, 1);
    let color = "#FF6B6B"; // Red color for far off guesses

    if (normalizedDistance < 0.1) {
      color = "#4ECDC4"; // Teal color for very close guesses
    } else if (normalizedDistance < 0.5) {
      const ratio = (normalizedDistance - 0.05) / 0.15;
      const red = 255;
      const green = Math.round(205 + 50 * (1 - ratio)); // Interpolate green value
      const blue = Math.round(180 + 75 * (1 - ratio)); // Interpolate blue value
      color = `rgb(${red}, ${green}, ${blue})`; // Interpolate color between red and teal
    }

    return color;
  };

  const renderGuess = (guess: string, index: number) => {
    const parsedGuess = parseFloat(guess);
    const isCorrect = parsedGuess === target;
    const color = getColor(parsedGuess, target, target * 2, isCorrect);
    const icon = isCorrect ? "★" : parsedGuess < target ? "▲" : "▼";
    const message = isCorrect ? "Correct!" : parsedGuess < target ? "Too low" : "Too high";

    return (
      <View key={index} style={styles.guessContainer}>
        <Text style={styles.guess}>{guess}</Text>
        <View style={styles.indicatorContainer}>
          <View style={[styles.indicator, { backgroundColor: color }]}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 105 : 5}
      >
        <Text style={styles.title}>Price Guesser</Text>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {guessList.slice().reverse().map(renderGuess)}
        </ScrollView>
        {isGameOver ? (
          <TouchableOpacity style={styles.startOverButton} onPress={handleStartOver}>
            <Text style={styles.startOverButtonText}>Start Over</Text>
          </TouchableOpacity>
        ) : (
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
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  startOverButton: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  startOverButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    fontSize: 20,
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  guessContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  guess: {
    fontSize: 18,
    paddingVertical: 5,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  arrow: {
    fontSize: 16,
    color: "#fff",
  },
  message: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
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