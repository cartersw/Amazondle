import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  Image,
  Keyboard,
} from "react-native";
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";

const GameScreen = () => {
  const { user } = useUser();
  const [item, setItem] = useState("");
  const [product, setProduct] = useState(null);
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState("");
  const [guessList, setGuessList] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [wrongGuessCount, setWrongGuessCount] = useState(0);
  const [correctGuessCount, setCorrectGuessCount] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [guessList]);

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "https://c9a1-69-109-176-86.ngrok-free.app/api/scrape",
          {
            params: { item },
          }
        );
        const fetchedProduct = response.data.data;
        setProduct(fetchedProduct);

        if (fetchedProduct.price) {
          setTarget(parseFloat(fetchedProduct.price.replace(/[^0-9.-]+/g, "")));
        } else {
          console.error("Price is undefined for the fetched product");
          setTarget(0);
          alert("The price information is missing for the fetched product.");
        }

        // Increment gamesPlayedInc when fetching a new product
        await updateGameStats(user?.username || "", 1, 0, 0);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Product not found");
          alert("The requested product could not be found.");
        } else {
          console.error("Error fetching product:", error);
          alert(
            "An error occurred while fetching the product. Please try again."
          );
        }
      }
    };

    const handleChange = (value: string) => {
      const sanitizedValue = value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*?)\..*/g, "$1");
      setGuess(sanitizedValue);
    };

    const updateGameStats = async (
      username: string,
      gamesPlayedInc: number,
      attemptsCorrectInc: number,
      attemptsWrongInc: number
    ) => {
      try {
        const response = await axios.post(
          `https://c9a1-69-109-176-86.ngrok-free.app/api/updateGameStats/${username}`,
          {
            gamesPlayedInc,
            attemptsCorrectInc,
            attemptsWrongInc,
          }
        );
        console.log("Game stats updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating game stats:", error);
      }
    };

    const handleGuess = () => {
      if (guess === "") return;
    
      const numGuess = parseFloat(guess).toFixed(2);
      setGuessList((currentList) => [numGuess, ...currentList]);
    
      if (parseFloat(numGuess) === target) {
        setIsGameOver(true);
        setCorrectGuessCount((prevCount) => prevCount + 1);
        updateGameStats(
          user?.username || "",
          0,
          1,
          wrongGuessCount
        );
      } else {
        setWrongGuessCount((prevCount) => prevCount + 1);
        updateGameStats(
          user?.username || "",
          0,
          correctGuessCount,
          1
        );
      }
    
      setGuess("");
      Keyboard.dismiss();
    };

    const handleStartOver = () => {
      setGuessList([]);
      setIsGameOver(false);
      setGuess("");
      setProduct(null);
      setItem("");
      setWrongGuessCount(0);
      setCorrectGuessCount(0);
    };

    const getColor = (
      value: number,
      ideal: number,
      range: number,
      isCorrect: boolean
    ): string => {
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
      const message = isCorrect
        ? "Correct!"
        : parsedGuess < target
          ? "Too low"
          : "Too high";

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
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 150 : Platform.OS === "android" ? 80 : 0}
          >
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            {product ? (
              <>
                <Text
                  style={[
                    styles.title,
                    Platform.OS === "android" && styles.androidText,
                  ]}
                >
                  {product.title}
                </Text>
                {product.picture && (
                  <Image
                    source={{ uri: product.picture }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                )}
                {guessList.slice().reverse().map(renderGuess)}
                {isGameOver ? (
                  <TouchableOpacity
                    style={styles.startOverButton}
                    onPress={handleStartOver}
                  >
                    <Text
                      style={[
                        styles.startOverButtonText,
                        Platform.OS === "android" && styles.androidText,
                      ]}
                    >
                      Start Over
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        Platform.OS === "android" && styles.androidText,
                      ]}
                      keyboardType="numeric"
                      placeholder="Enter your guess"
                      value={guess}
                      onChangeText={handleChange}
                      onSubmitEditing={handleGuess}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleGuess}>
                      <Text
                        style={[
                          styles.buttonText,
                          Platform.OS === "android" && styles.androidText,
                        ]}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.centerView}>
                <Text
                  style={[
                    styles.title,
                    Platform.OS === "android" && styles.androidText,
                  ]}
                >
                  Enter an Item
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      Platform.OS === "android" && styles.androidText,
                    ]}
                    placeholder="Enter an item"
                    value={item}
                    onChangeText={setItem}
                    onSubmitEditing={fetchProduct}
                  />
                  <TouchableOpacity style={styles.button} onPress={fetchProduct}>
                    <Text
                      style={[
                        styles.buttonText,
                        Platform.OS === "android" && styles.androidText,
                      ]}
                    >
                      Start Game
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#fff",
    },
    contentContainer: {
      flex: 1,
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
      alignItems: "center",
      padding: 20,
    },
    icon: {
      fontSize: 20,
      color: "#fff",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    scrollView: {
      flex: 1,
      width: "100%",
    },
    scrollViewContent: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
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
    centerView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
    },
    input: {
      width: 200,
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
    productImage: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    androidText: {
      fontSize: Platform.OS === "android" ? 10 : 20,
    },
  });

  export default GameScreen;