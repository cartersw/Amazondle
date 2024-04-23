import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, Image } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";

const ProfileScreen = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://c9a1-69-109-176-86.ngrok-free.app/api/user/${user.username}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 404) {
          setError("User not found");
        } else {
          setError("An error occurred while fetching user data");
        }
      }
    };

    if (user && user.username) {
      fetchUserData();
    }
  }, [user]);

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!userData || !userData.data) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading user data...</Text>
      </SafeAreaView>
    );
  }

  const { username, gamesPlayed, attemptsCorrect, attemptsWrong } =
    userData.data;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>User Profile</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{username}</Text>
        <Text style={styles.label}>Games Played:</Text>
        <Text style={styles.value}>{gamesPlayed}</Text>
        <Text style={styles.label}>Attempts Correct:</Text>
        <Text style={styles.value}>{attemptsCorrect}</Text>
        <Text style={styles.label}>Attempts Wrong:</Text>
        <Text style={styles.value}>{attemptsWrong}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    color: "#333",
  },
});

export default ProfileScreen;
