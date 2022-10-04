import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PaginaCarregando from "@/core/components/PaginaCarregando.vue";

const app = createApp(App).use(store).use(router);
app.component("PaginaCarregando", PaginaCarregando);
app.mount("#app");

app.config.globalProperties.$filters = {
  numeroPreco(value) {
    const valor_preco = Number(value);
    if (!isNaN(valor_preco)) {
      return valor_preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else {
      return "";
    }
  },
};
