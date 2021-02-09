<template>
  <div id="app">
    <div class="loading" v-if="isLoading">
      <div id="indicator">
        <span class="radius"></span>
      </div>
    </div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
const default_layout = 'Default';
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['isLoading', 'refCount']),
    layout() {
      console.log('Layout===>', this.$route.meta.layout);
      console.log('Layout===>', default_layout);
      return (this.$route.meta.layout || default_layout) + 'Layout';
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
  border: 1px solid #ccc;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
}
</style>
