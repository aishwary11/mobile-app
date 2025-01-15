import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Contact = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.text}>Name: Haha lola</Text>
      <Text style={styles.text}>Email: contact@example.com</Text>
      <Text style={styles.text}>Phone: +91-85916936</Text>
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
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#ffffff',
  },
});

export default Contact;
