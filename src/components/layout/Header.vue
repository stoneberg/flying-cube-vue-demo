<template>
  <div id="header">
    <h1><a href="#">KT Container Platform</a></h1>
    <div id="top">
      <!--s:location-->
      <div class="location_box">
        <ul class="location_list">
          <li class="home"><a href="#">main page</a></li>
          <li class="depth1">Menu1</li>
          <li class="depth1">Menu2</li>
          <li class="depth1">Menu3</li>
          <li class="depth1">Menu4</li>
          <li class="depth1">Menu5</li>
        </ul>
      </div>
      <!--e:location-->
      <p class="logout" @click="logout"><a href="#">로그아웃</a></p>
      <p class="personal">{{ getUser.username }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Header',
  methods: {
    ...mapActions('auth', ['signout']),
    logout() {
      console.log('logout===============>');
      this.signout();
    }
  },
  computed: {
    ...mapGetters('auth', ['getUser'])
  }
};
</script>
