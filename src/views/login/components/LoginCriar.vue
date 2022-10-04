<template>
  <section>
    <h2>Crie a sua Conta</h2>
    <transition>
      <button v-if="!criar" @click="criar = true" class="btn">
        Criar uma conta
      </button>
      <UsuarioForm v-else>
        <button class="btn" @click.prevent="criarUsuario">Criar usuario</button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "../../usuario/components/UsuarioForm.vue";
export default {
  components: { UsuarioForm },
  name: "LoginCriar",
  data() {
    return {
      criar: false,
    };
  },
  methods: {
    async criarUsuario() {
      try {
        await this.$store.dispatch(
          "Login/criarUsuario",
          this.$store.state.Login.usuario
        );
        await this.$store.dispatch(
          "Login/getUsuario",
          this.$store.state.Login.usuario.email
        );
        this.$router.push({ name: "usuario" });
      } catch (error) {
        alert("Error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  margin: 40px 0 10px 0;
}
.btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}
</style>
