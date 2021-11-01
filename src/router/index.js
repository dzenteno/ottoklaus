import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Agregar from '../views/Agregar.vue'
import Juguetes from '../views/Juguetes.vue'
import Editar from '../views/Editar.vue'
import Login from '../views/Login.vue'
import firebase from "firebase/compat/app";

// import firebase from 'firebase/compat/app';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/agregar',
    name: 'agregar',
    component: Agregar,
    meta: { login:true },
  },
  {
    path: '/juguetes',
    name: 'juguetes',
    component: Juguetes,
    meta: { login:true }, // toda ruta que tenga el atributo "meta: {}" va a estar protegida por los guardianes
  },
  {
    path: '/editar',
    name: 'editar',
    component: Editar,
    props: true,
    meta: { login:true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser
  let authRequired = to.matched.some(route => route.meta.login);
  if (!user && authRequired) {
    next('login');
  } else if (user && !authRequired) {
    next('juguetes');
  } else {
    next();
  }
});

export default router
