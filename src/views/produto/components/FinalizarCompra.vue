<template>
  <div>
    <p>Finalizar Compra</p>
    <UsaurioForm>
      <button class="btn" @click.prevent="finalizarCompra">
        Finalizar Compra
      </button>
    </UsaurioForm>
  </div>
</template>

<script>
import UsaurioForm from "../../usuario/components/UsuarioForm.vue";
import { api } from "@/core/services/services.js";
import { mapState } from "vuex";
export default {
  name: "FinalizarCompra",
  props: ["produto"],
  components: {
    UsaurioForm,
  },
  computed: {
    ...mapState("Login", ["usuario", "login"]),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado,
        },
      };
    },
  },
  methods: {
    criarTransacao() {
      return api.post("/transacao", this.compra).then(() => {
        this.$router.push({ name: "compras" });
      });
    },
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
        await this.criarTransacao();
      } catch (error) {
        alert("Error");
      }
    },
    finalizarCompra() {
      if (this.login) {
        this.criarTransacao();
      } else {
        this.criarUsuario();
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}
.btn {
  background: #e80;
}
</style>
