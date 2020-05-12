import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   SECONDART_COLOR,
} from '../../constants/colors';
import { SearchModal, ListAndLoading } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
   getAllComplainsList,
   onSearchPressed,
   emptyListOnUnmount,
   LoadPagination,
   LoadSearchPagination,
   onSearchInputsChange,
} from '../../redux/actions';
import ListHeader from './Header';
import withObservables from '@nozbe/with-observables';
const Complains = ({ navigation, route, complain }) => {
   const isFocused = useIsFocused();
   const dispatch = useDispatch();
   const [isModalVisible, setisModalVisible] = useState(false);
   const menuRef = useRef(null);
   const [filterLabel, setfilterLabel] = useState(null);
   const [dropDownText, setdropDownText] = useState('');
   const [dateSearch, setDateSearch] = useState(0);
   const [reload, setReload] = useState(false);
   const toggleSearchModal = () => {
      setisModalVisible(!isModalVisible);
   };
   const {
      complainsList,
      getComplainsListErorr,
      getComplainsListLoading,
      paginationLoading,
      paginationError,
      search,
      searchError,
      searchLoading,
      SearchPaginationLoading,
      complainNumber,
      complainStatus,
      complainType,
      searchContructorId,
      searchPlateNumber,
   } = useSelector(state => ({
      complainsList: state.Complains.complainsList,
      getComplainsListLoading: state.Complains.getComplainsListLoading,
      getComplainsListErorr: state.Complains.getComplainsListErorr,
      paginationLoading: state.Complains.paginationLoading,
      paginationError: state.Complains.paginationError,
      searchLoading: state.Complains.searchLoading,
      searchError: state.Complains.searchError,
      search: state.Complains.search,
      SearchPaginationLoading: state.Complains.SearchPaginationLoading,
      complainNumber: state.Complains.complainNumber,
      searchContructorId: state.Complains.searchContructorId,
      complainStatus: state.Complains.complainStatus,
      searchPlateNumber: state.Complains.searchPlateNumber,
      complainType: state.Complains.complainType,
      startDate: state.Complains.startDate,
      endDate: state.Complains.endDate,
   }));

   const onListEndReached = () => {
      if (search) {
         if (route.params && route.params.distination) {
            const { distination } = route.params;
            dispatch(LoadSearchPagination(distination, dateSearch));
         } else {
            dispatch(LoadSearchPagination(null, dateSearch));
         }
      } else {
         if (route.params && route.params.distination) {
            const { distination } = route.params;
            dispatch(LoadPagination(distination, dateSearch));
         } else {
            dispatch(LoadPagination(null, dateSearch));
         }
      }
   };
   const onSearch = () => {
      if (isFocused) {
         if (route.params && route.params.distination) {
            const { distination } = route.params;
            dispatch(onSearchPressed(distination, dateSearch));
         } else {
            dispatch(onSearchPressed(null, dateSearch));
         }
      } else {
         return;
      }
      toggleSearchModal();
   };
   const onFilterItemPressed = label => {
      setfilterLabel(label);
      menuRef.current.hide();
      setDateSearch(label.id);
   };
   useEffect(() => {
      if (isFocused) {
         getData();
      } else {
         return;
      }

      return () => {};
   }, [isFocused, reload, dateSearch]);
   useEffect(() => {
      return () => {
         dispatch(emptyListOnUnmount());
         setdropDownText('');
         setDateSearch(0);
         setfilterLabel(null);
      };
   }, [isFocused]);
   const getData = () => {
      if (search) {
         dispatch(
            onSearchPressed(
               route.params && route.params.distination
                  ? route.params.distination
                  : null,
               dateSearch
            )
         );
      } else {
         dispatch(
            getAllComplainsList(
               route.params && route.params.distination
                  ? route.params.distination
                  : null,
               dateSearch
            )
         );
      }
   };
   const onSearchDropdownPressed = (label, menu) => {
      dispatch(onSearchInputsChange('complainType', label.id));
      setdropDownText(label.text);
      menu.hide();
   };
   return (
      <View style={styles.container}>
         <ListHeader
            route={route}
            toggleSearchModal={toggleSearchModal}
            menuRef={menuRef}
            filterLabel={filterLabel}
            onMenuItemPressed={onFilterItemPressed}
            navigation={navigation}
         />
         <View style={styles.listContainer} />
         <View style={styles.contentContainer}>
            <ListAndLoading
               navigation={navigation}
               route={route}
               loading={search ? searchLoading : getComplainsListLoading}
               error={search ? searchError : getComplainsListErorr}
               list={
                  route.params && route.params.distination
                     ? complainsList.filter(
                          item => item.StatusId === route.params.distination
                       )
                     : complainsList
               }
               onEndReached={onListEndReached}
               paginationLoading={
                  search ? SearchPaginationLoading : paginationLoading
               }
               dateSearch={dateSearch}
               hanleRetry={() => setReload(!reload)}
            />
         </View>

         <SearchModal
            isModalVisible={isModalVisible}
            onBackdropPress={toggleSearchModal}
            searchDropdownLabels={[
               { id: 'null', text: 'جميع البلاغات' },
               { id: '1', text: 'قيد المعاينه' },
               { id: '2', text: 'قيد التعميد' },
               { id: '3', text: 'قيد التنفيذ' },
               { id: '4', text: 'تم الحل' },
               { id: '5', text: 'مرفوض' },
            ]}
            onSearchPressed={onSearch}
            complainNumber={complainNumber}
            complainStatus={complainStatus}
            contructorId={searchContructorId}
            plateNumber={searchPlateNumber}
            source={
               route.params && route.params.distination
                  ? route.params.distination
                  : 0
            }
            onSearchDropdownPressed={onSearchDropdownPressed}
            dropDownText={dropDownText}
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

const enhance = withObservables(['complains'], ({ complain }) => ({
   complain,
}));

export default Complains;
