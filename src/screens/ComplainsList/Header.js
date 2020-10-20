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
   HEADER_ICONS_COLOR,
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
      <Header containerStyle={{ width: '90%' }}>
         <Icon
            name={'arrow-right'}
            type={'simple-line-icon'}
            color={HEADER_ICONS_COLOR}
            onPress={() => navigation.goBack()}
            iconContainerStyle={{ flex: 0.3, alignItems: 'flex-start' }}
            size={responsiveFontSize(3)}
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
               justifyContent: 'space-between',
               height: '100%',
            }}>
            <CustomDropDown
               labels={[{ id: 0, text: 'الاقدم' }, { id: 1, text: 'الأحدث' }]}
               onMenuItemPressed={onMenuItemPressed}
               selectedItem={
                  filterLabel ? filterLabel : { id: 1, text: 'الأحدث' }
               }
               button={
                  <Icon
                     name={'filter-outline'}
                     type={'material-community'}
                     color={HEADER_ICONS_COLOR}
                     iconContainerStyle={{ flex: 0 }}
                     onPress={() => menuRef.current.show()}
                  />
               }
               refrence={menuRef}
            />
            <Icon
               name={'search'}
               type={'feather'}
               color={HEADER_ICONS_COLOR}
               iconContainerStyle={{ flex: 0 }}
               onPress={toggleSearchModal}
            />
         </View>
      </Header>
   );
};

export default ListHeader;
