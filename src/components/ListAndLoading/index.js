import React, { useState } from 'react';
import { ComplainsItem } from '../complainsItem';
import { LoaderAndRetry } from '../LoaderAndRetry';
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   ActivityIndicator,
   RefreshControl,
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
   hanleRetry,
}) => {
   const dispatch = useDispatch();
   const [loadMore, setloadMore] = useState(false);
   const [refreshing, setRefreshing] = useState(false);
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
   const handleRefresh = async () => {
      setRefreshing(true);
      hanleRetry();
      setRefreshing(false);
   };
   const Ids = [...new Set(list.map(item => item.Id))];
   const notRedundency = Ids.map(id => list.find(order => order.Id == id));

   return (
      <View style={{ flex: 1 }}>
         {loading || error ? (
            <LoaderAndRetry
               loading={loading}
               error={error}
               onRetryPressed={hanleRetry}
            />
         ) : (
            <FlatList
               data={notRedundency}
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
                        covered={Covered}
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
               onEndReached={() => {
                  loadMore ? onEndReached() : null;
               }}
               refreshControl={
                  <RefreshControl
                     refreshing={refreshing}
                     onRefresh={handleRefresh}
                     colors={[MAIN_COLOR]}
                  />
               }
               onEndReachedThreshold={0.5}
               onScroll={() => setloadMore(true)}
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
