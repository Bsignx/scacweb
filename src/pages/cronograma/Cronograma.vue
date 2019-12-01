<template>

   <div>
    <h1>CRONOGRAMA</h1>
    <layout-table-proc/>
  </div>

</template>

<script>

import LayoutTableProc from "../../components/layout/LayoutTableProc.vue"

export default {
  name: 'Cronograma',
  components: {
    LayoutTableProc

  }

}
</script>

<style lang="scss" scoped>
h1 {
   text-align: center;
   margin-top: 2rem;
}


</style>

