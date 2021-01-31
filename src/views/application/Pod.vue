<template>
  <div id="contents">
    <h2>Application 관리</h2>
    <div class="sub_title">
      <h3>Pod</h3>
      <div class="search_box">
        <input type="text" placeholder="Pod명" /><a href="#" class="btn_search"
          >검색</a
        >
      </div>
    </div>
    <!--e:page scroll-->
    <div class="page_scroll">
      <div class="section_box">
        <table class="type_01">
          <caption>
            Pod 목록
          </caption>
          <colgroup>
            <col width="*" />
            <col width="200px" />
            <col width="150px" />
            <col width="150px" />
            <col width="150px" />
          </colgroup>
          <thead>
            <tr>
              <th>Pod</th>
              <th>Status</th>
              <th>Container Ready Cnt.</th>
              <th>Restart Cnt.</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="left">
                <em class="bul_p">P</em><a href="#">jenkins</a>
              </td>
              <td>Running</td>
              <td>1</td>
              <td>1</td>
              <td>2018-12-01</td>
            </tr>
            <tr>
              <td class="left">
                <em class="bul_p">P</em><a href="#">nginx</a>
              </td>
              <td>Active</td>
              <td>1</td>
              <td>1</td>
              <td>2018-12-01</td>
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
  name: 'Pod',
  components: {
    Pagination
  }
};
</script>
