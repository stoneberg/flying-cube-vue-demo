import 'izitoast/dist/css/iziToast.min.css';
import iZitoast from 'izitoast';

iZitoast.settings({
  resetOnHover: true,
  transitionIn: 'fadeInUp',
  transitionOut: 'fadeOut',
  timeout: 3000,
  closeOnClick: true,
  onOpening: function() {
    console.log('callback open!');
  },
  onClosing: function() {
    console.log('callback close!');
  }
});

const toast = {
  info: (message, title = 'Info') => {
    return iZitoast.info({
      title: title,
      message: message,
      position: 'center',
      titleColor: 'white',
      messageColor: 'white',
      color: '#4ACE35',
      iconColor: ''
    });
  },
  success: (message, title = 'Success') => {
    return iZitoast.success({
      title: title,
      message: message,
      position: 'bottomRight',
      titleColor: 'white',
      messageColor: 'white',
      color: '#3393FF',
      iconColor: ''
    });
  },
  error: (message, title = 'Error') => {
    return iZitoast.error({
      title: title,
      message: message,
      position: 'bottomRight',
      titleColor: 'white',
      messageColor: 'white',
      color: '#FF3933',
      iconColor: ''
    });
  }
};

export default toast;
