<template>
  <footer class="footer mt-auto py-4 bg-dark-custom text-white-50">
    <div class="container text-center">
      <div class="row justify-content-center align-items-center g-3">
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <p class="mb-0 small">&copy; {{ currentYear }} Libro de Leyendas Costarricenses.</p>
          <p class="mb-0 small">4THEWORDS.</p>
        </div>
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <p class="mb-0 small">Desarrollado con <i class="bi bi-heart-fill text-danger"></i> por Mauricio Torres F.</p>
        </div>
        <div class="col-12 col-md-4">
          <ul class="list-inline mb-0">
            <li class="list-inline-item me-3">
              <a href="https://4thewords.com/" class="text-white-50 text-decoration-none small hover-primary">4thewords</a>
            </li>
            <li class="list-inline-item me-3">
              <a href="https://4thewords.com/pricing" class="text-white-50 text-decoration-none small hover-primary">Precios</a>
            </li>
            <li class="list-inline-item">
              <a href="https://4thewords.com/about-us" class="text-white-50 text-decoration-none small hover-primary">Sobre nosotoros</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>

.footer {
  font-family: 'Roboto', sans-serif;
  border-top: 1px solid rgba(0, 200, 255, 0.2);
}

.bg-dark-custom {
  background-color: #2c3034 !important;
}

.text-white-50 {
  color: rgba(255, 255, 255, 0.75) !important;
}

.small {
  font-size: 0.85rem;
}

.list-inline-item a {
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.list-inline-item a.hover-primary:hover {
  color: #00bcd4 !important;
  text-shadow: 0 0 5px rgba(0, 200, 255, 0.3);
}

.bi-heart-fill {
  color: #dc3545; 
}
</style>
