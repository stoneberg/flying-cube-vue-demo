<template>
  <div id="container">
    <!--s:lnb-->
    <Left />
    <!--e:lnb-->
    <!--s:contents-->
    <router-view></router-view>
    <!--e:contents-->
  </div>
</template>

<script>
import Left from '@/components/layout/Left.vue';

export default {
  name: 'Application',
  components: {
    Left
  }
};
</script>
