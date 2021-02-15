<template>
  <div id="app">
    <teleport to="#loader-root">
      <Loader :isLoading="isLoading" />
    </teleport>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Loader from '@/components/common/Loader.vue';
const default_layout = 'Default';
import { mapState } from 'vuex';
export default {
  components: {
    Loader
  },
  computed: {
    ...mapState(['isLoading']),
    layout() {
      console.log('Layout===>', this.$route.meta.layout);
      console.log('Layout===>', default_layout);
      const currentLayout =
        (this.$route.meta.layout || default_layout) + 'Layout';
      console.log('Current Layout===>', currentLayout);
      return currentLayout;
    }
  }
};
</script>
<style>
/* Absolute Center Spinner */
.loading {
  position: fixed;
  z-index: 999;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 50px;
  height: 50px;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  opacity: 0.2;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}

.loading:not(:required):after {
  content: '';
  opacity: 0.2;
  display: block;
  font-size: 10px;
  width: 50px;
  height: 50px;
  margin-top: -0.5em;
}

#indicator {
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -28px 0 0 -30px;
}

#indicator span {
  display: block;
  background: url('assets/indicator.gif') 0 center no-repeat;
  width: 80px;
  height: 80px;
}

#indicator span.radius {
  border: 0px solid #ccc;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
}
</style>
