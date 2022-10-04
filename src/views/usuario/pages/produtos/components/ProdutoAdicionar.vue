<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input type="text" id="nome" name="nome" v-model="produto.nome" />
    <label for="preco">Preço</label>
    <input type="number" id="preco" name="preco" v-model="produto.preco" />
    <label for="fotos">Fotos</label>
    <input type="file" id="fotos" name="fotos" ref="fotos" />
    <label for="fotos">Descrição</label>
    <textarea
      name="descricao"
      id="descricao"
      v-model="produto.descricao"
    ></textarea>
    <input
      type="button"
      class="btn"
      value="Adicionar Produto"
      @click.prevent="adiconarProduto()"
    />
  </form>
</template>

<script>
import { api } from "@/core/services/services.js";
import { mapActions, mapState } from "vuex";
export default {
  name: "ProdutoAdiconar",
  data() {
    return {
      produto: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: null,
        usuario_id: "",
      },
    };
  },
  computed: {
    ...mapState("Login", ["usuario"]),
  },
  methods: {
    ...mapActions("Usuario", ["getUsuarioProdutos"]),
    formatarProduto() {
      this.produto.usuario_id = this.usuario.id;
    },
    adiconarProduto() {
      this.formatarProduto();
      console.log("Produtos", this.produto);
      api.post("/produto", this.produto).then(() => {
        this.getUsuarioProdutos();
      });
    },
  },
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
