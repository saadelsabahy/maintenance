import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
   Header,
   Icon,
   ComplainsItem,
   ImageCarousel,
   CustomButton,
   ImageSelector,
   CustomText,
} from '../../components';
import { WHITE_COLOR, MAIN_COLOR } from '../../constants/colors';
import Gurantee from '../../components/insideAndOutsideGuarantee';
import ImagePicker from 'react-native-image-crop-picker';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const ComplainsDetailes = ({ route, navigation }) => {
   const { data } = route.params;
   const [images, setImages] = useState([]);
   const onSelectImagesPressed = () => {
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
                  iconContainerStyle={{ flex: 1 }}
                  style={{ transform: [{ rotateY: '-180deg' }] }}
                  onPress={() => navigation.goBack()}
                  size={responsiveFontSize(4)}
               />
            </View>
            <CustomText
               text={data.complainNumber}
               textStyle={{ color: WHITE_COLOR }}
            />
            <View>
               <Icon
                  name={'list-unordered'}
                  type={'octicon'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{ flex: 1 }}
                  size={responsiveFontSize(4)}
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

         <View style={{ flex: 1 }}>
            <Gurantee
               onSelectImagesPressed={onSelectImagesPressed}
               images={images}
            />
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: '100%',
      backgroundColor: WHITE_COLOR,
   },
   complainsItem: {
      width: '100%',
      height: '100%',
      borderRadius: 0,
   },
});

export default ComplainsDetailes;
