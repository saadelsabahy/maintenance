import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Linking } from 'react-native';


const CustomMap = ({ mapStyle, mapContainerStyle, location }) => {
   const region = {
      latitude: 30.03,
      longitude: 31.14,
      latitudeDelta: 0.92,
      longitudeDelta: 0.092,
      locationLabel: 'location name',
   };

   const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
   });

   const latLng = `${region.latitude},${region.longitude}`;
   const label = region.locationLabel;
   const url = Platform.select({
      ios: `${scheme}${label}@${region.longitude}`,
      android: `${scheme}${latLng}(${label})`,
   });
   
   return (
      <TouchableOpacity
         style={[styles.container, mapContainerStyle]}
         onPress={() =>
            Linking.canOpenURL(
               `geo:${region.latitude},${region.longitude}`
            ).then(supported => {
               if (supported) {
                  Linking.openURL(url);
               } else {
                  alert('sorry invalid url');
               }
            })
         }
         activeOpacity={0.9}>
         <MapView initialRegion={region} style={[styles.map, mapStyle]}>
            <Marker
               coordinate={region}
               image={require('../../assets/images/marker.png')}
            />
         </MapView>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '40%',
   },
   map: {
      flex: 1,
   },
});

export { CustomMap };
