import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Playing() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Playing</Text>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171821',
    flex: 1,
  }
})