import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";

const App = () => {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);

  const handleGuessSubmit = () => {
    if (guess.trim()) {
      setGuesses([...guesses, guess]);
      setGuess("");
    }
  };

  const renderGuess = ({ item, index }) => (
    <View style={styles.guessItem} key={index}>
      <Text style={styles.guessText}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>{"<"}</Text>
          </TouchableOpacity>
          {/* Include the logo */}
          <Image
            source={require("./assets/logo.png")} // make sure the path is correct
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <Text style={styles.productName}>
          owo data
        </Text>
        <FlatList
          data={guesses}
          renderItem={renderGuess}
          keyExtractor={(item, index) => `guess-${index}`}
          style={styles.guessList}
        />
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter a guess"
            value={guess}
            onChangeText={setGuess}
            onSubmitEditing={handleGuessSubmit}
          />
          <TouchableOpacity
            style={styles.guessButton}
            onPress={handleGuessSubmit}
          >
            <Text style={styles.guessButtonText}>Guess</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000", // or use the same color as your app's background
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically centers the content in the header
    justifyContent: 'center', // Horizontally centers the content in the header
    padding: 20,
    backgroundColor: '#F3C623',
  },
  backButton: {
    position: 'absolute', // Position the back button absolutely
    left: 20, // Place it 20 units from the left
    height: '100%', // Make the button fill the height of the header
    alignItems: 'center', // Horizontally center the back button content
    justifyContent: 'center', // Vertically center the back button content
  },
  logo: {
    height: 50, // Adjust the height to fit your header bar
    width: 100, // Adjust the width as needed, or remove it to auto-adjust
    resizeMode: 'contain', // This will ensure the logo maintains its aspect ratio
  },
  backButtonText: {
    fontSize: 18,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flexGrow: 1,
    textAlign: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  guessList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  guessItem: {
    backgroundColor: "#E1E1E1",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  guessText: {
    fontSize: 16,
    color: "#333",
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
  },
  guessButton: {
    backgroundColor: "#F3C623",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  guessButtonText: {
    fontSize: 18,
    color: "#333",
  },
});

export default App;
