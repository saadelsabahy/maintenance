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
} from '../../redux/actions';
import ListHeader from './Header';
import withObservables from '@nozbe/with-observables';
const Complains = ({ navigation, route, complains }) => {
   const isFocused = useIsFocused();
   const dispatch = useDispatch();
   const [isModalVisible, setisModalVisible] = useState(false);
   const menuRef = useRef(null);
   const [filterLabel, setfilterLabel] = useState(null);
   const [dateSearch, setDateSearch] = useState(2);
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
   }));
   useEffect(() => {
      if (isFocused) {
         if (route.params && route.params.hasOwnProperty('distination')) {
            const { distination } = route.params;
            dispatch(getAllComplainsList(distination));
         } else {
            dispatch(getAllComplainsList(null));
         }
      } else {
         return;
      }

      return () => {
         dispatch(emptyListOnUnmount());
      };
   }, [isFocused]);
   const onListEndReached = () => {
      if (search) {
         if (route.params && route.params.hasOwnProperty('distination')) {
            const { distination } = route.params;
            dispatch(LoadSearchPagination(distination));
         } else {
            dispatch(LoadSearchPagination(null));
         }
      } else {
         dispatch(LoadPagination());
      }
   };
   const onSearch = () => {
      if (isFocused) {
         if (route.params && route.params.hasOwnProperty('distination')) {
            const { distination } = route.params;
            dispatch(onSearchPressed(distination));
         } else {
            dispatch(onSearchPressed(null));
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

   return (
      <View style={styles.container}>
         <ListHeader
            route={route}
            toggleSearchModal={toggleSearchModal}
            menuRef={menuRef}
            filterLabel={filterLabel}
            onMenuItemPressed={onFilterItemPressed}
         />
         <View style={styles.listContainer} />
         <View style={styles.contentContainer}>
            <ListAndLoading
               navigation={navigation}
               route={route}
               loading={search ? searchLoading : getComplainsListLoading}
               error={search ? searchError : getComplainsListErorr}
               list={
                  route.params && route.params.hasOwnProperty('distination')
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
            />
         </View>

         <SearchModal
            isModalVisible={isModalVisible}
            onBackdropPress={toggleSearchModal}
            searchDropdownLabels={[
               { id: '1', text: 'قيد المعاينه' },
               { id: '2', text: 'قيد التعميد' },
               { id: '3', text: 'قيد التنفيذ' },
               { id: '4', text: 'تم الحل' },
               { id: '5', text: 'مرفوض' },
            ]}
            onSearchPressed={onSearch}
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
/* const enhance = withObservables(['complains'], ({ complains }) => ({
   complains,
})); */

export default Complains;
