<template>
  <div>
    <h1>CADASTROS</h1>
    <br>
    <layout-new-med/>
    <br>
    <layout-new-conve/>
    <layout-table-med/>
    <layout-table-conv/>

  </div>
</template>

<script>
import LayoutNewMed from '../../components/layout/LayoutNewMed.vue'
import LayoutNewConve from '../../components/layout/LayoutNewConve.vue'
import LayoutTableMed from '../../components/layout/LayoutTableMed'
import LayoutTableConv from '../../components/layout/LayoutTableConv'
export default {
  name: 'Profissionais',
  components: {
    LayoutNewMed,
    LayoutNewConve,
    LayoutTableMed,
    LayoutTableConv


  }
}
</script>

<style lang="scss" scoped>
h1 {
   text-align: center;
   margin-top: 2rem;
}

</style>
