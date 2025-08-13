import React from 'react';

import {Alert, Platform, View} from 'react-native';
import { Vibration, Linking, Share } from 'react-native';

import {
  getCameraPermissionsAsync,
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';

import {Button} from "./button";

export const NativeFeatures = () => {

  // Камера
  const openCamera = async () => {
    const open = async () => {
      try {
        const cameraPermissions = await getCameraPermissionsAsync();
        if (!cameraPermissions?.granted) {
          const res = await requestCameraPermissionsAsync();
          if (!res.granted) return;
        }

        const result = await launchCameraAsync({
          mediaTypes: ['images'],
          selectionLimit: 3,
          quality: 1,
        });
      } catch (e) {
        console.error(e);
      }
    };

    await open();
  };

  // Открытие ссылки
  const openLink = () => {
    Linking.openURL('https://reactnative.dev').catch(err =>
      Alert.alert('Ошибка', 'Не удалось открыть ссылку')
    );
  };

  // Шаринг
  const shareContent = async () => {
    try {
      await Share.share({
        message: 'Читай доку!',
        url: 'https://reactnative.dev',
        title: 'React Native',
      });
    } catch (error) {
      Alert.alert('Ошибка', `${error}`);
    }
  };

  // Информация о платформе
  const showPlatformInfo = () => {
    Alert.alert('Платформа', `Вы используете ${Platform.OS} ${Platform.Version}`);
  };

  return (
    <>
      <View style={{ height: 32 }} />
      <Button title="Камера" onClick={openCamera}/>
      <View style={{ height: 12 }} />
      <Button title="Открыть ссылку" onClick={openLink}/>
      <View style={{ height: 12 }} />
      <Button title="Поделиться" onClick={shareContent}/>
      <View style={{ height: 12 }} />
      <Button title="Информация о платформе" onClick={showPlatformInfo}/>
    </>
  )
};