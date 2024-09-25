import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: true, title: 'Profile', headerTitleAlign: 'center'}} />
      <Stack.Screen name= 'inqlist' options={{headerShown:true,title:'History',headerTitleAlign:'center', headerTintColor:'#00b400'}}/>
    </Stack>
  )
}

export default ProfileLayout

const styles = StyleSheet.create({})