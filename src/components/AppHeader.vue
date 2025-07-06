<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark-custom shadow-sm">
    <div class="container-fluid container-xl">
      <router-link to="/" class="navbar-brand fw-bold text-primary brand-glow">
        <i class="bi bi-book-half me-2"></i>Libro de Leyendas
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/leyendas" class="nav-link text-white-50 router-link-active-custom" active-class="text-white fw-bold active-glow">Leyendas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/leyendas/nueva" class="nav-link text-white-50 router-link-active-custom" active-class="text-white fw-bold active-glow">Crear Leyenda</router-link>
          </li>

          <li class="nav-item ms-lg-3">
            <template v-if="isLoggedIn">
              <button @click="handleLogout" class="btn btn-outline-danger logout-button">Cerrar Sesión</button>
            </template>
            <template v-else>
              <router-link to="/login" class="btn btn-outline-primary login-button">Iniciar Sesión</router-link>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { isLoggedIn, logout } = useAuth();


const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>

<style scoped>

.navbar {
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid rgba(0, 200, 255, 0.2);
}

.bg-dark-custom {
  background-color: #2c3034 !important;

}

.navbar-brand {
  font-size: 1.6rem;
  text-shadow: 0 0 8px rgba(0, 200, 255, 0.5);
}

.brand-glow {
  color: #00bcd4 !important;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #fff !important;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
}

.router-link-active-custom.router-link-exact-active,
.active-glow {
  color: #00bcd4 !important;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(0, 200, 255, 0.6);
}

.login-button {
  background-color: transparent;
  border-color: #00bcd4;
  color: #00bcd4;
  transition: all 0.3s ease;
}

.login-button:hover {
  background-color: #00bcd4;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 188, 212, 0.4);
}

.logout-button {
  background-color: transparent;
  border-color: #dc3545;
  color: #dc3545;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background-color: #dc3545;
  color: #fff;
  box-shadow: 0 0 10px rgba(220, 53, 69, 0.4);
}

.navbar-toggler {
    border-color: rgba(0, 188, 212, 0.5);
}
.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 188, 212, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); 
}
</style>
