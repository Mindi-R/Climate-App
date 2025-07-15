import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme/theme.js";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/bg.png")}
        style={styles.backgroundImage}
      />
      <SafeAreaView style={styles.safeArea}>
        {/*Search Section*/}
        <View style={styles.searchContainer}>
          <View
            style={[styles.searchBox, { backgroundColor: theme.bgwhite(0.2) }]}
          >
            <TextInput
              placeholder="Search City"
              placeholderTextColor={"lightgrey"}
              style={styles.textInput}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    height: "7%",
    marginHorizontal: 16,
    position: "relative",
    zIndex: 50,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    paddingLeft: 24,
    height: 40,
    flex: 1,
    fontSize: 16,
    color: "white",
  },
});
