import { showMessage, hideMessage } from 'react-native-flash-message';
export const showFlashMessage = (type, message, ...res) => {
   showMessage({ type, message, ...res });
};

export const hideFlashMessage = (type, message, ...res) => {
   hideFlashMessage();
};
