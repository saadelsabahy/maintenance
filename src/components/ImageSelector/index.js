import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Icon } from '../Icon';
import {
   SCREEN_WIDTH,
   MAIN_COLOR,
   WHITE_COLOR,
   SCREEN_HEIGHT,
   MAIN_RED_COLOR,
} from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
const ImageSelector = ({ images, onSelectImagesPressed, containerStyle }) => {
   const EmptyLiImageList = length => {
      return [...Array(length).keys()].map(String).map((item, index) => {
         return <View style={styles.imageContainer} key={item} />;
      });
   };
   const placeHolder = [...Array(3 - images.length).keys()].map(String);
   return (
      <View style={[styles.container, containerStyle]}>
         <TouchableOpacity
            style={styles.IconContainer}
            onPress={onSelectImagesPressed}
            activeOpacity={0.95}>
            <Icon
               name={'camera'}
               type={'simple-line-icon'}
               color={WHITE_COLOR}
               size={responsiveFontSize(4)}
            />
         </TouchableOpacity>
         <View
            style={{
               flex: 0.85,
               alignItems: 'center',
               justifyContent: 'center',
            }}>
            <FlatList
               horizontal
               style={{ flex: 1 }}
               contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
               }}
               ListEmptyComponent={() => EmptyLiImageList(3)}
               data={
                  images.length < 3 && images.length
                     ? [...images, ...placeHolder]
                     : images
               }
               keyExtractor={(item, index) => `${index}`}
               renderItem={({ item, item: { path }, index }) => {
                  return (
                     <>
                        <View style={styles.imageContainer}>
                           {path && (
                              <Image
                                 source={{ uri: path }}
                                 style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                 }}
                              />
                           )}
                        </View>
                        {/* {images.length < 3 &&
                           EmptyLiImageList(3 - images.length)} */}
                     </>
                  );
               }}
            />
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      height: SCREEN_HEIGHT / 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      alignSelf: 'center',
   },
   IconContainer: {
      width: SCREEN_WIDTH / 6,
      height: SCREEN_HEIGHT / 11,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: MAIN_RED_COLOR,
      marginEnd: 5,
   },
   imageContainer: {
      width: 70,
      height: SCREEN_HEIGHT / 11,
      backgroundColor: MAIN_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      shadowOffset: { width: 0, height: 5 },
      shadowColor: '#000',
      shadowOpacity: 0.7,
      shadowRadius: 5,
      elevation: 5,
      overflow: 'hidden',
      marginEnd: 5,
   },
});

export { ImageSelector };
