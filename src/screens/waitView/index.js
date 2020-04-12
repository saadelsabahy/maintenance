import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
   Header,
   Icon,
   ComplainsItem,
   ImageCarousel,
   CustomButton,
   ImageSelector,
} from '../../components';
import { WHITE_COLOR, MAIN_COLOR } from '../../constants/colors';
import Gurantee from '../../components/insideAndOutsideGuarantee';
import ImagePicker from 'react-native-image-crop-picker';

const ComplainsDetailes = ({ route, navigation }) => {
   const { data } = route.params;
   const [images, setImages] = useState([]);
   const onImagePickerPressed = () => {
      ImagePicker.openPicker({
         width: 200,
         height: 200,
         cropping: false,
         multiple: true,
      })
         .then(seletedImages => {
            const images = [];
            images.push(...seletedImages);
            setImages(images);
         })
         .catch(e => {
            console.log('image picker error', e);
         });
   };

   return (
      <View style={styles.container}>
         <Header>
            <View>
               <Icon
                  name={'ios-arrow-back'}
                  type={'ionicon'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{ flex: 0 }}
                  style={{ transform: [{ rotateY: '-180deg' }] }}
                  onPress={() => navigation.goBack()}
               />
            </View>
            <View>
               <Icon
                  name={'list-unordered'}
                  type={'octicon'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{ flex: 0 }}
               />
            </View>
         </Header>
         <View style={{ width: '100%', height: '30%' }}>
            <ComplainsItem
               {...data}
               onComplainPressed={() => {}}
               containerStyle={styles.complainsItem}
            />
         </View>
         <View style={{ width: '100%', height: '15%', alignItems: 'center' }}>
            <View style={{ height: '100%', width: '95%', alignSelf: 'center' }}>
               <ImageSelector
                  onSelectImagesPressed={onImagePickerPressed}
                  images={images}
               />
            </View>
         </View>

         <View style={{ flex: 1 }}>
            <Gurantee />
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: '100%',
   },
   complainsItem: {
      width: '100%',
      height: '100%',
      borderRadius: 0,
   },
});

export default ComplainsDetailes;
