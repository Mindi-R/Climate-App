import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme/theme.js";

import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';

export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false);
    const [location, setLocation] = useState([1, 2, 3]); // Example state for location, replace with actual logic
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
            style={[styles.searchBox, { backgroundColor: showSearch ? theme.bgwhite(0.2) : 'transparent' }]}
          >
            {showSearch ? (
              <TextInput
                placeholder="Search City"
                placeholderTextColor={"lightgrey"}
                style={styles.textInput}
              />
            ) : null}
            <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                style={styles.searchButton}
            >
              <MagnifyingGlassIcon color="white" size={24} />
            </TouchableOpacity>
          </View>
          {
            location.length > 0 && showSearch ? (
                <View style={styles.dropdown}>
                    {location.map((loc,index)=>{
                        let showBorder = index+1 != location.length;
                        return(
                            <TouchableOpacity 
                            key={index}
                            style={[styles.locationItem, showBorder && styles.locationItemBorder]}
                            >
                                <MapPinIcon color="black" size={20} />
                                <Text style={styles.locationText}>London,United Kingdom</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            ):null
          }
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
    paddingVertical: 2,
  },
  textInput: {
    paddingLeft: 24,
    height: 40,
    flex: 1,
    fontSize: 16,
    color: "white",
  },
  searchButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 25, // This makes it circular (half of width/height)
    padding: 12,
    margin: 4,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white', // Changed to white
    top: 64, // top-16 equivalent (16 * 4 = 64px)
    borderRadius: 24, // rounded-3xl equivalent
    paddingVertical: 8,
    zIndex: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  locationItem: {
    flexDirection: 'row', // Icon and text in same line
    alignItems: 'center', // Vertically center icon and text
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 4,
  },
  locationItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#9ca3af', // gray-400 equivalent
  },
  locationText: {
    fontSize: 16,
    color: '#374151', // gray-700 for better readability
    marginLeft: 8, // Space between icon and text
  },
});
