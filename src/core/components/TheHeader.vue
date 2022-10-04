<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <img src="@/assets/SVG/ranek.svg" alt="Ranek" />
      </router-link>
      <router-link v-if="$store.state.Login.login" to="/usuario" class="btn">
        {{ nome }}
      </router-link>
      <router-link v-else to="/login" class="btn">Vender/Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    nome() {
      return this.$store.state.Login.usuario.nome.replace(/ .*/, "");
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);

  .logo {
    padding: 10px 0;
    img {
      width: 90px;
    }
  }
}
</style>
