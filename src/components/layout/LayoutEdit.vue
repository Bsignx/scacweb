<template>
  <div class=" d-flex justify-content-center">
    <button  type="button" align="center" class="btn btn-success" @click="showModal = true"> Editar </button>

     <form @submit.prevent="submit()">
      <div
        class="modal fade "
        :class="{show: showModal}"
        :style="{display: showModal ? 'block' : 'none'}"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" >Editar dados do procedimento cirúrgico</h5>
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
                  <label for="">Nome do paciente: *</label >
                  <input type="text" class="form-control" v-model="procedimento.nomePaciente" required>
                </div>
               <div class="form-group col-4">
                   <label class="" for="">Convênio *</label>
                  <select class="custom-select form-control"  v-model="procedimento.convenio" id="" required>
                    <option v-for="convenio in convenios" :key="convenio['.key']">{{convenio.nome}}</option>
                  </select>
                </div>
                <div class="form-group col-4">
                  <label for="">Telefone:</label>
                  <input type="text" class="form-control phone-ddd-mask" id="telefone" v-model="procedimento.telefonePaciente" >
                </div>
                <div class="form-group col-4">
                  <label for="">Data: *</label>
                  <input type="date" class="form-control" v-model="procedimento.data" required>
                </div>
                <div class="form-group col-4">
                  <label for="">Hora: *</label>
                  <input type="time" class="form-control" v-model="procedimento.hora" required>
                </div>
                <div class="form-group col-8">
                  <label for="">Profissional executante: *</label>
                  <select class="custom-select form-control" id="" v-model="procedimento.medico" required>
                    <option v-for="medico in medicos" :key="medico['.key']">{{medico.nome}}</option>
                  </select>
                </div>
                <div class="form-group col-4">
                  <label for="">Sala: *</label>
                  <select class="custom-select form-control" id="" v-model="procedimento.sala" required>
                    <option selected>Selecione</option>
                    <option value="Sala 01">Sala 01</option>
                    <option value="Sala 02">Sala 02</option>
                  </select>
                </div>
                <div class="form-group col-6">
                <label for="">Auxiliar 1</label>
                <select class="custom-select form-control" v-model="procedimento.auxiliar" id="">
                  <option v-for="medico in medicos" :key="medico['.key']">{{medico.nome}}</option>
                </select>
              </div>
              <div class="form-group col-6">
                <label for="">Auxiliar 2</label>
                <select class="custom-select form-control" v-model="procedimento.auxiliar2" id="">
                  <option v-for="medico in medicos" :key="medico['.key']">{{medico.nome}}</option>
                </select>
              </div>
              <div class="form-group col-6">
                <label for="">Anestesista</label>
                <select class="custom-select form-control" v-model="procedimento.anestesista" id="">
                  <option v-for="medico in medicos" :key="medico['.key']">{{medico.nome}}</option>
                </select>
              </div>
              <div class="form-group col-6">
                <label for="">Pediatra</label>
                <select class="custom-select form control" v-model="procedimento.pediatra" id="">
                  <option v-for="medico in medicos" :key="medico['.key']">{{medico.nome}}</option>
                </select>
              </div>
                <div class="form-group col-8">
                  <label for="">Nome do procedimento: *</label >
                  <input type="text" class="form-control" v-model="procedimento.nomeProcedimento" required>
                </div>
                <div class="form-group col-12">
                  <label for="">Descrição do procedimento: *</label>
                  <textarea class="form-control" id="1" rows="6" v-model="procedimento.descricao" required></textarea>
                </div>

              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                @click="closeModal()"
              >
                Cancelar
              </button>
              <button class="btn btn-success" >
                  Salvar Alterações
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
import router from '../../router'

export default {
  name: 'LayoutEdit',

  data: () => ({
    showModal: false,
    key: '',
    procedimento: {},
    convenios: {},
    medicos: {}
  }),
  props: ['id'],
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

    this.$firebase.firestore().collection('convenios').onSnapshot((querySnapshot) => {
      this.convenios = [];
      querySnapshot.forEach((doc) => {
          this.convenios.push({
          key: doc.id,
          nome: doc.data().nome,
        });
      });
    });

    this.$firebase.firestore().collection('medicos').onSnapshot((querySnapshot) => {
      this.medicos = [];
      querySnapshot.forEach((doc) => {
          this.medicos.push({
          key: doc.id,
          nome: doc.data().nome,
        });
      });
    });
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
    submit(){
      const refUp = this.$firebase.firestore().collection('procedimentos').doc(this.id);
      refUp.set(this.procedimento).then((docRef) => {
        this.procedimento.nomePaciente = ''
        this.procedimento.convenio = ''
        this.procedimento.telefonePaciente = ''
        this.procedimento.data = ''
        this.procedimento.hora = ''
        this.procedimento.medico = ''
        this.procedimento.sala = ''
        this.procedimento.auxiliar = ''
        this.procedimento.auxiliar2 = ''
        this.procedimento.anestesista = ''
        this.procedimento.pediatra = ''
        this.procedimento.nomeProcedimento = ''
        this.procedimento.descricao = ''

      })
      this.closeModal()
      this.$router.push('/home')

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
p   {
  margin-bottom: 5px;
}
b {
  color: #808080;
}

.container {
  max-width: 100%;
}

.btn-light {
  font-weight: bold;color: #405918;
}
</style>


