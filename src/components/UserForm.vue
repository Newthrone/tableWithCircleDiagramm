<template>
  <div class="formHolder">
    <form @submit.prevent="submitted">
      <label for="name">Name *</label>
      <input type="text"
             name="name"
             id="name"
             pattern="[A-Za-zА-Яа-яЁё]+\s{1,5}[A-Za-zА-Яа-яЁё]+$"
             v-model="name"
             required
      >
      <small>Ведите имя и фамилию чере пробел (пример: "Илья Ильин")</small>

      <label for="age">Age *</label>
      <input type="number"
             name="age"
             id="age"
             max="130"
             v-model="user.age"
             required
      >
      <small>Ведите возвраст (только цифры)</small>

      <label for="email">Email *</label>
      <input type="email"
             name="email"
             id="email"
             v-model="user.email"
             required
      >
      <small>Ведите email адрес (пример: "doc@mail.ru")</small>

      <button type="submit">Добавить данные</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    user: {
      type: Object,
      default: () => ({
        id: {
          type: Number,
          default: parseInt(new Date(), 10)
        },
        firstName: {
          type: String,
          default: ''
        },
        lastName: {
          type: String,
          default: ''
        },
        age: {
          type: [Number, null],
          default: null
        },
        email: {
          type: String,
          default: ''
        }
      })
    }
  },
  data: () => ({
    name: ''
    // age: null,
    // email: ''
  }),
  computed: {
    posSpace() {
      return this.name.indexOf(' ')
    },
    firstName() {
      return this.name.slice(0, this.posSpace)
    },
    lastName() {
      return this.name.slice(this.posSpace + 1)
    }
  },
  created() {
    this.$store.commit('ADD_USER', this.user)
    // console.log(this.$store.commit('ADD_USER'));
  },
  methods: {
    submitted() {
      console.log(this.$store.commit('ADD_USER'));
      console.log(this.name);
      console.log(this.user.firstName);
      console.log(this.user.lastName);
      console.log(this.user.age);
      console.log(this.user.email);
      // {"id":1,"firstName": this.firstName,"lastName":this.lastName,"age":this.age,"email":this.email}
    }
  }
}
</script>

<style lang="scss" scoped>
  .formHolder {
    width: 720px;
    margin: 2rem auto;
  }

  form {
    display: flex;
    flex-flow: column;
    padding: 1rem 4rem;
  }

  label {
    margin: 1rem 0 5px;
  }

  input {

    &:valid {
      @extend %inputValid
    }
  }

  small {

    &:before {
      display: none;
      content: 'Заполнено';
      margin: 0 1rem 0 0;
      color: #1e9c76;
      font-weight: bold;

      %inputValid + & {
        display: inline-block;
      }
    }

    %inputValid + & {
      color: transparent;
      user-select: none;
    }

  }

  button {
    align-self: center;
    padding: 5px 1rem;
    margin: 1rem 0 0;
  }
</style>
