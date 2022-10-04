<template>
  <ul v-if="paginasTotal > 1">
    <li v-for="pagina in paginas" :key="pagina">
      <router-link :to="{ query: query(pagina) }">
        {{ pagina }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1,
    },
    produtosTotal: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    query(pagina) {
      return {
        ...this.$route.query,
        _page: pagina,
      };
    },
  },
  computed: {
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity ? Math.ceil(total) : 0;
    },
    paginas() {
      const current = Number(this.$route.query._page);
      const range = 9;
      const offSet = Math.ceil(range / 2);
      const total = this.paginasTotal;
      const pagesArray = [];

      for (let i = 1; i < total; i++) {
        pagesArray.push(i);
      }
      pagesArray.splice(0, current - offSet);
      pagesArray.splice(range - total);
      return pagesArray;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  grid-column: 1 / -1 !important;
}
li {
  display: inline-block;
  a {
    padding: 2px 8px;
    border-radius: 2px;
    margin: 4px;
  }
}

li a.router-link-exact-active {
  background: #87f;
  color: #fff;
}
</style>
