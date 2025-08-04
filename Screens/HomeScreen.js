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
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme/theme.js";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather.js";

import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { weatherImages } from "../constants/index.js";
import * as Progress from "react-native-progress";

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (value) => {
    //console.log("Searching for:", value);
    //fetch locations based on the search value
    if (value.length > 2) {
      fetchLocations({ cityName: value })
        .then((data) => {
          //console.log("got locations", data);
          setLocations(data);
        })
        .catch((error) => {
          console.error("Search error:", error);
          setLocations([]);
        });
    } else {
      setLocations([]);
    }
  };

  const handleLocation = (location) => {
    //console.log("Selected location:", location);
    setLocations([]);
    toggleSearch(false);
    setLoading(true);

    fetchWeatherForecast({
      cityName: location.name,
      days: "7",
    })
      .then((data) => {
        if (data) {
          setWeather(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Weather fetch error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    fetchWeatherForecast({
      cityName: "Colombo",
      days: "7",
    })
      .then((data) => {
        setWeather(data);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.error("Error fetching initial weather:", error);
        setLoading(false); // Also set loading to false on error
      });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        style={styles.backgroundImage}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
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
                  onChangeText={handleTextDebounce}
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
            {locations.length > 0 && showSearch ? (
              <View style={styles.dropdown}>
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(loc)}
                      key={index}
                      style={[
                        styles.locationItem,
                        showBorder && styles.locationItemBorder,
                      ]}
                    >
                      <MapPinIcon color="black" size={20} />
                      <Text style={styles.locationText}>
                        {loc?.name}, {loc?.country}
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
              <Text style={styles.cityName}>{location?.name},</Text>
              <Text style={styles.countryName}>{location?.country}</Text>
            </View>

            {/*Weather Image*/}
            <View style={styles.weatherImageContainer}>
              <Image
                source={
                  weatherImages[current?.condition?.text] ||
                  weatherImages["other"]
                }
                style={styles.weatherImage}
              />
            </View>

            {/*Degree Celsius*/}
            <View style={styles.temperatureContainer}>
              <Text style={styles.temperature}>
                {Math.round(current?.temp_c) || 23}°
              </Text>
              <Text style={styles.weatherCondition}>
                {current?.condition?.text || "Partly Cloudy"}
              </Text>
            </View>

            {/*Other Stats*/}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Image
                  source={require("../assets/icons/wind.png")}
                  style={styles.statIcon}
                />
                <Text style={styles.statText}>{current?.wind_kph}km</Text>
              </View>

              <View style={styles.statItem}>
                <Image
                  source={require("../assets/icons/drop.png")}
                  style={styles.statIcon}
                />
                <Text style={styles.statText}>{current?.humidity}%</Text>
              </View>

              <View style={styles.statItem}>
                <Image
                  source={require("../assets/icons/sun.png")}
                  style={styles.statIcon}
                />
                <Text style={styles.statText}>
                  {weather?.forecast?.forecastday?.[0]?.astro?.sunrise ||
                    "6:05 AM"}
                </Text>
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
                {weather?.forecast?.forecastday?.map((item, index) => {
                  const date = new Date(item.date);
                  const dayName = date.toLocaleDateString("en-US", {
                    weekday: "short",
                  });

                  return (
                    <View
                      key={index}
                      style={[
                        styles.forecastCard,
                        { backgroundColor: theme.bgwhite(0.15) },
                      ]}
                    >
                      <Image
                        source={
                          weatherImages[item?.day?.condition?.text] ||
                          weatherImages["other"]
                        }
                        style={styles.forecastIcon}
                      />
                      <Text style={styles.dayText}>{dayName}</Text>
                      <Text style={styles.tempText}>
                        {Math.round(item?.day?.avgtemp_c)}°
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    height: "8%",
    marginHorizontal: 16,
    position: "relative",
    zIndex: 50,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 32,
    paddingHorizontal: 12,
    paddingVertical: 1,
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
    justifyContent: "space-between", // Changed back to space-between for even distribution
    alignItems: "center",
    marginHorizontal: 16, // Reduced margin
    paddingHorizontal: 24, // Increased padding for better spacing
    marginVertical: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  statIcon: {
    width: 24,
    height: 24,
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
