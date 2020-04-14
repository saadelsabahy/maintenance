import {
   GET_WAITVIEW_COMPLAINS_FAILED,
   GET_WAITVIEW_COMPLAINS_SPINNER,
   GET_WAITVIEW_COMPLAINS_SUCCESS,
} from './waitViewTypes';
import Api from '../../../apis';
export const getWaitViewComplains = currentdistination => async (
   dispatch,
   getState
) => {
   const {
      platNumber,
      dateFrom,
      dateTo,
      contractorId,
      rowsNumber,
      pageNumber,
   } = getState().WaitView;
   try {
      dispatch({ type: GET_WAITVIEW_COMPLAINS_SPINNER });
      const waitViewComplainsResponse = await Api.get(
         `DamageComplain/GetPaging?statusId=${currentdistination}&platNumber=${platNumber}&dateFrom=${dateFrom}&dateTo=${dateTo}&contractorId=${contractorId}&rowsNumber=${rowsNumber}&pageNumber=${pageNumber}`
      );

      if (waitViewComplainsResponse.status == 200) {
         const { data } = waitViewComplainsResponse;
         dispatch({
            type: GET_WAITVIEW_COMPLAINS_SUCCESS,
            payload: data,
         });
      }
   } catch (error) {
      console.log('get dashboard complain failed', error);
      dispatch({ type: GET_WAITVIEW_COMPLAINS_FAILED });
   }
};
