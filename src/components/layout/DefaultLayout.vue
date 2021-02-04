<template>
  <Header />
  <div id="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './Header.vue';
export default {
  name: 'DefaultLayout',
  components: {
    Header
  }
};
</script>
