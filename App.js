import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function  HomeScreen() {
  return (
    <View className="flex-1 relative">
      <StatusBar style="light"/>
      <Image
        blurRadius={70} 
        source={require('./assets/bg.png')} 
        className="absolute w-full h-full"
      />
    </View>
  )
}