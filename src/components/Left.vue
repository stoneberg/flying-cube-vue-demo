<template>
  <div id="lnb">
    <ul class="lnb_link">
      <li><a href="#">Cluster 관리</a></li>
    </ul>
    <ul class="lnb_menu">
      <li class="on">
        <router-link to="/application" class="lnb_03"
          >Application 관리</router-link
        >
      </li>
      <!--s:sub menu-->
      <li class="depth2">
        <ul class="sub_menu">
          <li class="">
            <router-link to="/application/deployment">Deployment</router-link>
          </li>
          <li class="">
            <router-link to="/application/pod">Pod</router-link>
          </li>
        </ul>
      </li>
      <!--e:sub menu-->
      <li><a href="#" class="lnb_02">Resource 관리</a></li>
      <li><a href="#" class="lnb_01">Storage 관리</a></li>
      <li><a href="#" class="lnb_04">CI/CD 관리</a></li>
      <li><a href="#" class="lnb_05">배포/승인 관리</a></li>
      <li><a href="#" class="lnb_06">Repository</a></li>
      <li><a href="#" class="lnb_07">Monitoring</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Left'
};
</script>
