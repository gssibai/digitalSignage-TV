import { Image, StyleSheet, Platform, Pressable, Text, TouchableOpacity, Alert, View, SafeAreaView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import { createScreen } from './hello+api';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

import { useEffect, useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
export default function HomeScreen() {
  const styles = useHomeScreenStyles();
 
  const animation = useRef<LottieView>(null);

  const handleStart = async()=> {
    try {
      const screenName= `${Device.modelName}`;
      const response = await createScreen({ screenName });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      Alert.alert('Success', `Connected to API: ${data.message}`);

    }catch (error) {
      Alert.alert('Error', `Failed to connect: ${error}`);
    }

  }
  return (
    <SafeAreaView style={styles.container}>
  
     <ThemedView  style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        
          }}>
     <LottieView
        autoPlay
        ref={animation}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          justifyContent: 'flex-end',
        }}
        resizeMode="cover"
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/animations/homeBG.json')}
      />
       
     
       <ThemedView style={styles.body}>
          <ThemedText style={[styles.header, { textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }]} type="title">Digital Signage</ThemedText>
       
     
   <ThemedView style={styles.blurButton}>
      <ThemedView style={{  flexDirection:'row', backgroundColor:'none', marginBottom:30}} >
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
     
      
        <TouchableOpacity style={styles.button} onPress={handleStart} >
        <Text >Start</Text>
        </TouchableOpacity>
       
      </ThemedView>
      
      </ThemedView>
   </ThemedView>
        </SafeAreaView>

  );
}

const useHomeScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    body: {
      backgroundColor:'none',
     // flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * scale,
    },
    container: {
      flex: 1,
    },
    blurContainer: {
      flex: 1,
      padding: 0,
      margin: 0,
      textAlign: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: 0,
    },
    blurButton: {
      padding: 10,
      margin: 0,
      textAlign: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      width: 350,
      height: 240,
      borderColor:'white',
      borderWidth: 2,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',},
    background: {
      flex: 1,
      flexWrap: 'wrap',
      ...StyleSheet.absoluteFillObject,
    },
   
    stepContainer: {
      gap: 8 * scale,
      marginBottom: 8 * scale,
    },
   
header: {
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#ffffff',
  marginBottom: 50,
},
    button: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 20,
borderColor:'white',
borderWidth: 2,
 backgroundColor: 'rgba(255, 255, 255, 0.7)',
// backgroundColor:'transparent',

    },
    buttonText: {
      fontSize: 18,
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor:'transparent',
    },
  });
};
