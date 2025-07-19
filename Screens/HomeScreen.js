import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme/theme.js";

import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [location, setLocation] = useState([1, 2, 3]); // Example state for location, replace with actual logic
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        style={styles.backgroundImage}
      />
      <SafeAreaView style={styles.safeArea}>
        {/*Search Section*/}
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchBox,
              {
                backgroundColor: showSearch
                  ? theme.bgwhite(0.2)
                  : "transparent",
              },
            ]}
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
          {location.length > 0 && showSearch ? (
            <View style={styles.dropdown}>
              {location.map((loc, index) => {
                let showBorder = index + 1 != location.length;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.locationItem,
                      showBorder && styles.locationItemBorder,
                    ]}
                  >
                    <MapPinIcon color="black" size={20} />
                    <Text style={styles.locationText}>
                      London,United Kingdom
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>

        {/*Forecast Section*/}
        <View style={styles.forecastContainer}>
          <View style={styles.locationContainer}>
            <Text style={styles.cityName}>London,</Text>
            <Text style={styles.countryName}>United Kingdom</Text>
          </View>

          {/*Weather Image*/}
          <View style={styles.weatherImageContainer}>
            <Image
              source={require("../assets/images/partlycloudy.png")}
              style={styles.weatherImage}
            />
          </View>

          {/*Degree Celsius*/}
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>23°</Text>
            <Text style={styles.weatherCondition}>Partly Cloudy</Text>
          </View>

          {/*Other Stats*/}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Image
                source={require("../assets/icons/wind.png")}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>22km</Text>
            </View>

            <View style={styles.statItem}>
              <Image
                source={require("../assets/icons/drop.png")}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>23%</Text>
            </View>

            <View style={styles.statItem}>
              <Image
                source={require("../assets/icons/sun.png")}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>6:05 AM</Text>
            </View>
          </View>

          {/*Forecast Section for the next days*/}
          <View style={styles.dailyForecastContainer}>
            <View style={styles.forecastHeader}>
              <CalendarDaysIcon size="22" color="white" />
              <Text style={styles.forecastHeaderText}>Daily Forecast</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              <View
                style={[
                  styles.forecastCard,
                  { backgroundColor: theme.bgwhite(0.15) },
                ]}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  style={styles.forecastIcon}
                />
                <Text style={styles.dayText}>Monday</Text>
                <Text style={styles.tempText}>13°</Text>
              </View>
              <View
                style={[
                  styles.forecastCard,
                  { backgroundColor: theme.bgwhite(0.15) },
                ]}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  style={styles.forecastIcon}
                />
                <Text style={styles.dayText}>Tuesday</Text>
                <Text style={styles.tempText}>13°</Text>
              </View>
              <View
                style={[
                  styles.forecastCard,
                  { backgroundColor: theme.bgwhite(0.15) },
                ]}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  style={styles.forecastIcon}
                />
                <Text style={styles.dayText}>Wednesday</Text>
                <Text style={styles.tempText}>13°</Text>
              </View>
              <View
                style={[
                  styles.forecastCard,
                  { backgroundColor: theme.bgwhite(0.15) },
                ]}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  style={styles.forecastIcon}
                />
                <Text style={styles.dayText}>Thursday</Text>
                <Text style={styles.tempText}>13°</Text>
              </View>
              <View
                style={[
                  styles.forecastCard,
                  { backgroundColor: theme.bgwhite(0.15) },
                ]}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  style={styles.forecastIcon}
                />
                <Text style={styles.dayText}>Friday</Text>
                <Text style={styles.tempText}>13°</Text>
              </View>
              <View
                style={[
                  styles.forecastCard,
                  { backgroundColor: theme.bgwhite(0.15) },
                ]}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  style={styles.forecastIcon}
                />
                <Text style={styles.dayText}>Saturday</Text>
                <Text style={styles.tempText}>13°</Text>
              </View>
              <View
                style={[
                  styles.forecastCard,
                  { backgroundColor: theme.bgwhite(0.15) },
                ]}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  style={styles.forecastIcon}
                />
                <Text style={styles.dayText}>Sunday</Text>
                <Text style={styles.tempText}>13°</Text>
              </View>
            </ScrollView>
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
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    top: 64,
    borderRadius: 24,
    paddingVertical: 8,
    zIndex: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationItem: {
    flexDirection: "row", // Icon and text in same line
    alignItems: "center", // Vertically center icon and text
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 4,
  },
  locationItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#9ca3af", // gray-400 equivalent
  },
  locationText: {
    fontSize: 16,
    color: "#374151", // gray-700 for better readability
    marginLeft: 8, // Space between icon and text
  },
  forecastContainer: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 8,
  },
  locationContainer: {
    alignItems: "center",
  },
  cityName: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  countryName: {
    color: "#d1d5db", // gray-300
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: -2,
  },
  weatherImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  weatherImage: {
    width: 208, // w-52 equivalent (52 * 4 = 208px)
    height: 208, // h-52 equivalent
  },
  temperatureContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  temperature: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 64, // text-6xl equivalent
    color: "white",
  },
  weatherCondition: {
    textAlign: "center",
    fontSize: 24, // Smaller than before
    color: "white",
    letterSpacing: 1,
    marginTop: 4,
    fontWeight: "400",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Changed from space-between to space-around
    marginHorizontal: 32, // Increased margin for better spacing
    paddingHorizontal: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    width: 24, // w-6 equivalent (6 * 4 = 24px)
    height: 24, // h-6 equivalent
    marginRight: 8,
  },
  statText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  dailyForecastContainer: {
    marginBottom: 8,
  },
  forecastHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  forecastHeaderText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  forecastCard: {
    justifyContent: "center",
    alignItems: "center",
    width: 96, // w-24 equivalent (24 * 4 = 96px)
    borderRadius: 24, // rounded-3xl
    paddingVertical: 12, // py-3
    marginRight: 16, // mr-4
  },
  forecastIcon: {
    width: 44, // w-11 equivalent (11 * 4 = 44px)
    height: 44, // h-11 equivalent
    marginBottom: 4,
  },
  dayText: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
  },
  tempText: {
    color: "white",
    fontSize: 20, // text-xl
    fontWeight: "600",
  },
});
