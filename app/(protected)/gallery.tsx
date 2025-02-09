import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native';

const Gallery = () => {
  const [mediaAssets, setMediaAssets] = useState<MediaLibrary.Asset[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const colorScheme = useColorScheme();

  useEffect(() => {
    getMediaAssets();
  }, []);

  const getMediaAssets = async () => {
    try {
      if (!permissionResponse || permissionResponse.status !== 'granted') {
        const permission = await requestPermission();
        if (permission.status !== 'granted') {
          Alert.alert('Permission Required', 'Please grant access to your media library to view images.');
          return;
        }
      }

      const assetsResponse = await MediaLibrary.getAssetsAsync({
        first: 50,
        mediaType: ['photo'],
      });

      setMediaAssets(assetsResponse.assets);
    } catch (error) {
      console.error('Failed to fetch media assets:', error);
      Alert.alert('Error', 'Failed to load images from the gallery.');
    }
  };

  const handleUpload = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!pickerResult.canceled && pickerResult.assets.length > 0) {
        const assetUri = pickerResult.assets[0].uri;
        await MediaLibrary.createAssetAsync(assetUri);
        getMediaAssets();
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      Alert.alert('Error', 'Failed to upload the selected image.');
    }
  };

  const renderItem = ({ item }: { item: MediaLibrary.Asset; }) => (
    <Image source={{ uri: item.uri }} style={styles.image} />
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.headerText,
            colorScheme === 'dark' ? styles.darkText : styles.lightText,
          ]}
        >
          Gallery
        </Text>
        <Button title="Upload" onPress={handleUpload} />
      </View>
      <FlatList
        data={mediaAssets}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={renderItem}
        contentContainerStyle={styles.galleryContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
  galleryContainer: {
    paddingHorizontal: 4,
  },
  image: {
    width: 100,
    height: 100,
    margin: 4,
  },
});

export default Gallery;