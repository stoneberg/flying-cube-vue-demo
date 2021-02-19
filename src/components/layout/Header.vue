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
      <p class="personal">{{ username }}</p>
    </div>
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import { mapState, mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'Header',
  data() {
    return {};
  },
  methods: {
    ...mapActions('auth', ['signout', 'getUser']),
    logout() {
      this.signout();
    },
    connect() {
      this.socket = new SockJS('http://localhost:9090/stomp');
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          console.log(frame);
          this.stompClient.subscribe('/subscribe/role', payload => {
            const target = JSON.parse(payload.body);
            // broadcast 이므로 특정 조건에 맞는 사용자일 경우에만 jwt reissue 로직을 타게 설정
            const username = localStorage.getItem('username');
            if (target.username === username) {
              console.log('name is==>', target.username);
              console.log('call to refresh jwt========>');
              const refreshToken = localStorage.getItem('refreshToken');
              axios({
                method: 'post',
                url: `${process.env.VUE_APP_FC2_API}/api/auth/refresh`,
                data: {
                  refreshToken: refreshToken
                }
              })
                .then(res => {
                  console.log('refreshed tokens===>', res.data);
                  const newAccessToken = res.data.accessToken;
                  const newRefreshToken = res.data.refreshToken;
                  localStorage.setItem('accessToken', newAccessToken); // save the newly refreshed access token for other requests to use
                  localStorage.setItem('refreshToken', newRefreshToken);
                  location.reload();
                })
                .catch(err => {
                  console.error('@@@err==>', err);
                });
            } // end if
          });
        },
        error => {
          console.log(error);
        }
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    }
  },
  computed: {
    ...mapGetters('auth', ['username'])
  },
  created() {
    console.log('=============================================');
    this.getUser();
    console.log('=============================================');
  },
  mounted() {
    this.connect();
  }
};
</script>
