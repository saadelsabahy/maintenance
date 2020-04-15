import React from 'react';
import { ComplainsItem } from '../complainsItem';
import { LoaderAndRetry } from '../LoaderAndRetry';
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   ActivityIndicator,
} from 'react-native';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   SECONDART_COLOR,
   INDICATOR_YELLOW,
   INDICATOR_RED,
   SCREEN_HEIGHT,
} from '../../constants/colors';
import { useDispatch } from 'react-redux';
import { onComplainPressed } from '../../redux/actions';
import { EmptyList } from '../noData';

const ListAndLoading = ({
   navigation,
   route,
   loading,
   error,
   list,
   paginationLoading,
   onEndReached,
   dateSearch,
}) => {
   const dispatch = useDispatch();

   const renderListFooter = () => {
      return paginationLoading ? (
         <ActivityIndicator color={MAIN_COLOR} />
      ) : null;
   };

   return (
      <View style={{ flex: 1 }}>
         {loading || error ? (
            <LoaderAndRetry loading={loading} error={error} />
         ) : (
            <FlatList
               data={
                  list
                  // dateSearch == 1
                  //    ? list.sort((a, b) => new Date() - new Date(b.CretaedOn))
                  //    : list.sort((a, b) => new Date(b.CretaedOn) - new Date())
               }
               extraData={dateSearch}
               keyExtractor={(item, index) => `${index}`}
               showsVerticalScrollIndicator={false}
               renderItem={({
                  item,
                  item: {
                     Id,
                     VehicleId,
                     DamageType,
                     CretaedOn,
                     UpdatedBy,
                     UpdatedOn,
                     StatusId,
                     Comment,
                     Covered,
                     StatusNameAr,
                     PlateNumber,
                     ContractorId,
                  },
                  index,
               }) => {
                  return (
                     <ComplainsItem
                        complainNumber={Id}
                        complainDate={new Date(CretaedOn).toLocaleDateString()}
                        vehicleCode={VehicleId}
                        vehicleNumber={PlateNumber}
                        vehicleType={'ضاغط'}
                        contractorNumber={ContractorId}
                        indicatorColor={
                           StatusId < 2
                              ? INDICATOR_RED
                              : StatusId > 2
                              ? INDICATOR_YELLOW
                              : INDICATOR_RED
                        }
                        onComplainPressed={data =>
                           dispatch(onComplainPressed(data, navigation, route))
                        }
                     />
                  );
               }}
               onEndReached={onEndReached}
               onEndReachedThreshold={1}
               ListFooterComponent={renderListFooter}
               ListEmptyComponent={
                  <View
                     style={{
                        flex: 1,
                        height: SCREEN_HEIGHT - 70,
                     }}>
                     <EmptyList />
                  </View>
               }
            />
         )}
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
export { ListAndLoading };
