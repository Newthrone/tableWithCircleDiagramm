<template>
  <div id="app">
    <template v-if="users.length">
      <Table :users="users"/>
      <PieChart/>
    </template>
  </div>
</template>

<script>
  import Table from './components/Table'
  import PieChart from './components/PieChart'

  export default {
    name: 'App',
    components: {
      Table,
      PieChart
    },
    data() {
      return {
        url: 'http://vuetask.kih.ru/api.php',
      }
    },
    computed: {
      users() {
        let users = this.$store.getters.GET_USERS
        return users.sort((userA, userB) => {
          return userA.firstName < userB.firstName ? -1 : 1
        })
      }
    },
    beforeMount() {
      this.$store.dispatch('REQUEST_USERS', this.url)
    },
  }
</script>

<style lang="scss">

</style>
