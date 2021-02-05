<template>
  <div id="wrap_login">
    <!-- <p class="subtitle error-msg">{{ errorMsg }}</p> -->
    <div id="login_container">
      <h1>KT Container Platform</h1>
      <div class="login_box">
        <h2>컨테이너 포탈 로그인</h2>
        <form @submit.prevent="handleSubmit">
          <div class="login_form">
            <input type="text" v-model="login.username" placeholder="아이디" />
            <input
              type="password"
              v-model="login.password"
              placeholder="••••••••"
            />
            <button type="submit" class="btn_login">로그인</button>
          </div>
          <h2>KT 그룹사 임직원 로그인</h2>
          <div class="login_form">
            <button class="btn_login_kate">KATE에서 로그인</button>
            <p class="meta">
              KATE에서 로그인시 자동으로 화면이 전환됩니다.<br />(Internet
              Explorer만 가능)
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
//import eventBus from '@/shared/utils/event-bus.js';

export default {
  name: 'Login',
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
      //errorMsg
    };
  },
  methods: {
    ...mapActions('auth', ['signin']),
    handleSubmit() {
      this.signin(this.login);
    }
    // register() {
    //   this.$store
    //     .dispatch('register', { email: this.email, password: this.password })
    //     .then(() => this.$router.push('/'));
    // }
  }

  //   mounted() {
  //     eventBus.on('failedRegistering', msg => {
  //       this.errorMsg = msg;
  //     });
  //     eventBus.on('failedAuthentication', msg => {
  //       this.errorMsg = msg;
  //     });
  //   },
  //   // beforeDestroy
  //   beforeUnmount() {
  //     eventBus.off('failedRegistering');
  //     eventBus.off('failedAuthentication');
  //   }
};
</script>
