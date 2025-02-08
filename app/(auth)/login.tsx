import axiosInstance from '@/app/common/utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Notifications from 'expo-notifications';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const { data } = await axiosInstance.post('/user/login', user);
      if (data.status) {
        await AsyncStorage.setItem('token', data?.data?.token);
        // await Notifications.scheduleNotificationAsync({
        //   content: {
        //     title: 'Login Successful',
        //     body: 'Welcome back!',
        //   },
        //   trigger: null,
        // });
        router.replace('/(protected)/about');
      } else {
        console.error('Login failed: ', data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/login.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to your account</Text>
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
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <Link href="/(auth)/register">
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
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
  forgotPasswordText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 8,
  },
  signupText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Login;
