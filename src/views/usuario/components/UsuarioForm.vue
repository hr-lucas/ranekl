<template>
  <form>
    <div class="usuario" v-if="mostraDadosLogin">
      <label for="nome">Nome</label>
      <input type="text" id="nome" name="nome" v-model="nome" />
      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="email" />
      <label for="senha">Senha</label>
      <input type="password" id="senha" name="senha" v-model="senha" />
    </div>
    <label for="cep">Cep</label>
    <input
      type="text"
      id="cep"
      @keyup="preencherCep"
      name="cep"
      v-model="cep"
    />
    <label for="rua">Rua</label>
    <input disabled type="text" id="rua" name="rua" v-model="rua" />
    <label for="numero">Numero</label>
    <input type="text" id="numero" name="numero" v-model="numero" />
    <label for="bairro">Bairro</label>
    <input disabled type="text" id="bairro" name="bairro" v-model="bairro" />
    <label for="cidade">Cidade</label>
    <input disabled type="text" id="cidade" name="cidade" v-model="cidade" />
    <label for="estadi">Estado</label>
    <input disabled type="text" id="estado" name="estado" v-model="estado" />
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/core/helpers/mapFields.js";
import { getCep } from "../../login/services/cepService.js";
import { mapState } from "vuex";

export default {
  name: "UsuarioForm",
  computed: {
    ...mapState("Login", ["login"]),
    ...mapFields({
      fields: [
        "nome",
        "email",
        "senha",
        "rua",
        "cep",
        "numero",
        "bairro",
        "cidade",
        "estado",
      ],
      module: "Login",
      base: "usuario",
      mutation: "Login/UPDATE_USUARIO",
    }),
    mostraDadosLogin() {
      return !this.login || this.$route.name === "usuario-editar";
    },
  },
  methods: {
    preencherCep() {
      const cep = this.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then((response) => {
          console.log(response);
          this.rua = response.data.logradouro;
          this.cidade = response.data.localidade;
          this.bairro = response.data.bairro;
          this.estado = response.data.uf;
        });
      }
    },
  },
};
</script>

<style scoped>
form,
.usuario {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}
.usuario {
  grid-column: 1 / 3;
}
.button {
  grid-column: 2;
}
</style>
