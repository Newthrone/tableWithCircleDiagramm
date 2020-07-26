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
              class="userRow"
              :key="index">
            <td>{{index + 1}}</td>
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.age}}</td>
            <td>{{user.email}}</td>
            <td class="userRowBtn"><button @click="updateUser(user)">Изменить</button></td>
            <td class="userRowBtn"><button @click="removeUser(user)">Удалить</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btnAddUser" @click="addUser(user)">Добавить пользователя</button>
    <user-form v-if="isShowForm"
               @closed:form="isShowForm = false"
               :user="user"
               :isNewUser="isNewUser">
               {{btnText}}
    </user-form>
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
  },
  data() {
    return {
      user: {
        id: this.nextId,
        firstName: '',
        lastName: '',
        age: null,
        email: ''
      },
      isShowForm: false,
      isNewUser: false,
      btnText: 'добавить пользователя'
    }
  },
  computed: {
    nextId() {
      return this.users.length + 1
    }
  },
  methods: {
    addUser() {
      if (this.user.id !== this.nextId) this.resetThisUser()
      this.isNewUser = true
      this.btnText = `Добавить пользователя`
      this.isShowForm = true
    },
    resetThisUser() {
      this.user = {
        id: this.nextId,
        firstName: '',
        lastName: '',
        age: null,
        email: ''
      }
    },
     updateUser(user) {
      this.user = user
      this.isNewUser = false
      this.btnText = `Изменить данные пользователя`
      this.isShowForm = true
    },
    removeUser(user) {
      this.$store.commit('REMOVE_USER', user)
    }
  },
}
</script>

<style lang="scss" scoped>
  .holderUsersTable {
    height: 600px;
    overflow: auto;

  }

  .usersTable {
    width: 720px;
    margin: 0 auto;
    background: linear-gradient(135deg, #fff, teal);
  }

  th, .userRow {
    height: 2rem;
  }

  .userRow {

    &:hover {
      @extend %userHower;
    }

  }

  .userRowBtn {
    opacity: 0;
    transition: opacity .3s;

    %userHower & {
      opacity: 1;
    }

  }

  .btnAddUser {
    display: block;
    margin: 2rem auto;
  }
</style>
