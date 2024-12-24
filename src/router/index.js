import { createRouter, createWebHistory } from 'vue-router';
import Productos from '../components/Productos.vue';
import Categorias from '../components/Categorias.vue';
import Clientes from '../components/Clientes.vue';

const routes = [
  { path: '/', redirect: '/productos' }, // Redirige a productos por defecto
  { path: '/productos', component: Productos },
  { path: '/categorias', component: Categorias },
  { path: '/clientes', component: Clientes },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;