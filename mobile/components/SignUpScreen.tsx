import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useLoading } from "./LoadingContext"; // Adjust the path as necessary

const styles = StyleSheet.create({
  linkText: {
    color: "#007AFF",
    textAlign: "center",
    marginTop: 20,
  },
  logo: {
    width: 200, // You can adjust the width as needed
    height: 100, // Adjust the height according to the aspect ratio of your logo
    marginBottom: 20, // Adds some space between the logo and the welcome text
    alignSelf: "center", // This will center the logo
  },
  container: {
    flex: 1,
    justifyContent: "flex-center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default function SignUpScreen({ navigation }) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startLoading, stopLoading } = useLoading(); // Use the loading context
  const [emailAddress, setEmailAddress] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    startLoading(); // Start the loading indicator
    try {
      await signUp.create({ emailAddress, password, username });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setErrorMessage(""); // Clear any previous error message
    } catch (err: any) {
      // Handle errors
      setErrorMessage("An error occurred. Please try again.");
    }
    stopLoading(); // Stop the loading indicator
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    startLoading(); // Start the loading indicator
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
    stopLoading(); // Stop the loading indicator
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <View>
          <Image
            source={require("../assets/logo.png")} // Make sure the path is correct
            resizeMode="contain" // This ensures the logo maintains its aspect ratio
            style={styles.logo} // Style for the logo
          />
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={username}
              placeholder="Username"
              onChangeText={(username) => setUsername(username)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={emailAddress}
              placeholder="Email"
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#999"
              secureTextEntry={true}
              value={password}
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
            />
            {errorMessage !== "" && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View>
          <Text style={styles.title}>Verify Email</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/logo.png")} // Make sure the path is correct
              resizeMode="contain" // This ensures the logo maintains its aspect ratio
              style={styles.logo} // Style for the logo
            />
            <TextInput
              style={styles.input}
              value={code}
              placeholder="Verification Code"
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={onPressVerify}>
            <Text style={styles.buttonText}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
