import { api } from "@/core/services/services.js";
export default {
  namespaced: true,
  state: {
    usuario_produtos: null,
  },
  mutations: {
    UPDATE_USUARIOS_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIOS_PRODUTOS(state, payload) {
      state.usuario_produtos.unshit(payload);
    },
  },
  actions: {
    getUsuarioProdutos(context) {
      api
        .get(`/produto?usuario_id=${context.rootState.Login.usuario.id}`)
        .then((response) => {
          context.commit("UPDATE_USUARIOS_PRODUTOS", response.data);
        });
    },
  },
};
