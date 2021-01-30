<template>
  <div id="contents">
    <h2>Application 관리</h2>
    <div class="sub_title">
      <h3>Deployment</h3>
      <div class="search_box">
        <input type="text" placeholder="Deployment명" /><a
          href="#"
          class="btn_search"
          >검색</a
        >
      </div>
      <div class="fr"><a href="#" class="btn_create">생성</a></div>
    </div>
    <!--e:page scroll-->
    <div class="page_scroll">
      <div class="section_box">
        <table class="type_01">
          <caption>
            PVC 목록
          </caption>
          <colgroup>
            <col width="*" />
            <col width="200px" />
            <col width="90px" />
            <col width="130px" />
            <col width="130px" />
            <col width="150px" />
          </colgroup>
          <thead>
            <tr>
              <th>Deployment명</th>
              <th>Namesapce</th>
              <th>replicas</th>
              <th>Trigger 설정</th>
              <th>업데이트 전략</th>
              <th>생성일시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="left">
                <em class="bul_d">D</em><a href="#">nginx deployment</a>
              </td>
              <td>default</td>
              <td>1</td>
              <td>Config change</td>
              <td>Recreate</td>
              <td>2018-12-01 00:00:00</td>
            </tr>
            <tr>
              <td class="left">
                <em class="bul_d">D</em><a href="#">jenkis deployment</a>
              </td>
              <td>flying cube 2.0</td>
              <td>1</td>
              <td>ImageChange</td>
              <td>Rolling</td>
              <td>2018-12-01 00:00:00</td>
            </tr>
          </tbody>
        </table>
        <!--s:paging-->
        <Pagination />
        <!--e:paging-->
      </div>
    </div>
    <!--e:page scroll-->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
export default {
  name: 'Deployment',
  components: {
    Pagination
  }
};
</script>
