import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import ProductsPage from "../pages/ProductsPage.vue";
import CategoriesPage from "../pages/CategoriesPage.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/products",
    children: [
      { path: "/products", component: ProductsPage },
      { path: "/categories", component: CategoriesPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
