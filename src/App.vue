<template>
  <div id="app">
    <Header />
    <div id="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  components: {
    Header
  }
};
</script>
