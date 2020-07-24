<template>
  <div>
    <div class="holderUsersTable">
      <table v-if="users.length" class="usersTable">
      <thead>
        <th>#</th>
        <th>Name</th>
        <th>LastName</th>
        <th>age</th>
        <th>email</th>
      </thead>
      <tbody>
        <tr v-for="(user, index) of users"
            :key="user.id">
          <td>{{index + 1}}</td>
          <td>{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
          <td>{{user.age}}</td>
          <td>{{user.email}}</td>
        </tr>
      </tbody>
    </table>
    </div>
    <user-form />
  </div>
</template>

<script>
import UserForm from './UserForm'

export default {
  name: 'Table',
  components: {
    UserForm
  },
  props: {
    users: Array
  }
}
</script>

<style lang="scss">
  .holderUsersTable {
    height: 300px;
    overflow: auto;
  }

  .usersTable {
    width: 720px;
    margin: 0 auto;
  }
</style>
