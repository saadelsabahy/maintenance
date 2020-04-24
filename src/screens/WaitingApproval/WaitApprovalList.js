import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   SECONDART_COLOR,
} from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import {
   SearchModal,
   CustomDropDown,
   Header,
   CustomText,
   Icon,
   ListAndLoading,
} from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
   getAllComplainsList,
   onComplainPressed,
   getComplainsForDashboardTypes,
   emptyListOnUnmount,
} from '../../redux/actions';
import { getWaitViewComplains } from '../../redux/actions/waitView';
const WaitApprovalList = ({ navigation, route }) => {
   const isFocused = useIsFocused();
   const dispatch = useDispatch();
   const [isModalVisible, setisModalVisible] = useState(false);
   const [filterLabel, setfilterLabel] = useState('');
   const menuRef = useRef(null);

   useEffect(() => {
      return () => {};
   }, [isFocused]);

   const toggleSearchModal = () => {
      setisModalVisible(!isModalVisible);
   };
   const {} = useSelector(state => ({}));
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
                  text={
                     route.params && route.params.hasOwnProperty('headerText')
                        ? route.params.headerText
                        : 'البلاغات'
                  }
                  textStyle={{
                     color: WHITE_COLOR,
                     fontSize: responsiveFontSize(2.7),
                  }}
               />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <CustomDropDown
                  labels={['الاقدم', 'الاحدث']}
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
                        iconContainerStyle={{ flex: 0 }}
                        onPress={() => menuRef.current.show()}
                     />
                  }
                  refrence={menuRef}
               />
            </View>
         </Header>
         <View style={styles.listContainer} />
         <View style={styles.contentContainer}>
            {/*  <ListAndLoading navigation={navigation} route={route} list={} loading={} error={} paginationLoading={} onEndReached={}/> */}
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
      height: '90%',
      position: 'absolute',
      alignSelf: 'center',
      bottom: 0,
   },
});

export default WaitApprovalList;