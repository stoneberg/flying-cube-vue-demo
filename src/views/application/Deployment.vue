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
      <div class="fr">
        <a href="#" @click="openModal()" class="btn_create">생성</a>
      </div>
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
              <th>Deployment</th>
              <th>Namesapce</th>
              <th>Replicas</th>
              <th>Trigger Stg.</th>
              <th>Update Stg.</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="deployment in deployments" :key="deployment.id">
              <tr>
                <td class="left">
                  <em class="bul_d">D</em
                  ><a href="#">{{ deployment.deploymentName }}</a>
                </td>
                <td>{{ deployment.namespace }}</td>
                <td>{{ deployment.replicas }}</td>
                <td>{{ deployment.triggerStg }}</td>
                <td>{{ deployment.updateStg }}</td>
                <td>{{ deployment.createdDt }}</td>
              </tr>
            </template>
          </tbody>
        </table>
        <!--s:paging-->
        <Pagination />
        <!--e:paging-->
      </div>
    </div>
    <!--e:page scroll-->
  </div>
  <!-- modal aream -->
  <teleport to="#modal-root">
    <Modal ref="deployModal">
      <template v-slot:header>
        <h4 class="modal-title">Deployment 생성</h4>
      </template>

      <template v-slot:body>
        <form ref="form">
          <table class="type_03">
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
                <td>
                  <input
                    ref="deployment"
                    type="text"
                    v-model.trim="deployment"
                  />
                </td>
              </tr>
              <tr>
                <th class="point">Namesapce</th>
                <td><input type="text" v-model.trim="namespace" /></td>
              </tr>
              <tr>
                <th class="point">Replicas</th>
                <td><input type="text" v-model.number="replicas" /></td>
              </tr>
              <tr>
                <th class="point">Trigger Stg.</th>
                <td><input type="text" v-model.trim="triggerStg" /></td>
              </tr>
              <tr>
                <th class="point">Update Stg.</th>
                <td><input type="text" v-model.trim="updateStg" /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </template>

      <template v-slot:footer>
        <button
          class="btn_pop"
          type="button"
          @click="closeModal()"
          data-bs-dismiss="modal"
        >
          취소
        </button>
        <button class="btn_pop put" @click="saveModal()" type="button">
          생성
        </button>
      </template>
    </Modal>
  </teleport>
  <!-- e:modal aream -->
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import Modal from '@/components/Modal.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Deployment',
  components: {
    Pagination,
    Modal
  },
  data() {
    return {
      deployment: '',
      namespace: '',
      replicas: 1,
      triggerStg: '',
      updateStg: ''
    };
  },
  methods: {
    ...mapActions('application', ['getDeployments']),

    openModal() {
      console.log('opening modal......');
      this.resetForm();
      this.$refs.deployModal.openModal();
      this.$nextTick(function() {
        this.$refs.deployment.focus();
      });
    },
    closeModal() {
      console.log('closing modal......');
      this.$refs.deployModal.closeModal();
    },
    saveModal() {
      console.log('saving modal......');
      const formData = {
        deployment: this.deployment,
        namespace: this.namespace,
        replicas: this.replicas,
        triggerStg: this.triggerStg,
        updateStg: this.updateStg
      };
      console.log('deployment.formData====>', formData);
      this.$refs.deployModal.closeModal();
    },
    resetForm() {
      this.deployment = '';
      this.namespace = '';
      this.replicas = 1;
      this.triggerStg = '';
      this.updateStg = '';
    }
  },
  created() {
    this.getDeployments();
  },
  computed: {
    ...mapState('application', ['deployments'])
  }
};
</script>
