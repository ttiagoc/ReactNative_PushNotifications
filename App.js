import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform, Image } from "react-native";

import registerNNPushToken from "native-notify";
import { StatusBar } from "expo-status-bar";

export default function App() {
  registerNNPushToken(13510, 'BvVVG0NNc5qD8cAdqhSyrs');

  return (
    <>
      <View>
        <Text> Shalom </Text>
        <StatusBar style="auto"/>
      </View>
    </>
  );
}

