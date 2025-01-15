import axiosInstance from '@/app/common/utils/axios';
import * as Notifications from 'expo-notifications';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    if (user.password !== user.confirmPassword) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Registration Failed',
          body: 'Passwords do not match',
        },
        trigger: null,
      });
      return;
    }
    try {
      await axiosInstance.post('/user/register', user);
      alert('Registration successful');
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Registration Successful',
          body: 'Welcome!',
        },
        trigger: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/login.jpg')}
        style={styles.logo}
      />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={email => setUser({ ...user, email })}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={user.password}
        onChangeText={password => setUser({ ...user, password })}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={user.confirmPassword}
        onChangeText={confirmPassword => setUser({ ...user, confirmPassword })}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Link href="/(auth)/login">
        <Text style={styles.loginText}>Already have an account? Log in</Text>
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
    color: '#bbbbbb',
  },
  input: {
    height: 48,
    width: '100%',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
  },
  button: {
    height: 48,
    width: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  loginText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Register;
