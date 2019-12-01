<template>
  <div class="w-100 d-flex justify-content-center">
    <button
      class="btn btn-lg btn-outline-primary w-50"
      @click="showModal = true"
      >
      Cadastrar Médico
    </button>

    <form @submit.prevent="submit()">
      <div
        class="modal fade "
        :class="{show: showModal}"
        :style="{display: showModal ? 'block' : 'none'}"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" >Cadastrar Médico</h5>
              <button
                type="button"
                @click="closeModal()"
                class="close">
                <span>×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-8">
                  <label for="">Nome do Médico: *</label >
                  <input type="text" class="form-control" v-model="medico.nome" required>
                </div>

                <div class="form-group col-4">
                  <label for="">CRM:</label>
                  <input type="text" class="form-control phone-ddd-mask" id="telefone" v-model="medico.crm" >
                </div>


              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal()"
              >
                Fechar
               </button>
              <button class="btn btn-primary" :disabled="loading">
                <template v-if="loading">
                  <i class="fa fa-spin fa-spinner"></i>
                  Agendando...
                </template>
                <template v-else>
                  Cadastrar
                </template>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
      <div
      :class="{show: showModal}"
      class="modal-backdrop fade"
      :style="{display: showModal ? 'block' : 'none'}"
    />

  </div>
</template>

<script>


export default {
  data() {
    return {
      showModal: false,
      loading: false,
      ref: this.$firebase.firestore().collection('medicos'),
     medico:{}
    }
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
     submit(){
        this.loading = true
        this.ref.add(this.medico).then((docRef) => {
          this.medico.nome = ''
          this.medico.crm = ''


        })
        this.closeModal(),
        this.loading = false

     }
  }
  }
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";
.modal {
  overflow: auto;

  color: $secundary;
}
</style>


