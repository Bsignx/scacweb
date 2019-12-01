<template>
  <div class="container">
    <h2 class="text-center">Convênios</h2>
    <table class="table table-striped  table-hover">
      <thead class="thead-light">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Exclusão</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="convenio of convenios" :key="convenio['.key']">
          <td>{{convenio.nome}}</td>
          <td> <button type="button" class="btn btn-danger" :id="convenio.key" @click.stop="deleteboard(convenio.key)" > Excluir </button></td>
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
    convenios: [],
    key: '',
    ref: this.$firebase.firestore().collection("convenios"),
    refShow: this.$firebase.firestore().collection("convenios").orderBy('nome')
    }
  },
   components: {

  },
  created() {
   this.refShow.onSnapshot((querySnapshot) => {
      this.convenios = [];
      querySnapshot.forEach((doc) => {
          this.convenios.push({
          key: doc.id,
          nome: doc.data().nome,
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


