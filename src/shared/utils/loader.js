import store from '@/store';
import NProgress from 'nprogress';

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

store.watch(
  state => state.getter.loading,
  (newVal, oldVal) => {
    console.log('newVal===>', newVal);
    console.log('oldVal===>', oldVal);
    if (newVal === 0) return NProgress.done();
    if (oldVal === 0) return NProgress.start();
    NProgress.set(1.8 / Math.max(oldVal, newVal));
  }
);
