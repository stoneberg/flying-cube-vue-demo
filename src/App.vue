<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
const default_layout = 'Default';
export default {
  computed: {
    layout() {
      console.log('Layout===>', this.$route.meta.layout);
      console.log('Layout===>', default_layout);
      return (this.$route.meta.layout || default_layout) + 'Layout';
    }
  }
};
</script>
