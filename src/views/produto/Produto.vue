<template>
  <section>
    <div v-if="produto" class="produto">
      <ul class="fotos" v-if="produto.fotos">
        <li v-for="(foto, index) in produto.fotos" :key="index">
          <img :src="foto.scr" :alt="foto.titulo" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="preco">{{ $filters.numeroPreco(produto.preco) }}</p>
        <p class="descricao">{{ produto.descricao }}</p>
        <transition mode="out-in" v-if="produto.vendido === 'false'">
          <button class="btn" v-if="!finalizar" @click="finalizar = true">
            Comprar
          </button>
          <FinalizarCompra v-else :produto="produto" />
        </transition>
        <button class="btn" v-else disabled>Produto vendido</button>
      </div>
    </div>
    <div v-else class="loading" key="carregando">
      <PaginaCarregando />
    </div>
  </section>
</template>

<script>
import { api } from "@/core/services/services.js";
import FinalizarCompra from "./components/FinalizarCompra.vue";
export default {
  name: "ProdutosView",
  props: ["id"],
  components: {
    FinalizarCompra,
  },
  data() {
    return {
      produto: null,
      finalizar: false,
    };
  },
  methods: {
    getProduto() {
      setTimeout(() => {
        api.get(`/produto/${this.id}`).then((res) => {
          this.produto = res.data;
        });
      }, 1000);
    },
  },
  created() {
    this.getProduto();
  },
};
</script>

<style lang="scss" scoped>
.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px;
  .preco {
    color: #e80;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 40px;
  }

  .descricao {
    font-size: 1.2rem;
  }
  .btn {
    margin-top: 60px;
    width: 200px;
  }
}
</style>
