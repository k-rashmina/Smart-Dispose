import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
      <Link style={{marginTop: 50, alignSelf: 'center', color: 'blue', fontSize: 20}} href={'/profile/inqlist'}>Inquiries</Link>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})