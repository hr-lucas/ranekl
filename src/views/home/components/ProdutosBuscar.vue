<template>
  <div>
    <form>
      <input
        type="text"
        name="busca"
        id="busca"
        v-model="busca"
        placeholder="buscas..."
      />
      <input
        type="submit"
        id="lupa"
        value="Buscar"
        @click.prevent="buscarProdutos"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "ProdutoBuscar",
  data() {
    return {
      busca: "",
    };
  },
  methods: {
    buscarProdutos() {
      this.$router.push({ query: { q: this.busca } });
    },
  },
};
</script>

<style scoped lang="scss">
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;

  #busca {
    width: 100%;
    padding: 20px;
    border: none;

    &:focus,
    :hover {
      transform: scale(1.1);
    }
  }

  #lupa {
    width: 62px;
    height: 62px;
    background: url("../../../assets/SVG/search.svg") no-repeat center center;
    text-indent: -150px;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
  }
}
</style>
