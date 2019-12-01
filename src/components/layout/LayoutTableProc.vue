<template>
  <div>
    <layout-new-cirurgia/>
    <table class="table table-striped  table-hover">
      <thead class="thead-light">
        <tr>
          <th scope="col">Paciente</th>
          <th scope="col">Data</th>
          <th scope="col">Hora</th>
          <th scope="col">Medico</th>
          <th scope="col">1° Auxiliar </th>
          <th scope="col">2° Auxiliar </th>
          <th scope="col">Anestesista</th>
          <th scope="col">Pediatra</th>
          <th scope="col">Detalhes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="procedimento of procedimentos" :key="procedimento['.key']">
          <td>{{ procedimento.nomePaciente }}</td>
          <td>{{ procedimento.data }}</td>
          <td>{{ procedimento.hora }}</td>
          <td>{{ procedimento.medico }}</td>
          <td>{{ procedimento.auxiliar }}</td>
          <td>{{ procedimento.auxiliar2 }}</td>
          <td>{{ procedimento.anestesista }}</td>
          <td>{{ procedimento.pediatra}}</td>
          <td><layout-edit-delete  :id="procedimento.key"/></td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import LayoutEditDelete from './LayoutEditDelete'
import LayoutNewCirurgia from './LayoutNewCirurgia'
import router from '../../router'

export default {
  name: 'LayouttableProc',
  data() {
    return {
    procedimentos: [],
    ref: this.$firebase.firestore().collection("procedimentos").orderBy('data','desc'),
    }
  },
   components: {
    LayoutEditDelete,
    LayoutNewCirurgia
  },
  created() {
   this.ref.onSnapshot((querySnapshot) => {
      this.procedimentos = [];
      querySnapshot.forEach((doc) => {
          this.procedimentos.push({
          key: doc.id,
          data: doc.data().data,
          nomePaciente: doc.data().nomePaciente,
          hora: doc.data().hora,
          medico: doc.data().medico,
          auxiliar: doc.data().auxiliar,
          auxiliar2: doc.data().auxiliar2,
          anestesista: doc.data().anestesista,
          pediatra: doc.data().pediatra
        })
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.table {
  color: white;
  margin-top: 32px;
  font-size: 12px;
}

td button {
  text-align:center !important;
}
</style>
