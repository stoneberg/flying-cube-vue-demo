<template>
  <div
    class="modal"
    ref="commonModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h4 class="modal-title">Deployment 생성</h4> -->
          <slot name="header" />
          <button
            type="button"
            class="pop_close"
            data-dismiss="modal"
            aria-label="Close"
          >
            닫기
          </button>
        </div>
        <!--s:modal-body-->
        <div class="modal-body">
          <!-- <table class="type_03">
            <caption>
              기본정보
            </caption>
            <colgroup>
              <col width="24%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th class="point">Deployment</th>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <th class="point">Namesapce</th>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <th class="point">Replicas</th>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <th class="point">Trigger Stg.</th>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <th class="point">Update Stg.</th>
                <td><input type="text" /></td>
              </tr>
            </tbody>
          </table> -->
          <slot name="body" />
        </div>
        <!--e:modal-body-->
        <!--s:modal-footer-->
        <div class="modal-footer">
          <slot name="footer" />
          <!-- <button class="btn_pop" type="button" data-bs-dismiss="modal">
            취소
          </button>
          <button class="btn_pop put" type="button">생성</button> -->
        </div>
        <!--e:modal-footer-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      show: false
    };
  },
  methods: {
    closeModal() {
      $(this.$refs.commonModal).modal('hide');
    },
    openModal() {
      $(this.$refs.commonModal).modal('show');
    }
  }
};
</script>
<style scoped>
.modal-backdrop.show {
  opacity: 0.8;
}
</style>
