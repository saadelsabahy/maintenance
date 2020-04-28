import { SELECT_EXCUTION_IMAGES } from '../../actions/complainStatus/types';

const initialState = {
   images: [],
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case SELECT_EXCUTION_IMAGES:
         return { ...state, images: payload };

      default:
         return state;
   }
};
