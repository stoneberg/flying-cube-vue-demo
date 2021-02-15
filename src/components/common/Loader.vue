<template>
  <div class="loading" v-if="isLoading">
    <div id="indicator">
      <span class="radius"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    isLoading: Boolean
  }
};
</script>
