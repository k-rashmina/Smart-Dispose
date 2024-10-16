import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: true, title: 'Profile', headerTitleAlign: 'center'}} />
      <Stack.Screen name= 'userDetails' options={{headerShown:true,title:'User Details',headerTitleAlign:'center', headerTintColor:'#00b400'}}/>
      <Stack.Screen name= 'inqlist' options={{headerShown:true,title:'History',headerTitleAlign:'center', headerTintColor:'#00b400'}}/>
      <Stack.Screen name='inqDetails' options={{headerShown:true,title:'Inquiry Details',headerTitleAlign:'center',headerTintColor:'#00b400'}}/>
      <Stack.Screen name='inqCreate' options={{headerShown:true,title:'Contact Us',headerTitleAlign:'center',headerTintColor:'#00b400'}}/>
    </Stack>
  )
}

export default ProfileLayout

const styles = StyleSheet.create({})