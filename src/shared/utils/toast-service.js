import 'izitoast/dist/css/iziToast.min.css';
import iZtoast from 'izitoast';

const toast = {
  error: (message, title = 'Error') => {
    return iZtoast.error({
      title: title,
      message: message,
      timeout: 3000,
      position: 'bottomRight'
    });
  },
  success: (message, title = 'Success') => {
    return iZtoast.success({
      title: title,
      message: message,
      timeout: 2000,
      position: 'bottomRight'
    });
  }
};

export default toast;
