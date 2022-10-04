<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="senha">senha</label>
      <input type="password" name="senha" id="senha" v-model="login.senha" />
      <button class="btn" @click.prevent="logar">Logar</button>
    </form>
    <p class="perdeu">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui</a>
    </p>
    <LoginCriar />
  </section>
</template>

<script>
import LoginCriar from "./components/LoginCriar.vue";
export default {
  name: "loginView",
  components: { LoginCriar },
  data() {
    return {
      login: {
        email: "",
        senha: "",
      },
    };
  },
  methods: {
    logar() {
      this.$store.dispatch("Login/getUsuario", this.login.email);
      this.$router.push({ name: "usuario" });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
  h1 {
    text-align: center;
    margin: 25px auto;
    padding: 0 20px;
    color: #87f;
  }
  form {
    display: grid;
    .btn {
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }
  }
  .perdeu {
    text-align: center;
    margin: 20px auto 0 auto;
    a {
      &:hover {
        color: #87f !important;
        text-decoration: underline;
      }
    }
  }
}
</style>
