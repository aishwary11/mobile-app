import { Link } from "expo-router";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>Welcome to our demo app. This is the about page where you can learn more about our application and its features.</Text>
      <Link href="/(protected)/contact">
        <Text style={styles.signupText}>Contact</Text>
      </Link>
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
  signupText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 18
  },
});

export default About;
