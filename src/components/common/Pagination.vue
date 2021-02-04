<template>
  <div class="paging_box">
    <ul v-if="totalElements > 0" class="paging">
      <!-- <</< -->
      <li><a href="#" @click="pageMove(1)" class="ppv dis">맨앞</a></li>
      <li v-if="paginate['currentPage'] > 1">
        <a
          href="#"
          @click="pageMove(paginate['currentPage'] - 1)"
          class="pv dis"
          >앞</a
        >
      </li>
      <li v-else>
        <a href="#" @click="pageMove(1)" class="pv dis">앞</a>
      </li>
      <!-- |1|2|3|4|5|6|7|8|9|10|-->
      <template v-for="page in paginate['pages']" :key="page">
        <li
          v-if="paginate['currentPage'] === page"
          @click="pageMove(page)"
          class="on"
        >
          <a href="#">{{ page }}</a>
        </li>
        <li v-else @click="pageMove(page)">
          <a href="#">{{ page }}</a>
        </li>
      </template>
      <!-- |1|2|3|4|5|6|7|8|9|10|-->
      <!-- >/>> -->
      <li v-if="paginate['currentPage'] < paginate['totalPages']">
        <a href="#" @click="pageMove(paginate['currentPage'] + 1)" class="nv"
          >뒤</a
        >
      </li>
      <li v-else>
        <a href="#" @click="pageMove(paginate['totalPages'])" class="nv">뒤</a>
      </li>
      <li>
        <a href="#" @click="pageMove(paginate['totalPages'])" class="nnv"
          >맨뒤</a
        >
      </li>
      <!-- page link -->
    </ul>
  </div>
</template>
<script>
import paginateUtil from '@/shared/utils/paginate.js';

export default {
  name: 'Pagination',
  props: {
    totalElements: Number,
    number: Number,
    size: Number
  },

  data() {
    return {};
  },
  computed: {
    paginate() {
      return paginateUtil(this.totalElements, this.number + 1);
    }
  },
  methods: {
    pageMove(pageNo) {
      this.$emit('pageMove', pageNo);
    }
  }
};
</script>
