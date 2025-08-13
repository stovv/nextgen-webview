import {StyleSheet, ImageBackground, SafeAreaView, View, Text, ScrollView} from "react-native";
import {SearchForm} from "../components/search-form";
import {Button} from "../components/button";
import { NavigationService } from '../native-modules';
import {IconButton} from "../components/icon-button";
import IconBack from "../components/icons/icon-back";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Card} from "../components/card";
import LogoIcon from "../components/icons/logo";
import React from "react";
import {NativeFeatures} from "../components/native-features";

export default function Home() {
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView>
      <ImageBackground source={require('../assets/BG.png')} style={[styles.container, { paddingTop: top }]}>
        <View style={styles.header}>
          <View style={styles.logoBack}>
            <IconButton icon={IconBack} onClick={() => NavigationService.close()}/>
            <LogoIcon />
          </View>
          <View style={styles.spacerXl} />
          <SearchForm/>
        </View>
        <View style={styles.content}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
            <Card view='insurance'/>
            <View style={styles.hSpacerS}/>
            <Card view='credit'/>
            <View style={styles.hSpacerS}/>
            <Card view='insurance'/>
            <View style={styles.hSpacerS}/>
            <Card view='credit'/>
          </ScrollView>
          <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
            <NativeFeatures />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
  },
  header: {
    paddingTop: 8,
    paddingHorizontal: 16,
    zIndex: 2
  },
  logoBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 52
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -40,
    paddingTop: 70,
    zIndex: 1,
  },
  spacerXl: {
    height: 24,
  },
  hSpacerS: {
    width: 12
  }
});