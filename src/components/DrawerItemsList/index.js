import React from 'react';
import {
   View,
   Text,
   FlatList,
   StyleSheet,
   TouchableOpacity,
} from 'react-native';
import { CustomText } from '../customText';
import {
   DRAWER_BACKGROUND,
   DRAWER_DIVIDER,
   DRAWER_TEXT,
   MAIN_COLOR,
} from '../../constants/colors';
import { Icon } from '../Icon';

const DrawerItemsList = ({ onDrawerItemPressed }) => {
   const data = [
      { name: 'الرئيسيه', iconType: 'fontawsome', iconName: 'home' },
      {
         name: 'البلاغات',
         iconType: 'material-community',
         iconName: 'file-eye-outline',
      },
   ];
   return (
      <View style={[styles.container]}>
         <View style={[styles.contentContainer]}>
            <FlatList
               style={{ flex: 1 }}
               contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center',
               }}
               data={data}
               keyExtractor={(item, index) => `${index}`}
               renderItem={({
                  item,
                  item: { name, iconName, iconType },
                  index,
               }) => {
                  return (
                     <TouchableOpacity
                        style={styles.itemContainer}
                        activeOpacity={0.7}
                        onPress={onDrawerItemPressed}>
                        <Icon
                           type={iconType}
                           name={iconName}
                           iconContainerStyle={styles.iconContainer}
                           size={30}
                           color={MAIN_COLOR}
                        />
                        <CustomText text={name} textStyle={styles.text} />
                     </TouchableOpacity>
                  );
               }}
            />
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: DRAWER_BACKGROUND,
   },
   contentContainer: {
      flex: 1,
      justifyContent: 'center',
      width: '90%',
      alignSelf: 'flex-end',
   },
   itemContainer: {
      height: 50,
      alignItems: 'flex-end',
      flexDirection: 'row',
      borderBottomColor: DRAWER_DIVIDER,
      borderBottomWidth: 1,
   },
   iconContainer: {
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
   },
   text: {
      color: DRAWER_TEXT,
      fontSize: 18,
   },
});

export default DrawerItemsList;
