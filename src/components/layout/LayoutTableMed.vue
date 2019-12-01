<template>
  <div class="container">
    <h2 class="text-center">Médicos</h2>
    <table class="table table-striped  table-hover">
      <thead class="thead-light">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">CRM</th>
          <th scope="col">Exclusão</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="medico of medicos" :key="medico['.key']">
          <td>{{medico.nome}}</td>
          <td>{{medico.crm}}</td>
          <td> <button type="button" class="btn btn-danger" :id="medico.key" @click.stop="deleteboard(medico.key)" > Excluir </button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import router from '../../router'

export default {
  name: 'LayouttableProc',
  data() {
    return {
    medicos: [],
    key: '',
    ref: this.$firebase.firestore().collection("medicos"),
    refShow: this.$firebase.firestore().collection("medicos").orderBy('nome'),

    }
  },
   components: {

  },
  created() {
   this.refShow.onSnapshot((querySnapshot) => {
      this.medicos = [];
      querySnapshot.forEach((doc) => {
          this.medicos.push({
          key: doc.id,
          nome: doc.data().nome,
          crm: doc.data().crm,
        });
      });
    });

  },

  methods: {
    deleteboard (id) {
      this.ref.doc(id).delete().then(() => {
      }).catch((error) => {
        alert("Error removing document: ", error);
      });
    }
  }


}
</script>


<style lang="scss" scoped>

.table {
  color: white;
  margin-top: 32px;
  font-size: 12px;
}

.container {
  width: 49%;
  float: left;
}


h2 {
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
}

td button {
  text-align:center !important;
}


</style>


