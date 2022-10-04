<template>
  <section>
    <h2>Adiconar Produtos</h2>
    <ProdutoAdicionar />
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button class="deletar" @click="deletarProduto(produto.id)">
            Deletar
          </button>
        </ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutoAdicionar from "./components/ProdutoAdicionar.vue";
import ProdutoItem from "../../components/ListaProdutos.vue";
import { mapActions, mapState } from "vuex";
import { api } from "@/core/services/services.js";
export default {
  name: "UsuarioProdutos",
  components: {
    ProdutoAdicionar,
    ProdutoItem,
  },
  computed: {
    ...mapState("Login", ["usuario", "login"]),
    ...mapState("Usuario", ["usuario_produtos"]),
  },
  methods: {
    ...mapActions("Usuario", ["getUsuarioProdutos"]),
    deletarProduto(id) {
      const confirmar = window.confirm("Deseja remover este produto?");
      if (confirmar) {
        api
          .delete(`/produto/${id}`)
          .then(() => {
            this.getUsuarioProdutos();
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
  },
  watch: {
    login() {
      this.getUsuarioProdutos();
    },
  },
  created() {
    if (this.login) {
      this.getUsuarioProdutos();
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
.list-enter,
.list-levea-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../../../assets/SVG/remove.svg") no-repeat center center;
  width: 24px;
  cursor: pointer;
  height: 24px;
  text-indent: -140px;
  border: none;
  overflow: hidden;
}
</style>
