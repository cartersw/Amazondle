// Import React and necessary hooks and libraries
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

// Call maybeCompleteAuthSession to attempt to complete an OAuth flow
WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = ({ navigation, action = "signIn" }) => {
  // Use custom hook to warm up the browser
  useWarmUpBrowser();

  // Get the startOAuthFlow function from useOAuth hook
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // Define the onPress function to handle button presses
  const onPress = React.useCallback(async () => {
    try {
      // Attempt to start the OAuth flow
      const { createdSessionId, setActive } = await startOAuthFlow();
      // Check if a session was created
      if (createdSessionId) {
        // If setActive is available, activate the session
        setActive && setActive({ session: createdSessionId });
        // Navigate to the home screen upon successful OAuth flow
        navigation.navigate("Home");
      } else {
        // Additional logic for MFA or other steps can go here
      }
    } catch (err) {
      // Log any errors to the console
      console.error("OAuth error", err);
    }
  }, []);

  // Determine the button text based on the action prop
  const buttonText =
    action === "signUp" ? "Sign up with Google" : "Sign in with Google";

  // Render the Button component with dynamic text and the onPress handler
  return <Button title={buttonText} onPress={onPress} />;
};

// Export the SignInWithOAuth component
export default SignInWithOAuth;
