import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform, Image } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import NotificacionEstatica from "./src/components/NotificacionEstatica";
import NotificacionPersonalizada from "./src/components/NotificacionPersonalizada";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [pantalla, setPantalla] = useState(false)

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  function handleTitulo(e) {
    console.log(e);
  }

  async function schedulePushNotification(
    title = "Titulo Vacio",
    body = "Body Vacio"
  ) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
  
    return token;
  }
  

  return (
    <>
    {pantalla == true ?  (
      <>
      <View style={{height:50}}></View>
      <Button onPress={() => setPantalla(false)} title="CAMBIAR"></Button>
      <NotificacionPersonalizada pushNotification={schedulePushNotification}></NotificacionPersonalizada>
      </>
    ):  (
      <>
      <View style={{height:50}}></View>
      <Button onPress={() => setPantalla(true)} title="CAMBIAR"></Button>
      <NotificacionEstatica pushNotification={schedulePushNotification}></NotificacionEstatica>
      </>
    ) }
    
   
    </>
  );
}

