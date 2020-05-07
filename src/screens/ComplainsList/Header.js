import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
   SearchModal,
   CustomDropDown,
   Header,
   CustomText,
   Icon,
   ListAndLoading,
} from '../../components';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   SECONDART_COLOR,
} from '../../constants/colors';
const ListHeader = ({
   route,
   toggleSearchModal,
   menuRef,
   filterLabel,
   onMenuItemPressed,
   navigation,
}) => {
   return (
      <Header containerStyle={{ width: '100%' }}>
         <Icon
            name={'ios-arrow-back'}
            type={'ionicon'}
            color={WHITE_COLOR}
            style={{ transform: [{ rotateY: '-180deg' }] }}
            onPress={() => navigation.goBack()}
            iconContainerStyle={{ flex: 0.2 }}
            size={responsiveFontSize(4)}
         />

         <CustomText
            text={
               route.params && route.params.headerText
                  ? route.params.headerText
                  : 'البلاغات'
            }
            textStyle={{
               color: WHITE_COLOR,
               fontSize: responsiveFontSize(2.7),
            }}
         />

         <View
            style={{
               flex: 0.3,
               flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'space-evenly',
               height: '100%',
            }}>
            <CustomDropDown
               labels={[{ id: 1, text: 'الاقدم' }, { id: 0, text: 'الأحدث' }]}
               onMenuItemPressed={onMenuItemPressed}
               selectedItem={
                  filterLabel ? filterLabel : { id: 0, text: 'الأحدث' }
               }
               button={
                  <Icon
                     name={'filter-outline'}
                     type={'material-community'}
                     color={WHITE_COLOR}
                     iconContainerStyle={{ flex: 0 }}
                     onPress={() => menuRef.current.show()}
                  />
               }
               refrence={menuRef}
            />
            <Icon
               name={'search'}
               type={'feather'}
               color={WHITE_COLOR}
               iconContainerStyle={{ flex: 0 }}
               onPress={toggleSearchModal}
            />
         </View>
      </Header>
   );
};

export default ListHeader;
