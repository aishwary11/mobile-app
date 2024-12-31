import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AboutPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>Welcome to our demo app. This is the about page where you can learn more about our application and its features.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ffffff',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default AboutPage;
