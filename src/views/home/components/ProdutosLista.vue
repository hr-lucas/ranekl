<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <div class="produtos" v-if="produtos && produtos.length" key="produtos">
        <div class="produto" v-for="(produto, index) in produtos" :key="index">
          <router-link :to="{ name: 'produto', params: { id: produto.id } }">
            <img
              v-if="produto.fotos"
              :src="produto.fotos[0].src"
              :alt="produto.fotos[0].titulo"
            />
            <p class="preco">{{ $filters.numeroPreco(produto.preco) }}</p>
            <h2 class="titulo">{{ produto.nome }}</h2>
            <p>{{ produto.descricao }}</p>
          </router-link>
        </div>
        <ProdutosPaginar
          :produtosTotal="produtosTotal"
          :produtosPorPagina="produtosPorPagina"
        />
      </div>
      <div v-else-if="produtos && produtos.length === 0" key="sem-resultados">
        <p class="sem-resultados">Busca sem resultados.Tente outro termo</p>
      </div>
      <div v-else class="loading" key="carregando">
        <PaginaCarregando />
      </div>
    </transition>
  </section>
</template>

<script>
import { api } from "@/core/services/services.js";
import { queryFuncition } from "@/core/helpers/serialize.js";
import ProdutosPaginar from "./ProdutosPaginar.vue";

export default {
  name: "ProdutoLista",
  components: {
    ProdutosPaginar,
  },
  data() {
    return {
      produtos: null,
      produtosPorPagina: 9,
      produtosTotal: 0,
    };
  },
  methods: {
    getProdutos() {
      this.produtos = null;
      setTimeout(() => {
        api.get(this.url).then((response) => {
          this.produtosTotal = Number(response.headers["x-total-count"]);
          this.produtos = response.data;
        });
      }, 1000);
    },
  },
  created() {
    this.getProdutos();
  },
  computed: {
    url() {
      const query = queryFuncition(this.$route.query);
      return `/produto?_limit=${this.produtosPorPagina}${query}`;
    },
  },
  watch: {
    url() {
      this.getProdutos();
    },
  },
};
</script>

<style lang="scss" scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}
.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 80, 0.1);
  padding: 10px;
  background: white;
  border-radius: 4px;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 6px 12px rgba(30, 60, 80, 0.1);
    transform: scale(1.1);
    position: relative;
    z-index: 1;
  }
  img {
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .titulo {
    margin-bottom: 10px;
  }

  .preco {
    color: #e80;
    font-weight: bold;
  }
}

.sem-resultados {
  text-align: center;
}
</style>
