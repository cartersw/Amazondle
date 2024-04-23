import React from "react";
import { useUser } from "@clerk/clerk-expo";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Button,
  Image,
} from "react-native";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import SignUpScreen from "./components/SignUpScreen";
import SignInScreen from "./components/SignInScreen";
import { NavigationContainer } from "@react-navigation/native";
import GlobalLoadingIndicator from "./components/GlobalLoadingIndicator";
import { createStackNavigator } from "@react-navigation/stack";
import { LoadingProvider } from "./components/LoadingContext";
import GameScreen from "./components/GameScreen";
import ProfileScreen from "./components/ProfileScreen";

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.buttonContainer}>
          <Button
            title="Sign In"
            onPress={() => navigation.navigate("SignIn")}
          />
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </View>
      <Image
        source={require("./assets/logo.png")} // Make sure the path is correct
        resizeMode="contain" // This ensures the logo maintains its aspect ratio
        style={styles.logo} // Style for the logo
      />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Amazondle</Text>
        <Text style={styles.subtitle}>The game to guess prices!</Text>
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  // Use the useUser hook to access user information
  const { user: userFromUserHook } = useUser();
  const { userId } = useAuth();
  const emailAddress = userFromUserHook?.emailAddress || userId;

  return (
    <SafeAreaView style={styles.safeArea}>
      <SignedIn>
        <View style={styles.signedInContainer}>
          <Image
            source={require("./assets/logo.png")} // Make sure the path is correct
            resizeMode="contain" // This ensures the logo maintains its aspect ratio
            style={styles.logo} // Style for the logo
          />
          {/* Modify the welcome text to include the user's email */}
          <Text style={styles.welcomeText}>
            Welcome to Amazondle, {userFromUserHook?.username}!
          </Text>
          <Text style={styles.subtitleText}>The game to guess prices!</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Start Playing"
              onPress={() => navigation.navigate("Game")}
              color="#4CAF50"
            />
            <Button
              title="View Profile"
              onPress={() => navigation.navigate("Profile")}
              color="#2196F3"
            />
          </View>
          <SignOut />
        </View>
      </SignedIn>
      <SignedOut>
        <LandingPage navigation={navigation} />
      </SignedOut>
      <GlobalLoadingIndicator />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <LoadingProvider>
      <ClerkProvider publishableKey="pk_test_Z2VuZXJvdXMtcGFudGhlci0xOC5jbGVyay5hY2NvdW50cy5kZXYk">
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Game"
              component={GameScreen}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ title: "" }}
            />
            {/* Add the ProfileScreen to the stack navigator */}
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: "Profile" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ClerkProvider>
    </LoadingProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start", // Adjust alignment
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    width: 200, // You can adjust the width as needed
    height: 100, // Adjust the height according to the aspect ratio of your logo
    marginBottom: 0, // Adds some space between the logo and the welcome text
    alignSelf: "center", // This will center the logo
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  signedInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
});
