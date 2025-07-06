import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import LeyendasList from '@/views/LeyendasList.vue'
import LeyendaForm from '@/views/LeyendaForm.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/leyendas',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/leyendas',
    name: 'Leyendas',
    component: LeyendasList,
    meta: { requiresAuth: true },
  },
  {
    path: '/leyendas/nueva',
    name: 'LeyendaNueva',
    component: LeyendaForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/leyendas/editar/:id',
    name: 'LeyendaEditar',
    component: LeyendaForm,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/leyendas',
  },


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



// Guard global para proteger rutas con meta.requiresAuth
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
