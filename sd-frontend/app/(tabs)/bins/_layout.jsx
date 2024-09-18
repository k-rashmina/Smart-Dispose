import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Icon from "react-native-vector-icons/Ionicons"

const BinsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: true, title: 'Dashboard', headerTitleAlign: 'center'}}/>
      <Stack.Screen name='garbagebinscreen' options={{headerShown: true, title: 'Bin Details', headerTitleAlign: 'center'}}/>
    </Stack>
  )
}

export default BinsLayout

const styles = StyleSheet.create({})