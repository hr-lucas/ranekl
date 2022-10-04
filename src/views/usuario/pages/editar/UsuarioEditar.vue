<template>
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">
        Atualizar Usuario
      </button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "../../components/UsuarioForm.vue";
import { api } from "@/core/services/services.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm,
  },
  computed: {
    ...mapState("Login", ["usuario"]),
  },
  methods: {
    ...mapActions("Login", ["getUsuario"]),
    atualizarUsuario() {
      console.log("Store", this.$store.state);
      api
        .put(`/usuario/${this.usuario.id}`, this.usuario)
        .then(() => {
          this.getUsuario();
          this.$router.push({ name: "usuario" });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>

<style></style>
