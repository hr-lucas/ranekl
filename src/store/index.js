import { createStore } from "vuex";
import Usuario from "@/views/usuario/store/Usuarios.js";
import Login from "@/views/login/store/store.js";

export default createStore({
  modules: {
    Usuario,
    Login,
  },
});
