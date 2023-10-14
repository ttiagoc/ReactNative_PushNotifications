import React from 'react'
import { Button, View, Image, Text } from 'react-native';

export default function NotificacionEstatica({pushNotification}) {

  
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{fontSize:30}}> REMERAS: </Text>
      <Image height={300} width={300} style={{marginBottom:20}}   source = {{uri:"https://d2r9epyceweg5n.cloudfront.net/stores/001/205/102/products/remera-lisa-fr-rj-11-ef4b6ca4b08c3f434315906905869409-640-0.jpg"}}></Image>

      <Button
      
        title="COMPRAR"
        onPress={async () => {
          await pushNotification("ATENCIÓN", "SE HA REALIZADO UNA COMPRA");
        }}
      />
    </View>
  )
}
