import React, { useState, useEffect } from 'react';
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
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useSelector, useDispatch } from 'react-redux';
import {
   getSpareParts,
   onSelectImagesPressed,
   closeBottomSheet,
   handleCheckItem,
} from '../../redux/actions/waitView';
import { useIsFocused } from '@react-navigation/native';

const ComplainsDetailes = ({ route, navigation }) => {
   const { data } = route.params;
   const isFocused = useIsFocused();
   const dispatch = useDispatch();
   const { images, guaranteeSpares, outGuaranteeSpares } = useSelector(
      state => ({
         images: state.WaitView.images,
         guaranteeSpares: state.WaitView.inGuaranteeSpares,
         outGuaranteeSpares: state.WaitView.outGuaranteeSpares,
      })
   );
   useEffect(() => {
      dispatch(getSpareParts());
      return () => {};
   }, [isFocused]);

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
               onSelectImagesPressed={() => dispatch(onSelectImagesPressed())}
               images={images}
               inGuaranteeSpares={guaranteeSpares}
               outGuaranteeSpares={outGuaranteeSpares}
               oncloseBottomSheet={() => dispatch(closeBottomSheet())}
               onCheckItem={(index, Id, selectedButton) => {
                  dispatch(handleCheckItem(index, Id, selectedButton));
               }}
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
