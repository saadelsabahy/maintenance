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
   INDICATOR_GREEN,
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
         <View
            style={{
               width: '100%',
               height: 30,
               alignItems: 'center',
               justifyContent: 'center',
            }}>
            <ActivityIndicator color={MAIN_COLOR} />
         </View>
      ) : null;
   };
   const Ids = [...new Set(list.map(item => item.Id))];
   const notRedundency = Ids.map(id => list.find(order => order.Id == id));

   return (
      <View style={{ flex: 1 }}>
         {loading || error ? (
            <LoaderAndRetry loading={loading} error={error} />
         ) : (
            <FlatList
               data={
                  notRedundency
                  // dateSearch == 1
                  //    ? list.sort((a, b) => new Date() - new Date(b.CretaedOn))
                  //    : list.sort((a, b) => new Date(b.CretaedOn) - new Date())
               }
               extraData={dateSearch}
               keyExtractor={(item, index) => `${item.Id}`}
               showsVerticalScrollIndicator={false}
               scrollEventThrottle={100}
               maxToRenderPerBatch={30}
               updateCellsBatchingPeriod={1000}
               initialNumToRender={10}
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
                     ComplianSpareParts,
                     ComplianImages,
                     VehicleType,
                  },
                  index,
               }) => {
                  return (
                     <ComplainsItem
                        complainNumber={Id}
                        complainDate={new Date(CretaedOn).toLocaleDateString()}
                        vehicleCode={VehicleId}
                        vehicleNumber={PlateNumber}
                        vehicleType={VehicleType}
                        contractorNumber={ContractorId}
                        complainStatus={StatusId}
                        images={ComplianImages}
                        spareParts={ComplianSpareParts}
                        indicatorColor={
                           StatusId == 4
                              ? INDICATOR_GREEN
                              : StatusId == 5 || StatusId == 1
                              ? INDICATOR_RED
                              : INDICATOR_YELLOW
                        }
                        onComplainPressed={data =>
                           dispatch(onComplainPressed(data, navigation, route))
                        }
                     />
                  );
               }}
               onEndReached={onEndReached}
               onEndReachedThreshold={0.5}
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
