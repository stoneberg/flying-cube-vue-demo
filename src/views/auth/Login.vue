<template>
  <div id="wrap_login">
    <div id="login_container">
      <h1>KT Container Platform</h1>
      <div class="login_box">
        <h2>컨테이너 포탈 로그인</h2>
        <div class="login_form">
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="••••••••" />
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {};
  }
};
</script>
