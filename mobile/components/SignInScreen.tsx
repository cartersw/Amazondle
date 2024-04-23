import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

const styles = StyleSheet.create({
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

  logo: {
    width: 200, // You can adjust the width as needed
    height: 100, // Adjust the height according to the aspect ratio of your logo
    marginBottom: 20, // Adds some space between the logo and the welcome text
    alignSelf: "center", // This will center the logo
  },
});

import { Image } from "react-native"; // Add the missing import for the Image component

export default function SignInScreen({ navigation }) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      // Navigate to the home screen after successful sign-in
      navigation.navigate("Home");
    } catch (err: any) {
      console.log(err + "it's here");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")} // Make sure the path is correct
        resizeMode="contain" // This ensures the logo maintains its aspect ratio
        style={styles.logo} // Style for the logo
      />
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={emailAddress}
          placeholder="Email"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
