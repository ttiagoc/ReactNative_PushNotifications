import React, { useState} from "react";
import { Text, View, Button, TextInput } from "react-native";

export default function NotificacionPersonalizada({pushNotification}) {

  const [titleState, setTitle] = useState();
  const [bodyState, setBody] = useState();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text> Titulo: </Text>
      <TextInput
        id="tituloInput"
        onChangeText={(text) => setTitle(text)}
        placeholder="Titulo"
        style={{
          height: 40,
          width: "80%",
          paddingLeft: 6,
          borderWidth: 2,
          borderColor: "black",
          margin: 5,
          borderRadius: 20,
        }}
      >
        {" "}
      </TextInput>
      <Text> Contenido: </Text>
      <TextInput
        id="bodyInput"
        onChangeText={(text) => setBody(text)}
    
        style={{
          height: 40,
          width: "80%",
          paddingLeft: 6,
          borderWidth: 2,
          borderColor: "black",
          margin: 5,
          borderRadius: 20,
        }}
      ></TextInput>

      <Button
        title="Enviar Notificacion"
        onPress={async () => {
          await pushNotification(titleState, bodyState);
        }}
      />
    </View>
  );
}

