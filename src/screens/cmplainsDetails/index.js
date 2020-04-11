import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Icon, ComplainsItem, ImageCarousel } from '../../components';
import { WHITE_COLOR, MAIN_COLOR } from '../../constants/colors';
import ChechBox from '../../components/checkBox';
import Gurantee from '../../components/insideAndOutsideGuarantee';

const ComplainsDetailes = ({ route, navigation }) => {
   const { data } = route.params;
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
         {/*   <View
            style={{
               width: '100%',
               height: '45%',
               backgroundColor: MAIN_COLOR,
            }}>
            <ImageCarousel />
         </View> */}
         {/*  <ChechBox />
         <ChechBox />
         <ChechBox />
         <ChechBox /> */}
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
