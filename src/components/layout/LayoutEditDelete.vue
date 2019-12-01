<template>
  <div class="w-100 d-flex justify-content-center">
    <button  type="button" align="center" class="btn btn-light" @click="showModal  = true" > Detalhes </button>

    <div  class="modal fade " :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <div v class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLiveLabel">Detalhes da Cirurgia</h5>
            <button type="button" class="close"  @click="closeModal()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <h5 class="col text-center"> <b>Paciente:</b> {{procedimento.nomePaciente}} </h5>
            <div class="row text-left">
              <p class="col"><b>Telefone:</b> {{procedimento.telefonePaciente}} </p>
              <p class="col-7"><b>Convênio:</b> {{procedimento.convenio}} </p>
            </div>

            <div  class="row text-left">
              <p class="col-5"><b>Data:</b> {{procedimento.data}} </p>
              <p class="col"><b>Horário:</b> {{procedimento.hora}} </p>
              <p class="col "><b>Sala:</b> {{procedimento.sala}} </p>
            </div>

            <hr>

            <div class="text-center ">
              <p><b>Médico:</b> {{procedimento.medico}} </p>
              <p><b>1° auxiliar:</b> {{procedimento.auxiliar}} </p>
              <p><b>2° auxiliar:</b> {{procedimento.auxiliar2}} </p>
              <p><b>Anestesista:</b> {{procedimento.anestesista}} </p>
              <p><b>Pediatra:</b> {{procedimento.pediatra}} </p>
              <p><b>Procedimento:</b> {{procedimento.nomeProcedimento}} </p>
              <b>Descrição do procedimento:</b>
              <p class="col"> {{procedimento.descricao}}</p>
            </div>
          </div>
          <div class="modal-footer ">
            <layout-edit :id ="this.id" @click="closeModal()"/>
            <button type="button" class="btn btn-danger " @click.stop="deleteboard(key)" > Excluir </button>
          </div>
        </div>
      </div>
    </div>
     <div
      :class="{show: showModal}"
      class="modal-backdrop fade"
      :style="{display: showModal ? 'block' : 'none'}"
    />
  </div>
</template>

<script>
import LayoutEdit from './LayoutEdit'
import router from '../../router'

export default {
  name: 'LayoutEditDelete',

  data: () => ({
    showModal: false,
    key: '',
    procedimento: {}
  }),
  props: ['id'],
  components: {
    LayoutEdit
  },
  created () {
    const ref = this.$firebase.firestore().collection('procedimentos').doc(this.id);

    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.procedimento = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
     deleteboard (id) {
      this.$firebase.firestore().collection('procedimentos').doc(this.key).delete().then(() => {
        this.closeModal()
        this.$router.push('/home')
      }).catch((error) => {
        alert("Error removing document: ", error);
      });


    }
  },


}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";
.modal {
  overflow: auto;

  color: $secundary;
}
p   {
  margin-bottom: 5px;
}
b {
  color: #808080;
}
.modal-footer {
   text-align: right;
}
layout-edit {
  text-align: right;
}
.container {
  max-width: 100%;
}

.btn-light {
  font-weight: bold;color: #405918;
}
</style>


