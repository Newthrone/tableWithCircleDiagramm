<template>
  <div id="app">
    <Table :users="users"/>
  </div>
</template>

<script>
  import Table from './components/Table'

  export default {
    name: 'App',
    components: {
      Table
    },
    data: () => ({
      url: 'http://vuetask.kih.ru/api.php',
    }),
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
