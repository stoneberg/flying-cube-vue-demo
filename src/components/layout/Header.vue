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
import tokenService from '@/services/token/token.service';
import storeUtil from '@/shared/utils/localstore-util';

const END_POINT = `${process.env.VUE_APP_FC2_API}/ws`;
const TOPIC = '/change/role';

export default {
  name: 'Header',
  data() {
    return {
      stompClient: null,
      socket: null,
      connected: false
    };
  },
  methods: {
    ...mapActions('auth', ['signout', 'getUser']),
    logout() {
      this.signout();
    },
    connect() {
      this.socket = new SockJS(END_POINT);
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          console.log(frame);
          this.stompClient.subscribe(TOPIC, payload => {
            const target = JSON.parse(payload.body);
            // broadcast 이므로 특정 조건에 맞는 사용자일 경우에만 jwt reissue 로직을 타게 설정
            const username = storeUtil.getItem(storeUtil.USERNAME);
            if (target.username === username) {
              console.log('name is==>', target.username);
              console.log('call to refresh jwt========>');
              const refreshToken = storeUtil.getItem(
                storeUtil.REFRESH_TOKEN_KEY
              );
              console.log('refreshToken========>', refreshToken);
              const response = tokenService.getNewToken({ refreshToken });
              if (response.data) {
                response.reloadTokens(response.data);
              }
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
    console.log('created=============================================');
  },
  mounted() {
    this.connect();
  },
  beforeUnmount() {
    console.log('beforeUnmount=======================================');
    const accessToken = storeUtil.getItem(storeUtil.ACCESS_TOKEN_KEY);
    console.log('>>accessToken==============', accessToken);
    // if (!accessToken) {
    //   this.disconnect();
    // }
  }
};
</script>
