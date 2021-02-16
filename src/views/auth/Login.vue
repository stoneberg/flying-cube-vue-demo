<template>
  <div id="wrap_login">
    <!-- <p class="subtitle error-msg">{{ errorMsg }}</p> -->
    <div id="login_container">
      <h1>KT Container Platform</h1>
      <div class="login_box">
        <h2>컨테이너 포탈 로그인</h2>
        <form @submit.prevent="handleSubmit">
          <div class="login_form">
            <input
              type="text"
              v-model="login.username"
              ref="inputUsername"
              placeholder="아이디"
            />
            <input
              type="password"
              ref="inputPassword"
              v-model="login.password"
              placeholder="••••••••"
            />
            <button type="submit" class="btn_login">로그인</button>
          </div>
        </form>
        <h2>KT 그룹사 통합 로그인</h2>
        <div class="login_form">
          <button class="btn_login_kate">KATE에서 로그인</button>
        </div>
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
      if (!this.login.username) {
        window.alert('사용자 아이디를 입력하세요.');
        this.$refs.inputUsername.focus();
        return;
      } else if (!this.login.password) {
        window.alert('비밀번호를 입력하세요.');
        this.$refs.inputPassword.focus();
        return;
      }
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
<style lang="css" scoped>
/*로그인*/
#wrap_login {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #eee;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
#wrap_login #login_container {
  width: 750px;
  margin-bottom: 50px;
}
#wrap_login #login_container h1 {
  width: 750px;
  height: 25px;
  background: url('../../assets/login_logo.png') 0 0 no-repeat;
  margin-bottom: 10px;
  display: block;
  text-indent: -9999px;
}
#wrap_login #login_container .login_box {
  width: 750px;
  border: 2px solid #2cb7cc;
  background: url('../../assets/login_img_ipccp.png') #fff 54px top no-repeat;
  padding: 5px 30px 30px 316px;
}
#wrap_login #login_container .login_box h2 {
  font-size: 20px;
  color: #3d3d3d;
  margin: 25px 0;
}
#wrap_login #login_container .login_box .login_form {
  position: relative;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 15px;
}
#wrap_login #login_container .login_box .login_form:last-child {
  border-bottom: none;
}
#wrap_login #login_container .login_box .login_form > input[type='text'],
#wrap_login #login_container .login_box .login_form > input[type='password'] {
  width: 254px;
  height: 37px;
  border: 1px solid #ddd;
  margin-bottom: 14px;
  font-size: 15px;
}
#wrap_login #login_container .login_box .login_form button.btn_login {
  position: absolute;
  top: 0;
  right: 0;
  width: 126px;
  height: 88px;
  border-radius: 5px;
  border: none;
  background-color: #1baec5;
  color: #fff;
  font: bold 24px 'Bon Gothic', 'Malgun Gothic', '맑은 고딕', 'Arial';
  cursor: pointer;
  transition: all 0.1s ease;
}
#wrap_login #login_container .login_box .login_form button.btn_login:hover {
  background-color: #2c3345;
}
#wrap_login #login_container .login_box .login_form button.btn_login_kate {
  width: 100%;
  height: 54px;
  background-color: #4d4d4d;
  border-radius: 5px;
  border: none;
  color: #fff;
  font: bold 22px 'Bon Gothic', 'Malgun Gothic', '맑은 고딕', 'Arial';
  cursor: pointer;
  transition: all 0.1s ease;
}
#wrap_login
  #login_container
  .login_box
  .login_form
  button.btn_login_kate:hover {
  background-color: #343536;
}
#wrap_login #login_container .login_box .login_form p.meta {
  font-size: 14px;
  color: #757575;
  margin-top: 10px;
  line-height: 1.2em;
}
</style>
