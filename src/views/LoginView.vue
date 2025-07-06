<template>
  <div class="login-page-background d-flex align-items-center justify-content-center min-vh-100">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card bg-dark text-white p-4 p-md-5 shadow-lg border-0 rounded-3 login-card">
            <h2 class="mb-4 text-center text-primary fw-bold fs-3">Iniciar sesión</h2>
            <BaseAlert v-if="error" :message="error" class="mb-3" />
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <BaseInput v-model="email" label="Correo electrónico" type="email" required class="form-control-dark" />
              </div>
              <div class="mb-4">
                <BaseInput v-model="password" label="Contraseña" type="password" required class="form-control-dark" />
              </div>
              <BaseButton type="submit" class="btn btn-primary w-100 py-2 fw-bold text-uppercase login-button">Ingresar</BaseButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

// src/views/LoginView.vue
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// NOTA: Ya NO necesitas importar 'login' de '@/services/auth' aquí,
//       porque el composable 'useAuth' se encarga de llamarlo.
// import { login as authServiceLogin } from '@/services/auth'; // <-- ELIMINAR ESTA LÍNEA
import type { AxiosError } from 'axios';
import { useAuth } from '@/composables/useAuth'; // Importa tu composable de autenticación

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const router = useRouter();
const { login } = useAuth(); // Obtén la función 'login' directamente del composable

async function handleLogin() {
  try {
    error.value = null; // Limpiar errores previos

    // *** CAMBIO CLAVE AQUÍ: Llama directamente a 'login' del composable
    //     y pásale el OBJETO con email y password.
await login({ email: email.value, password: password.value });

    // Si el login fue exitoso (el composable ya guardó el token y actualizó isLoggedIn),
    // simplemente redirige.
    router.push('/leyendas');
  } catch (err) {
    const axiosError = err as AxiosError;
    const errorMessage = axiosError.response?.status === 401
      ? 'Correo o contraseña incorrectos.'
      : 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
    error.value = errorMessage;
    console.error('Error de login:', err);
  }
}
</script>

<style scoped>

.login-page-background {
  background-color: #212529;
}

.login-card {
  background-color: rgba(33, 37, 41, 0.9);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 0 25px rgba(0, 200, 255, 0.2);
  border: 1px solid rgba(0, 200, 255, 0.3);
}

h2 {
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 1px;
}

.form-control-dark {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #f8f9fa;
}
.form-control-dark::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.form-control-dark:focus {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: #00bcd4;
  box-shadow: 0 0 0 0.25rem rgba(0, 188, 212, 0.25);
  color: #fff;
}

.login-button {
  background-color: #00bcd4;
  border-color: #00bcd4;
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.login-button:hover {
  background-color: #008fa3;
  border-color: #008fa3;
  box-shadow: 0 0 15px rgba(0, 188, 212, 0.4);
}

.alert-danger {
    color: #f8d7da;
    background-color: rgba(220, 53, 69, 0.2);
    border-color: rgba(220, 53, 69, 0.5);
}
</style>
