<template>
  <div></div>
</template>

<script>
export default {
  name: 'Callback',
  created() {
    const code = this.$route.query.code;
    console.log('code=========>', code);
    console.log('Parent created');

    // 코드나 토큰 유효성 검사
    if (!code) {
      this.$router.push('/login'); //after valid login the #token comes back as a hash value no token means user didnt just login
    } else {
      try {
        // accessToken으로 사용자 정보를 요청한다.
        // 토큰과 사용자 정보의 유효성을 ajax로 점검한다음 유효하면
        // 메인 페이지로 이동시키고, 아니면 로그인 페이지로 다시 보낸다.
        // 물론 토큰은 로컬 스토리지나 쿠키에 저장해야 한다.
        this.$router.push('/main');
      } catch (e) {
        this.$router.push('/login');
      }
    }
  }
};
</script>
