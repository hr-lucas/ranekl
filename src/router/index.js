import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/Home.vue";
import loginView from "../views/login/Login.vue";
import ProdutosView from "../views/produto/Produto.vue";
import UsuarioView from "../views/usuario/Usuario.vue";
import UsuarioProdutos from "../views/usuario/pages/produtos/UsuarioProdutos.vue";
import UsuarioEditar from "../views/usuario/pages/editar/UsuarioEditar.vue";
import UsuarioVendas from "../views/usuario/pages/vendas/UsuarioVendas.vue";
import UsuarioCompras from "../views/usuario/pages/compras/UsuarioCompras.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: loginView,
  },
  {
    path: "/usuario",
    component: UsuarioView,
    children: [
      {
        path: "",
        name: "usuario",
        component: UsuarioProdutos,
      },
      {
        path: "compras",
        name: "compras",
        component: UsuarioCompras,
      },
      {
        path: "vendas",
        name: "vendas",
        component: UsuarioVendas,
      },
      {
        path: "editar",
        name: "usuario-editar",
        component: UsuarioEditar,
      },
    ],
  },
  {
    path: "/produto/:id",
    name: "produto",
    props: true,
    component: ProdutosView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

export default router;
