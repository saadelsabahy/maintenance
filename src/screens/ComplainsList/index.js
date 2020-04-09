import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   SECONDART_COLOR,
} from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import {
   SearchModal,
   ComplainsItem,
   CustomDropDown,
   Header,
   CustomText,
   Icon,
} from '../../components';
const Complains = () => {
   const [isModalVisible, setisModalVisible] = useState(false);
   const [filterLabel, setfilterLabel] = useState('');
   const menuRef = useRef(null);
   const toggleSearchModal = () => {
      setisModalVisible(!isModalVisible);
   };

   return (
      <View style={styles.container}>
         <Header>
            <Icon
               name={'search'}
               type={'feather'}
               color={WHITE_COLOR}
               iconContainerStyle={{ flex: 0 }}
               onPress={toggleSearchModal}
            />

            <View
               style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
               }}>
               <CustomText
                  text={'البلاغات'}
                  textStyle={{
                     color: WHITE_COLOR,
                     fontSize: responsiveFontSize(2.7),
                  }}
               />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <CustomDropDown
                  labels={['this week', 'last month']}
                  onMenuItemPressed={label => {
                     setfilterLabel(label);
                     menuRef.current.hide();
                  }}
                  selectedItem={filterLabel}
                  button={
                     <Icon
                        name={'filter-outline'}
                        type={'material-community'}
                        color={WHITE_COLOR}
                        iconContainerStyle={{ flex: 1 }}
                        onPress={() => menuRef.current.show()}
                     />
                  }
                  refrence={menuRef}
               />
               <CustomText text={filterLabel} />
            </View>
         </Header>
         <View style={styles.listContainer}>
            <View style={styles.contentContainer}>
               <ComplainsItem
                  complainNumber={254555}
                  complainDate={'25/5/2020'}
                  vehicleCode={'2548as4'}
                  vehicleNumber={25}
                  vehicleType={'jsubn282'}
                  contractorNumber={81}
                  indicatorColor={'#0f0'}
               />
               <ComplainsItem
                  complainNumber={254555}
                  complainDate={'25/5/2020'}
                  vehicleCode={'2548as4'}
                  vehicleNumber={25}
                  vehicleType={'jsubn282'}
                  contractorNumber={81}
                  indicatorColor={'#f00'}
               />
            </View>
         </View>
         <SearchModal
            isModalVisible={isModalVisible}
            onBackdropPress={toggleSearchModal}
            searchDropdownLabels={[
               'bla',
               'bla bla',
               'tytyy',
               'gfgfgfg',
               'tytyty',
               'tyytty',
            ]}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MAIN_COLOR,
      justifyContent: 'space-between',
   },
   listContainer: {
      flex: 0.92,
      backgroundColor: SECONDART_COLOR,
      borderTopStartRadius: 50,
   },
   contentContainer: {
      width: '90%',
      height: '100%',
      alignSelf: 'center',
      bottom: 0,
      top: '-5%',
      marginBottom: 5,
   },
});

export default Complains;
