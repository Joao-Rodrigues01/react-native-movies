import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Playing() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Continue Watching
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171821',
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 20,
  }
})