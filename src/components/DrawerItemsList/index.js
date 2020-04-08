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
   SECONDART_COLOR,
   TEXT_COLOR,
} from '../../constants/colors';
import { Icon } from '../Icon';

const DrawerItemsList = ({ onDrawerItemPressed, data }) => {
   return (
      <View style={[styles.container]}>
         <View style={[styles.contentContainer]}>
            <FlatList
               style={{ flex: 1 }}
               contentContainerStyle={{
                  flexGrow: 1,
               }}
               data={data}
               keyExtractor={(item, index) => `${index}`}
               renderItem={({
                  item,
                  // item: { name, iconName, iconType },
                  index,
               }) => {
                  return (
                     <TouchableOpacity
                        style={styles.itemContainer}
                        activeOpacity={0.7}
                        onPress={onDrawerItemPressed}>
                        {/*  <Icon
                           type={iconType}
                           name={iconName}
                           iconContainerStyle={styles.iconContainer}
                           size={30}
                           color={MAIN_COLOR}
                        /> */}
                        <CustomText text={item} />
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
      backgroundColor: SECONDART_COLOR,
   },
   contentContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
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
   text: {},
});

export default DrawerItemsList;
