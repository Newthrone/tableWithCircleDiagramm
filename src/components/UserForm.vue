<template>
  <div class="formHolder">
    <form @submit.prevent="submitted">
      <label for="name">Name *</label>
      <input type="text"
             name="name"
             id="name"
             pattern="[A-Za-zА-Яа-яЁё']+\s{1,5}[A-Za-zА-Яа-яЁё']+$"
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
      <div class="buttonHolder">
        <button type="submit">
          <slot></slot>
        </button>
        <button type="button" @click="close">Отмена</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    user: {
      type: Object,
      required: true
    },
    isNewUser: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      name: `${this.user.firstName} ${this.user.lastName}`.trim()
    }
  },
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
  methods: {
    submitted() {
      Object.assign(this.user, {firstName: this.firstName, lastName: this.lastName})
      if (this.isNewUser) this.$store.commit('ADD_USER', this.user)
      else this.$store.commit('UPDATE_USER', this.user)
      this.close()
    },
    close() {
      this.$emit('closed:form')
    }
  }
}
</script>

<style lang="scss" scoped>
  .formHolder {
    z-index: 5;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 100px calc(50% - 360px);
    background: #fff;
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

  .buttonHolder {
    text-align: center;
  }

  button {
    align-self: center;
    padding: 5px 1rem;
    margin: 1rem 1rem 0;
  }
</style>
