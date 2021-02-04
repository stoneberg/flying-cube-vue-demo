<template>
  <div id="contents">
    <h2>Application 관리</h2>
    <div class="sub_title">
      <h3>Deployment</h3>
      <div class="search_box">
        <input
          type="text"
          @keyup.enter="search()"
          v-model="searchName"
          placeholder="Deployment명"
        /><a href="#" class="btn_search" @click.prevent="search()">검색</a>
      </div>
      <div class="fr">
        <a href="#" @click.prevent="openCreateModal()" class="btn_create"
          >생성</a
        >
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
                  ><a
                    href="#"
                    @click.prevent="openUpdateModal(deployment.id)"
                    >{{ deployment.deploymentName }}</a
                  >
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
        <Pagination
          :totalElements="deploymentPagination.totalElements"
          :number="deploymentPagination.number"
          :size="deploymentPagination.size"
          @pageMove="pageMove"
        />
        <!--e:paging-->
      </div>
    </div>
    <!--e:page scroll-->
  </div>
  <!-- modal aream -->
  <teleport to="#modal-root">
    <Modal ref="deployModal">
      <template v-slot:header>
        <h4 class="modal-title">{{ modalTitle }}</h4>
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
                    ref="deploymentName"
                    type="text"
                    v-model.trim="deploymentName"
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
        <button
          v-if="mode === 'save'"
          class="btn_pop put"
          @click="save()"
          type="button"
        >
          생성
        </button>
        <button v-else class="btn_pop put" @click="update()" type="button">
          수정
        </button>
        <button
          @click="remove()"
          v-if="mode === 'update'"
          class="btn_pop put"
          style="background-color: red;"
          type="button"
        >
          삭제
        </button>
      </template>
    </Modal>
  </teleport>
  <!-- e:modal aream -->
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import Modal from '@/components/Modal.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Deployment',
  components: {
    Pagination,
    Modal
  },
  data() {
    return {
      mode: 'save',
      modalTitle: '',
      id: '',
      deploymentName: '',
      namespace: '',
      replicas: 1,
      triggerStg: '',
      updateStg: '',
      searchName: '',
      page: 0,
      size: 10
    };
  },
  methods: {
    ...mapActions('application', [
      'getDeployments',
      'createDeployment',
      'updateDeployment',
      'deleteDeployment'
    ]),
    pageMove(pageNo) {
      console.log('pageMove=============================>', pageNo);
      this.page = pageNo - 1; // jpa default: 0
      this.getDeployments({
        deploymentName: this.searchName,
        page: this.page,
        size: 10
      });
    },
    search() {
      //   if (!this.searchName) {
      //     alert('deployment name is empty!');
      //     return;
      //   }
      this.getDeployments({
        deploymentName: this.searchName,
        page: 0,
        size: 10
      });
    },
    openCreateModal() {
      console.log('opening modal......');
      this.mode = 'save';
      this.modalTitle = 'Deployment 생성';
      this.resetForm();
      this.$refs.deployModal.openModal();
      this.$nextTick(function() {
        this.$refs.deploymentName.focus();
      });
    },
    closeModal() {
      console.log('closing modal......');
      this.$refs.deployModal.closeModal();
    },
    validateForm(formData) {
      if (!formData.deploymentName) {
        alert('deploymentName is empty!');
        return false;
      } else if (!formData.namespace) {
        alert('namespace is empty!');
        return false;
      } else if (!formData.replicas) {
        alert('namespace is empty!');
        return false;
      } else if (!formData.triggerStg) {
        alert('triggerStg is empty!');
        return false;
      } else if (!formData.updateStg) {
        alert('updateStg is empty!');
        return false;
      }
      return true;
    },
    save() {
      console.log('saving modal......');
      const formData = {
        deploymentName: this.deploymentName,
        namespace: this.namespace,
        replicas: this.replicas,
        triggerStg: this.triggerStg,
        updateStg: this.updateStg
      };
      console.log('create.formData====>', formData);
      if (!this.validateForm(formData)) {
        return;
      }
      this.createDeployment(formData);
      this.$refs.deployModal.closeModal();
    },
    openUpdateModal(id) {
      this.mode = 'update';
      console.log('deploymentId===>', id);
      // get data from state
      const deployment = this.getDeployment(id);
      console.log('@deployment===>', deployment);
      // set data
      this.id = id;
      this.deploymentName = deployment.deploymentName;
      this.namespace = deployment.namespace;
      this.replicas = deployment.replicas;
      this.triggerStg = deployment.triggerStg;
      this.updateStg = deployment.updateStg;
      this.modalTitle = 'Deployment 수정';
      this.$refs.deployModal.openModal();
      this.$nextTick(function() {
        this.$refs.deploymentName.focus();
      });
    },
    update() {
      // set update data
      const formData = {
        id: this.id,
        deploymentName: this.deploymentName,
        namespace: this.namespace,
        replicas: this.replicas,
        triggerStg: this.triggerStg,
        updateStg: this.updateStg
      };
      console.log('update.formData====>', formData);
      if (!this.validateForm(formData)) {
        return;
      }
      this.updateDeployment(formData);
      this.$refs.deployModal.closeModal();
    },
    remove() {
      if (window.confirm('Do you really want to delete?')) {
        this.deleteDeployment(this.id);
        this.$refs.deployModal.closeModal();
      }
    },
    resetForm() {
      this.deploymentName = '';
      this.namespace = '';
      this.replicas = 1;
      this.triggerStg = '';
      this.updateStg = '';
    }
  },
  created() {
    this.getDeployments({
      page: 0,
      size: 10
    });
  },
  computed: {
    ...mapState('application', ['deployments', 'deploymentPagination']),
    ...mapGetters('application', ['getDeployment'])
  }
};
</script>
